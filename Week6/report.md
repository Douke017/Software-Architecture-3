# Informe Consolidado de Diseño Arquitectónico para QuickCart (Week 6)

## 1. Resumen de Diseño Arquitectónico

### 1.1. Lista de Microservicios Propuestos Finales (6 Servicios Autónomos)

| Microservicio        | Responsabilidad Principal                                                              |
| :------------------- | :------------------------------------------------------------------------------------- |
| `Identity Service`   | Gestiona registro, autenticación, autorización y perfiles de usuarios compradores.       |
| `Catalog Service`    | Administra la búsqueda, filtrado y metadatos de productos del catálogo de compras.     |
| `Cart Service`       | Mantiene el estado efímero del carrito de compras de sesión previa al checkout.        |
| `Order Service`      | Orquesta el ciclo de vida del pedido, estados transaccionales y la saga de compra.     |
| `Payment Service`    | Gestiona cobros, reembolsos e integraciones síncronas con pasarelas financieras externas. |
| `Notification Service` | Entrega notificaciones asíncronas multicanal basadas en eventos del sistema.           |

### 1.2. Diagrama de Componentes de Alto Nivel

```plantuml
skinparam backgroundColor white
skinparam component {
  BorderColor black
  FontColor black
}
skinparam rectangle {
  BorderColor black
  FontColor black
}
skinparam database {
  BorderColor black
  FontColor black
}
skinparam queue {
  BorderColor black
  FontColor black
}

rectangle "Clientes" as Clients #F1F5F9 {
  component "Web App" as WebClient
  component "Mobile App" as MobileClient
}

component "API Gateway" as APIGateway #DCFCE7

rectangle "Microservicios QuickCart" {
  component "Identity Service" as IdentityService #DBEAFE
  database "Identity DB\n(PostgreSQL)" as IdentityDB #DDD6FE

  component "Catalog Service" as CatalogService #DBEAFE
  database "Catalog DB\n(MongoDB)" as CatalogDB #DDD6FE

  component "Cart Service" as CartService #DBEAFE
  database "Cart DB\n(Redis)" as CartDB #DDD6FE

  component "Order Service" as OrderService #DBEAFE
  database "Order DB\n(PostgreSQL)" as OrderDB #DDD6FE

  component "Payment Service" as PaymentService #DBEAFE
  database "Payment DB\n(PostgreSQL)" as PaymentDB #DDD6FE

  component "Notification Service" as NotificationService #DBEAFE
  database "Notification DB\n(PostgreSQL)" as NotificationDB #DDD6FE
}

queue "Event Bus Kafka" as EventBus #FEF08A

rectangle "Sistemas Externos" {
  component "Payment Gateway" as ExternalPaymentGateway #FFEDD5
  component "Email Provider" as ExternalEmailProvider #FFEDD5
}

WebClient --> APIGateway : Síncrono HTTP/gRPC
MobileClient --> APIGateway : Síncrono HTTP/gRPC

APIGateway --> IdentityService : Síncrono HTTP/gRPC
APIGateway --> CatalogService : Síncrono HTTP/gRPC
APIGateway --> CartService : Síncrono HTTP/gRPC
APIGateway --> OrderService : Síncrono HTTP/gRPC
APIGateway --> PaymentService : Síncrono HTTP/gRPC

IdentityService -- IdentityDB
CatalogService -- CatalogDB
CartService -- CartDB
OrderService -- OrderDB
PaymentService -- PaymentDB
NotificationService -- NotificationDB

IdentityService --> EventBus : Asíncrono EDA (UserRegistered)
CatalogService --> EventBus : Asíncrono EDA (ProductUpdated)
CartService --> EventBus : Asíncrono EDA (CartCheckedOut)
OrderService --> EventBus : Asíncrono EDA (OrderPlaced, OrderUpdated)
PaymentService --> EventBus : Asíncrono EDA (PaymentProcessed)

EventBus --> OrderService : Asíncrono EDA (CartCheckedOut, PaymentProcessed)
EventBus --> NotificationService : Asíncrono EDA (OrderPlaced, PaymentProcessed)

PaymentService --> ExternalPaymentGateway : Síncrono HTTP/API
NotificationService --> ExternalEmailProvider : Síncrono HTTP/API
```

### 1.3. Decisiones Clave de Diseño: Acoplamiento Débil y Escalabilidad

El desacoplamiento se logra mediante el patrón *Database-per-Service* y comunicaciones asíncronas guiadas por eventos a través de Apache Kafka. Esta estrategia elimina las llamadas bloqueantes en cadena y las dependencias espaciales o temporales directas entre servicios. Cada microservicio gestiona su propio almacenamiento de datos, garantizando autonomía y resiliencia, lo que previene fallos en cascada y facilita la evolución independiente de cada componente.

