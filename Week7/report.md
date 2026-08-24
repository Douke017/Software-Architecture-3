Como Principal Software & Enterprise Architect, presento el Informe Consolidado de Diseño Arquitectónico para ShopStream, sintetizando las decisiones clave y la estrategia de implementación.

---

## 1. Resumen de Diseño Arquitectónico Ejecutivo

### 1.1. Diagrama de Alto Nivel de ShopStream (Modelo C4 - Structurizr Standard)

```plantuml
@startuml
!include <C4/C4_Container>

title Modelo C4 - Nivel 2: Diagrama de Contenedores de ShopStream (Consolidado)

Person(client, "Cliente", "Usuario que interactúa con la plataforma web o móvil")

System_Boundary(c1, "Plataforma ShopStream EDA") {
    Container(api_gw, "API Gateway", "Kong / Envoy", "Punto de entrada unificado, seguridad perimetral y enrutamiento")
    
    Container(web_bff, "Web BFF", "Node.js / GraphQL", "Backend para frontend web, agrega y optimiza datos")
    Container(mobile_bff, "Mobile BFF", "Java / Spring Boot", "Backend para frontend móvil, agrega y optimiza datos")
    
    Container(customer_svc, "Customer Service", "Java / Spring Boot", "Gestiona perfiles, autenticación y direcciones")
    ContainerDb(customer_db, "Customer DB", "PostgreSQL", "Almacen relacional de perfiles de usuario")
    
    Container(catalog_svc, "Catalog Service", "Python / FastAPI", "Administra productos, categorías y precios base")
    ContainerDb(catalog_db, "Catalog DB", "MongoDB", "Almacen de documentos de productos")
    
    Container(order_svc, "Order Service", "Java / Quarkus", "Orquesta el ciclo de vida del pedido y Sagas")
    ContainerDb(order_db, "Order DB", "PostgreSQL", "Almacen transaccional de pedidos y outbox")
    
    Container(cms_svc, "CMS Service", "Node.js / Strapi", "Entrega banners, promociones y contenido editorial")
    ContainerDb(cms_db, "CMS DB", "PostgreSQL", "Almacen de contenido editorial")

    ContainerQueue(event_bus, "Event Bus", "Apache Kafka", "Broker distribuido de eventos inmutables de alta concurrencia")
}

' 1. Clientes a API Gateway
Rel(client, api_gw, "Accede a la plataforma", "HTTPS / JSON")

' 2. API Gateway a BFFs
Rel(api_gw, web_bff, "Enruta trafico web", "HTTPS / gRPC")
Rel(api_gw, mobile_bff, "Enruta trafico movil", "HTTPS / gRPC")

' 3. Web BFF a Microservicios
Rel(web_bff, customer_svc, "Consulta perfil de usuario", "gRPC / Sincrono")
Rel(web_bff, catalog_svc, "Consulta productos y categorias", "gRPC / Sincrono")
Rel(web_bff, order_svc, "Inicia proceso de checkout", "gRPC / Sincrono")
Rel(web_bff, cms_svc, "Obtiene banners y promociones", "gRPC / Sincrono")

' 4. Mobile BFF a Microservicios
Rel(mobile_bff, customer_svc, "Consulta perfil de usuario", "gRPC / Sincrono")
Rel(mobile_bff, catalog_svc, "Consulta productos y categorias", "gRPC / Sincrono")
Rel(mobile_bff, order_svc, "Inicia proceso de checkout", "gRPC / Sincrono")

' 5. Microservicios a sus Bases de Datos Exclusivas (Database-per-Service)
Rel(customer_svc, customer_db, "Lee y escribe datos de cliente", "JDBC / SSL")
Rel(catalog_svc, catalog_db, "Lee y escribe catalogo de productos", "Mongo Driver")
Rel(order_svc, order_db, "Almacena pedidos y tabla outbox", "JDBC / SSL")
Rel(cms_svc, cms_db, "Lee y escribe articulos y banners", "JDBC / SSL")

' 6. Publicacion y Consumo de Eventos Asincronos (EDA via Kafka)
Rel(order_svc, event_bus, "Publish OrderPlaced", "Kafka Protocol")
Rel(event_bus, order_svc, "Consume PaymentProcessed", "Kafka Protocol")
Rel(catalog_svc, event_bus, "Publish ProductUpdated", "Kafka Protocol")

@enduml
```

### 1.2. Tabla de Decisiones de Diseño Clave

