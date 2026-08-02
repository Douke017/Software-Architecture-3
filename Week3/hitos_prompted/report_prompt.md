# Context Engineering Prompt - Informe Final Sintético: Arquitectura Objetivo y Decisiones de Diseño (report.md)

## Contexto de Referencia
Asimila las directrices del rol en `../context/role.md`, las reglas visuales en `../context/markdown_guide.md`, la guía de diagramación en `../context/plantuml_guide.md`, el escenario de negocio en `../context/problem_description.md` y las especificaciones de los hitos anteriores.

---

## Directivas Arquitectónicas para el Modelo

Actúa como **Principal Software & Enterprise Architect** y elabora el informe ejecutivo de síntesis final **`report.md`** (con una extensión de **máximo 2 páginas**, entre 800 y 1,200 palabras) que consolide la visión arquitectónica propuesta para resolver la escalabilidad, resiliencia e interoperabilidad de sistemas de alto volumen (FlashSales Inc. & Ecosistemas Multi-canal).

---

### Ejes de Análisis y Estructura del Informe

#### 1. Representación Visual de la Arquitectura Propuesta (PlantUML)
Genera **un único diagrama de componentes completo e integrador en PlantUML** (` ```plantuml @startuml ... @enduml `) que consolide toda la arquitectura objetivo propuesta:
- **Capa de Borde e Ingesta**: API Gateway Global (Rate Limiting, Auth, Caching).
- **Capa de Microservicios Stateless**: Servicios desacoplados de Checkout, Catálogo, Ordenes y Notificaciones.
- **Backbone de Mensajería y Eventos (Event Bus)**: Broker distribuido (ej. Apache Kafka) gestionando patrones Pub/Sub y P2P para eventos clave (`purchase_attempt`, `inventory_updated`, `user_joined`).
- **Capa de Procesamiento de Flujos en Tiempo Real**: Procesadores de flujo (ej. Flink / Kafka Streams) realizando detección de fraude en ventanas deslizantes y actualización atómica de stock.
- **Capa de Datos e Híbrida**: Caché distribuido en memoria (Redis Cluster), Base de datos relacional con réplicas de lectura, y conector CDC (Debezium) para migración sin interrupción.
- **Capa de Observabilidad**: Colector APM / Métricas (Prometheus, Grafana).

*Aplica estrictamente las reglas de `plantuml_guide.md`: Estereotipos en una sola palabra sin espacios (ej. `<<EdgeGateway>>`, `<<MessageBroker>>`), flechas válidas (`-->`, `->`, `..>`), y `rectangle` para representar clientes/usuarios.*

#### 2. Documento Sintético de Decisiones de Diseño y Cobertura de Rendimiento (Máx. 2 páginas)
Desarrolla las siguientes dos secciones ejecutivas:

- **Sección A: Justificación de las Decisiones de Diseño Clave**:
  - **Desacoplamiento Asíncrono (EDA)**: Por qué la transición de llamadas síncronas bloqueantes a eventos asíncronos elimina el agotamiento de hilos (*thread pool starvation*) y aísla fallas en cascada.
  - **Patrones de Mensajería (P2P vs. Pub/Sub)**: Por qué se usa P2P para competencia de workers de alta concurrencia y Pub/Sub para eventos de múltiples consumidores (inventario, analítica, notificaciones).
  - **Procesamiento de Flujos en Tiempo Real**: Justificación del uso de ventanas temporales (*Sliding/Tumbling Windows*) y semántica *Exactly-Once* para inventario y fraude.
  - **Estrategia de Datos y CDC**: Uso de cachés para absorber 90%+ de lecturas y Change Data Capture para migración continua cero-downtime.

- **Sección B: Cobertura de Requisitos de Rendimiento por Componente**:
  Matriz o análisis estructurado explicando cómo cada componente aborda cuantitativamente los SLAs del sistema:
  - **API Gateway**: Absorción de picos y respuesta inicial HTTP 202 Accepted en `< 100 ms`.
  - **Redis Cluster**: Absorción de lecturas masivas con latencia `< 5 ms`.
  - **Event Bus (Broker)**: Ingesta sostenida de `> 5,000 req/s` con amortiguación de carga (*load smoothing*).
  - **Stream Processors**: Detección de fraude en ventanas de 5s y consistencia de inventario en `< 200 ms` (p99).
  - **Observabilidad (APM)**: Detección proactiva de saturación de CPU/memoria y alertas de lag.

---

## Entregable
Guarda la respuesta técnica consolidada en `../report.md` (y `../outputs/report.md`).