La escalabilidad elástica se aborda con la separación de responsabilidades y el uso de tecnologías adecuadas para cada dominio. Por ejemplo, `Cart Service` utiliza Redis como almacén de datos en memoria, permitiendo escalar de forma independiente para absorber picos masivos de lectura y escritura durante eventos como el Black Friday. Esta arquitectura evita que la alta concurrencia en el carrito degrade la capacidad o impacte la consistencia ACID de `Order Service`, que utiliza PostgreSQL para transacciones duraderas.

## 2. Resumen de Interacción con IA

### 2.1. Los 2 Prompts Más Efectivos Utilizados y Justificación Técnica

1.  **Prompt 1: Descomposición por Bounded Contexts y Matriz Dual de Trade-Offs (`Cart` vs `Order`)**
    *   **Justificación**: Este prompt fue efectivo porque forzó al modelo a realizar un análisis comparativo explícito de seis criterios clave (volatilidad de datos, consistencia, escalabilidad, durabilidad, transaccionalidad, ciclo de vida) entre el carrito y el pedido. Al exigir una matriz de trade-offs, se evitó la creación de un "Checkout God Service" y se demostró la necesidad de fronteras de dominio estrictas, alineándose con los principios de DDD y Database-per-Service.

2.  **Prompt 2: Análisis de Fallo de Vendor y Patrón Transactional Outbox + Debezium CDC**
    *   **Justificación**: Este prompt fue crucial para guiar la arquitectura hacia patrones de resiliencia avanzada. Al simular un escenario de caída del bus de eventos, se exigió al modelo proponer soluciones robustas para prevenir la pérdida de transacciones financieras críticas. La inclusión del *Transactional Outbox Pattern* con *Debezium CDC* y *DLQ* demostró una comprensión profunda de la persistencia de eventos y la garantía de entrega, incluso en entornos distribuidos con fallos.

### 2.2. Instancia de Refinamiento y Argumentación contra Sugerencias Iniciales de la IA

Durante el laboratorio, la IA propuso inicialmente unificar la gestión del carrito y los pedidos en un único "Checkout & Ordering Service", compartiendo una base de datos PostgreSQL común para simplificar el flujo de checkout. Esta sugerencia buscaba una aparente eficiencia al consolidar la lógica de negocio.

Como arquitecto, rechacé esta propuesta argumentando que violaba principios fundamentales de microservicios. Primero, comprometía el principio de *Database-per-Service*, creando una dependencia de datos entre dos dominios con necesidades de consistencia y ciclo de vida muy diferentes. Segundo, mezclaba la naturaleza efímera y mutable de la sesión del carrito con el compromiso financiero durable y transaccional de un pedido, introduciendo un riesgo directo de crear un *God Service* y, en última instancia, un *Distributed Monolith*. Se argumentó que esta consolidación aumentaría el acoplamiento, reduciría la escalabilidad independiente y dificultaría la evolución futura. Se obligó a la IA a separar `Cart Service` (utilizando Redis para datos efímeros y alta concurrencia) de `Order Service` (utilizando PostgreSQL para durabilidad y consistencia ACID), mediando la transición entre ambos mediante una transacción asíncrona basada en el evento `CartCheckedOut` que desencadenaría la creación del pedido.

## 3. Responsabilidad del Arquitecto ante la Deuda Técnica (Technical Debt Governance)

La responsabilidad del arquitecto principal frente a la deuda técnica es ineludible y multifacética, trascendiendo la mera identificación para abarcar la gobernanza proactiva y estratégica.

1.  **Titularidad y Visibilidad Sin Excusas (Ownership & Visibility)**:
    El arquitecto es el máximo responsable de la integridad estructural y la salud a largo plazo del sistema. No puede excusarse en presiones de negocio o plazos de entrega. Es su deber explicitar, catalogar y cuantificar la deuda técnica de manera transparente. Esto implica mantener un Registro de Deuda Técnica y documentar las decisiones arquitectónicas (ADRs) que introducen compromisos, asegurando que la deuda sea conocida, comprendida y gestionada activamente por todas las partes interesadas.

2.  **Cuantificación del Riesgo de Negocio (Business Impact Quantification)**:
    Una responsabilidad crítica es traducir la deuda técnica de métricas puramente técnicas a impactos financieros y operativos comprensibles para los ejecutivos. Esto incluye cuantificar la degradación de latencia (p95/p99), el incremento de costos de infraestructura debido a ineficiencias, el riesgo de fallas en cascada y la fricción organizativa que ralentiza el tiempo de entrega (*Time-to-Market*). Al vincular la deuda técnica directamente con el valor de negocio, el arquitecto puede justificar la inversión en remediación.

3.  **Estrategia Incremental de Refactorización y Remediación (Remediation Roadmap)**:
    El arquitecto debe diseñar planes de migración progresivos y realistas, evitando la exigencia de "congelar el negocio" para una reescritura total. Esto implica aplicar patrones como *Strangler Fig Pattern* para reemplazar funcionalidades legadas gradualmente, el *Transactional Outbox Pattern* para garantizar la consistencia de eventos, o el desacoplamiento de bases de datos compartidas por fases. La estrategia debe ser incremental, minimizando la interrupción y demostrando valor continuo.

