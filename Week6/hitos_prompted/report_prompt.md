# Context Engineering Prompt - Informe Consolidado de Diseño Arquitectónico (report.md - Week 6 QuickCart)

## Contexto de Referencia
Asimila las directrices del rol en `../context/role.md`, la descripción del problema QuickCart en `../context/problem_description.md`, las reglas de formato en `../context/markdown_guide.md`, los estándares de diagramación en `../context/plantuml_guide.md` y los entregables acumulados de la Semana 6 (`output1.md`, `output2.md`, `output3.md`).

---

## Directivas Arquitectónicas Imperativas para el Modelo

Actúa como **Principal Software & Enterprise Architect** y elabora el **Informe Consolidado de Diseño Arquitectónico de Microservicios para QuickCart** (guardado como `report.md` en la raíz de `Week6` y en `outputs/report.md`).

Tu informe debe ser profesional, riguroso y cumplir estrictamente con todas las secciones requeridas, incluyendo la **Gobernanza de la Deuda Técnica (Technical Debt)**.

---

### Estructura Obligatoria y Entregables del Reporte Consolidado (Numeración Profesional desde la Sección 1)

#### 1. Resumen de Diseño Arquitectónico (Mínimo 1 Página)

##### 1.1. Lista de Microservicios Propuestos Finales (6 Servicios Autónomos)
Presenta una lista y tabla ejecutiva con los **6 microservicios autónomos de QuickCart**, indicando su responsabilidad principal en exactamente una oración clara:
1. `Identity Service`: Gestiona registro, autenticación, autorización y perfiles de usuarios compradores.
2. `Catalog Service`: Administra la búsqueda, filtrado y metadatos de productos del catálogo de compras.
3. `Cart Service`: Mantiene el estado efímero del carrito de compras de sesión previa al checkout.
4. `Order Service`: Orquesta el ciclo de vida del pedido, estados transaccionales y la saga de compra.
5. `Payment Service`: Gestiona cobros, reembolsos e integraciones síncronas con pasarelas financieras externas.
6. `Notification Service`: Entrega notificaciones asíncronas multicanal (email, SMS, push) basadas en eventos.