| Concepto | Decisión Arquitectónica Final y Justificación Breve |
| :--- | :--- |
| `BFF vs. API Gateway` | Arquitectura híbrida de 2 capas: Edge Gateway para seguridad perimetral (WAF/Auth) y BFFs dedicados por canal (Web/Mobile) para agregación y optimización de payloads. |
| `Tipo SAGA para Pedidos` | SAGA por Orquestación liderada por Order Service, garantizando visibilidad centralizada del estado transaccional y coordinación precisa de transacciones compensatorias. |
| `Mapa de Contextos (Catálogo vs CMS)` | Relación Upstream/Downstream con Catálogo como Open Host Service / Published Language (OHS/PL) y CMS consumiendo mediante una Anticorruption Layer (ACL). |
| `Raíz de Agregado de Pedidos` | Entidad `Order` como Aggregate Root, protegiendo la invariante: *"El pedido no puede confirmarse si el monto total difiere de la suma de ítems o si el pago/reserva falla"*. |

### 1.3. Impacto Operacional: The Twelve-Factor App

*   **Factor III - Configuración (Config)**: Las credenciales de bases de datos, claves de API externas y endpoints de Kafka se inyectan exclusivamente mediante variables de entorno en tiempo de ejecución, permitiendo la misma imagen binaria en todos los entornos.
*   **Factor IV - Servicios de Respaldo (Backing Services)**: Bases de datos (PostgreSQL, MongoDB, Redis) y el broker Kafka son recursos adjuntos intercambiables mediante URLs de conexión configurables, sin alterar el código de los microservicios.

## 2. Resoluciones Finales de Diseño por Hito (Consolidación de Outputs 1, 2 y 3)

### 2.1. Resoluciones del Hito 1 (Descomposición y Arquitectura Base)

*   **Descomposición del Dominio**: Se establecen 4 Bounded Contexts autónomos (`Catálogo`, `Pedidos`, `Clientes`, `CMS`) desacoplados con *Database-per-Service* para garantizar la autonomía de datos y equipos.
*   **Subdivisión del Contexto de Pedidos**: Se subdivide en 3 servicios independientes: `Cart Service` (Redis en memoria para sesión efímera), `Order Service` (PostgreSQL para agregados durables) y `Payment Service` (aislamiento del perímetro PCI-DSS).
*   **Patrones de Comunicación**: Se utiliza comunicación síncrona (gRPC) para lecturas de baja latencia entre BFFs y microservicios; y asíncrona (Kafka) para propagación de eventos transaccionales (`OrderPlaced`, `OrderConfirmed`).

### 2.2. Resoluciones del Hito 2 (Comportamiento Distribuido, SAGA y DDD Táctico)

*   **Flujo Transaccional Distribuido**: Se implementa una orquestación no bloqueante con *Transactional Outbox Pattern + Debezium CDC* para la emisión confiable de eventos hacia Kafka, asegurando la atomicidad de las actualizaciones de base de datos y la publicación de eventos.
*   **Políticas de Resiliencia**: Se aplican Circuit Breakers (Resilience4j) en llamadas síncronas hacia pasarelas de pago y proveedores externos; y Reintentos con Backoff Exponencial e Idempotencia en consumidores de Kafka para manejar fallos transitorios y evitar efectos secundarios.
*   **Invariantes del Dominio**: Se garantiza el cumplimiento estricto de consistencia en el Aggregate Root `Order` (ej. total del pedido, transiciones de estado válidas) y el desacoplamiento de Catálogo y CMS mediante DTOs publicados y una Anti-Corruption Layer.

### 2.3. Resoluciones del Hito 3 (Escalabilidad, Observabilidad y Despliegue Cloud-Native)

*   **Estrategia de Escalabilidad Elástica**: Se implementa el escalado horizontal autónomo por microservicio (HPA en Kubernetes) aprovechando la naturaleza *stateless* de los servicios (Factor VI), permitiendo una adaptación dinámica a la demanda.
*   **Trazabilidad y Observabilidad**: Se asegura la propagación de `TraceID` / `SpanID` con OpenTelemetry a través de API Gateway, gRPC y cabeceras de Kafka, facilitando el monitoreo y la depuración de flujos distribuidos.
*   **Gestión de Fallas y Desechabilidad**: Se garantiza el apagado elegante (*Graceful Shutdown* ante `SIGTERM`) para despliegues sin interrupción y se utilizan colas de descarte (*Dead Letter Queues - DLQ*) para el aislamiento y reprocesamiento de mensajes corruptos o fallidos.

---
**Fin del Informe Consolidado de Diseño Arquitectónico para ShopStream.**