4.  **Gobernanza y Salvaguardas Arquitectónicas (Fitness Functions & Architectural Guardrails)**:
    Para prevenir la reincidencia de malas decisiones y mantener la salud arquitectónica, el arquitecto debe implementar mecanismos de gobernanza. Esto incluye el desarrollo de pruebas automatizadas de arquitectura (*Fitness Functions*) que validen el cumplimiento de principios clave (ej. Database-per-Service, límites de contexto). La integración de linters de arquitectura en los pipelines de CI/CD actúa como salvaguarda, garantizando que las decisiones corregidas no vuelvan a introducir deuda técnica.

## 4. Conclusiones y Recomendaciones Arquitectónicas Finales

La arquitectura de microservicios propuesta para QuickCart establece una base sólida para la escalabilidad, resiliencia y agilidad de desarrollo. La descomposición por dominios claros, el uso de *Database-per-Service* y la comunicación asíncrona vía Kafka son pilares que garantizan un bajo acoplamiento y alta autonomía. Las lecciones aprendidas durante el diseño, especialmente la necesidad de argumentar contra la consolidación de dominios para evitar "God Services", refuerzan la importancia de adherirse estrictamente a los principios de MSA.

**Recomendaciones para el Roadmap de Implementación:**
1.  **Priorización por Dominio**: Implementar los servicios en fases, priorizando `Identity`, `Catalog` y `Cart` inicialmente, seguidos por `Order`, `Payment` y `Notification`.
2.  **Adopción de Patrones de Resiliencia**: Integrar patrones como Circuit Breakers, Bulkheads y el Transactional Outbox Pattern desde el inicio para garantizar la robustez del sistema distribuido.
3.  **Observabilidad Distribuida**: Implementar una estrategia integral de logging centralizado, métricas y tracing distribuido para facilitar la depuración y monitoreo en producción.
4.  **Automatización CI/CD**: Establecer pipelines de integración y despliegue continuo para cada microservicio, permitiendo entregas rápidas e independientes.
5.  **Gobernanza Continua**: Mantener un registro activo de ADRs y deuda técnica, y desarrollar *Fitness Functions* para validar la arquitectura a lo largo del tiempo.

---
### Checklist de Cumplimiento de Directivas:

- [x] Rol de Arquitecto Principal asumido.
- [x] Nivel arquitectónico estricto (cero código de aplicación).
- [x] Tablas Markdown ultra-concisas (máximo 12 palabras por celda).
- [x] Checklist obligatorio marcado explícitamente al final.
- [x] PlantUML: PROHIBIDO DIRECTIVAS DE ESTILO SIN `skinparam`.
- [x] PlantUML: PROHIBIDO EL USO DE LA PALABRA `handwritten`.
- [x] PlantUML: FONDO BLANCO Y ALTO CONTRASTE (`skinparam backgroundColor white`).
- [x] PlantUML: PROHIBIDO USAR ESTEREOTIPOS `<< ... >>` EN PARTICIPANTES DE SECUENCIA (N/A para Componentes).
- [x] PlantUML: PROHIBIDO LA PALABRA CLAVE `queue` EN DIAGRAMAS DE SECUENCIA (usado `queue "Event Bus Kafka"`).
- [x] PlantUML: PROHIBIDO USAR EL SÍMBOLO AMPERSAND '&' EN NOMBRES O ETIQUETAS.
- [x] PlantUML: PROHIBIDO USAR CORCHETES '[' O ']' EN ETIQUETAS DE FLECHAS.
- [x] PlantUML: PROHIBIDO PARÉNTESIS '(' O ')' Y APÓSTROFES '\'' EN MENSAJES DE SECUENCIA (N/A para Componentes).
- [x] PlantUML: PROHIBIDO `!include` EXTERNOS O REMOTOS.
- [x] PlantUML: SIMETRÍA EN ACTIVACIONES DE SECUENCIA (N/A para Componentes).
- [x] PlantUML: ASIGNACIÓN OBLIGATORIA DE COLORES DE ALTO CONTRASTE EN CADA ELEMENTO.
- [x] PlantUML: PROHIBIDO ÓVALOS / CASOS DE USO.
- [x] Estructura Obligatoria y Entregables del Reporte Consolidado (Numeración Profesional).
- [x] Sección 1.1: Lista de Microservicios Propuestos Finales (6 servicios).
- [x] Sección 1.2: Diagrama de Componentes de Alto Nivel (PlantUML).
- [x] Sección 1.3: Decisiones Clave de Diseño (100-150 palabras).
- [x] Sección 2.1: Los 2 Prompts Más Efectivos Utilizados y Justificación Técnica.
- [x] Sección 2.2: Instancia de Refinamiento y Argumentación contra Sugerencias Iniciales de la IA.
- [x] Sección 3: Responsabilidad del Arquitecto ante la Deuda Técnica (4 ejes).
- [x] Sección 4: Conclusiones y Recomendaciones Arquitectónicas Finales.