##### 1.2. Diagrama de Componentes de Alto Nivel (PlantUML Nativo Parseable y Legible)
Genera un **Diagrama de Componentes de Alto Nivel** en bloque PlantUML (` ```plantuml @startuml ... @enduml `) que represente la topología objetivo:
- Muestra los Clientes (App/Web), API Gateway, los 6 Microservicios, el Event Bus (Apache Kafka) y las Bases de Datos Aisladas por Servicio.
- **ETIQUETA EXPLÍCITAMENTE EL ESTILO DE COMUNICACIÓN** en las líneas de conexión (ej. `Síncrono HTTP/gRPC` vs `Asíncrono EDA via Kafka`).
- *REGLAS VISUALES OBLIGATORIAS*: Prohibido `skinparam handwritten true`, prohibido formas ovaladas `usecase`, prohibido colores de texto blanco sobre blanco. Usa cajas simples rectangulares `component` y `rectangle` con fondo claro `#FFFBEB` / `#EFF6FF` y texto oscuro contrastante.

##### 1.3. Decisiones Clave de Diseño: Acoplamiento Débil y Escalabilidad (100 a 150 Palabras)
Desarrolla un análisis conciso estructurado en dos párrafos específicos:
- **Decisión de Acoplamiento Débil**: Explica cómo el desacoplamiento se logra mediante el patrón *Database-per-Service* y comunicaciones asíncronas guiadas por eventos via Kafka, eliminando llamadas bloqueantes en cadena y dependencias espaciales/temporales entre servicios.
- **Decisión de Escalabilidad Elástica**: Explica cómo `Cart Service` (almacén Redis en memoria) escala de forma independiente para absorber picos masivos de lectura/escritura en eventos como Black Friday, sin degradar la capacidad ni impactar la consistencia ACID de `Order Service` (PostgreSQL).

#### 2. Resumen de Interacción con IA (Mínimo 1/2 Página)

##### 2.1. Los 2 Prompts Más Efectivos Utilizados y Justificación Técnica
Describe los dos prompts más potentes desarrollados durante el laboratorio y justifica técnicamente por qué produjeron excelentes resultados:
1. **Prompt 1: Descomposición por Bounded Contexts y Matriz Dual de Trade-Offs (`Cart` vs `Order`)**:
   - *Justificación*: Forzó al modelo a evaluar explícitamente 6 criterios entre datos efímeros y durables, evitando un "Checkout God Service" y demostrando la necesidad de fronteras estrictas de dominio.
2. **Prompt 2: Análisis de Fallo de Vendor y Patrón Transactional Outbox + Debezium CDC**:
   - *Justificación*: Exigió simular el efecto dominó ante una caída del bus de eventos y guiar la arquitectura hacia patrones de resiliencia avanzada (Outbox Pattern + CDC + DLQ) para prevenir la pérdida de transacciones financieras.

##### 2.2. Instancia de Refinamiento y Argumentación contra Sugerencias Iniciales de la IA
Describe con detalle técnico un caso real del laboratorio donde tuviste que refinar o argumentar en contra de una sugerencia inicial de la IA para adherirte estrictamente a los principios de microservicios:
- **Caso de Estudio**: La IA propuso inicialmente unificar el Carrito y la Gestión de Pedidos en un único *"Checkout & Ordering Service"* compartiendo una base de datos PostgreSQL común para simplificar el flujo de checkout.
- **Argumentación del Arquitecto**: Se rechazó esa propuesta argumentando que violaba el principio de *Database-per-Service* y mezclaba la sesión efímera mutable con el compromiso financiero durable, introduciendo un riesgo directo de *God Service* y *Distributed Monolith*. Se obligó a la IA a separar `Cart Service` (Redis) de `Order Service` (PostgreSQL) mediante una transacción asíncrona basada en el evento `OrderPlaced`.

#### 3. Responsabilidad del Arquitecto ante la Deuda Técnica (Technical Debt Governance)
Desarrolla una sección profunda de gobernanza arquitectónica respondiendo a la pregunta: **¿Qué responsabilidad tiene el arquitecto cuando una mala decisión técnica genera deuda técnica a largo plazo?**

Establece y analiza los siguientes 4 ejes de responsabilidad del Arquitecto Principal:
1. **Titularidad y Visibilidad Sin Excusas (Ownership & Visibility)**:
   - El arquitecto es el máximo responsable de la integridad estructural del sistema. No puede culpar a la presión de negocio o a los plazos de entrega. Debe explicitar, catalogar y cuantificar la deuda técnica en un Registro de Deuda Técnica / ADRs (*Architecture Decision Records*).
2. **Cuantificación del Riesgo de Negocio (Business Impact Quantification)**:
   - Traducir la deuda técnica a métricas financieras y operativas comprensibles para los ejecutivos: degradación de latencia p95/p99, incremento de costos de infraestructura, riesgo de fallas en cascada y fricción organizativa en el tiempo de entrega (*Time-to-Market*).
3. **Estrategia Incremental de Refactorización y Remediación (Remediation Roadmap)**:
   - Diseñar planes de migración progresivos sin exigir congelar el negocio para una reescritura total ("total rewrite"). Aplicar patrones como *Strangler Fig Pattern*, *Transactional Outbox Pattern* o desacoplamiento de bases de datos compartidas por fases.
4. **Gobernanza y Salvaguardas Arquitectónicas (Fitness Functions & Architectural Guardrails)**:
   - Implementar pruebas automatizadas de arquitectura (*Fitness Functions*, linters de arquitectura en CI/CD) para garantizar que las malas decisiones corregidas no vuelvan a reincidir.

#### 4. Conclusiones y Recomendaciones Arquitectónicas Finales
- Resumen sintético de las lecciones aprendidas y roadmap de implementación para QuickCart.

---

## Reglas Estrictas de Formato Markdown y PlantUML
1. **TABLAS MARKDOWN**: Celdas breves (máximo 12 palabras por celda) en una sola línea continua.
2. **PLANTUML NATIVO Y LEGIBLE**: Diagrama de componentes limpio sin `handwritten true`, sin ovalos `usecase` y con alto contraste de texto.

---

## Entregables
Guarda el informe consolidado en `../report.md` (y `../outputs/report.md`).
