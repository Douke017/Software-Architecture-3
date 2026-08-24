# Context Engineering Prompt - Informe Consolidado de Arquitectura (report.md - Week 7 ShopStream)

## Contexto de Referencia
Asimila la descripción del problema en `../context/problem_description.md`, las directrices del rol en `../../shared_context/role.md`, el marco de microservicios en `../../shared_context/architecture_framework.md`, los principios de `../../shared_context/twelve_factor_app_guide.md`, las reglas C4 en `../../shared_context/structurizr_c4_guide.md` y los 3 entregables generados de la Semana 7 (`outputs/output1.md`, `outputs/output2.md`, `outputs/output3.md`).

---

## Directivas Arquitectónicas Imperativas para el Modelo

Actúa como **Principal Software & Enterprise Architect** y elabora el **Informe Consolidado de Diseño Arquitectónico para ShopStream** (guardado como `report.md` en la raíz de `Week7` y en `outputs/report.md`).

Tu informe debe ser **ejecutivo, sintético, directo y de máximo 2 páginas**, respondiendo de forma concluyente a cada punto de los 3 outputs **sin incluir análisis de trade-offs intermedios, preámbulos ni resúmenes exploratorios; ÚNICAMENTE LAS RESPUESTAS Y DECISIONES FINALES DE DISEÑO**.

---

### Estructura Obligatoria y Entregables del Reporte Consolidado (Numeración Profesional desde la Sección 1)

#### 1. Resumen de Diseño Arquitectónico Ejecutivo

##### 1.1. Diagrama de Alto Nivel de ShopStream (Modelo C4 - Structurizr Standard)
Genera un **Diagrama C4 de Alto Nivel** en PlantUML (`!include <C4/C4_Container>`) limpio, parseable y con todas sus conexiones de enrutamiento explícitas:
- Muestra el Cliente (`Person`), la capa de entrada `API Gateway` y `BFFs` (`Web BFF` y `Mobile BFF`), los tres servicios centrales de dominio (`Catalog Service`, `Order Service`, `Customer Service`) y el contexto `CMS Service`.
- Incluye las bases de datos dedicadas para cada servicio y el bus de eventos `Apache Kafka`.
- *Reglas C4*: Cierre de `System_Boundary` antes de los `Rel`, una sola línea por macro, comillas balanceadas y cero comas dentro de textos.

##### 1.2. Tabla de Decisiones de Diseño Clave
Presenta una tabla markdown compacta (una sola línea por fila, celdas directas) con las decisiones finales adoptadas:

| Concepto | Decisión Arquitectónica Final y Justificación Breve |
| :--- | :--- |
| `BFF vs. API Gateway` | Arquitectura híbrida de 2 capas: Edge Gateway para seguridad perimetral (WAF/Auth) y BFFs dedicados por canal (Web/Mobile) para agregación y optimización de payloads. |
| `Tipo SAGA para Pedidos` | SAGA por Orquestación liderada por Order Service, garantizando visibilidad centralizada del estado transaccional y coordinación precisa de transacciones compensatorias. |
| `Mapa de Contextos (Catálogo vs CMS)` | Relación Upstream/Downstream con Catálogo como Open Host Service / Published Language (OHS/PL) y CMS consumiendo mediante una Anticorruption Layer (ACL). |
| `Raíz de Agregado de Pedidos` | Entidad `Order` como Aggregate Root, protegiendo la invariante: *"El pedido no puede confirmarse si el monto total difiere de la suma de ítems o si el pago/reserva falla"*. |

##### 1.3. Impacto Operacional: The Twelve-Factor App
Presenta los dos factores clave seleccionados y su aplicación concreta en ShopStream:
- **Factor III - Configuración (Config)**: Separación absoluta de código y configuración. Las credenciales de bases de datos, claves de API externas y endpoints de Kafka se inyectan exclusivamente mediante variables de entorno en tiempo de ejecución.
- **Factor IV - Servicios de Respaldo (Backing Services)**: Bases de datos (PostgreSQL, MongoDB, Redis) y el broker Kafka son recursos adjuntos intercambiables mediante URLs de conexión sin alterar el código de los microservicios.

#### 2. Resoluciones Finales de Diseño por Hito (Consolidación de Outputs 1, 2 y 3)
Sintetiza la respuesta final y definitiva para cada punto evaluado a lo largo de la semana:

##### 2.1. Resoluciones del Hito 1 (Descomposición y Arquitectura Base)
- **Descomposición del Dominio**: 4 Bounded Contexts autónomos (`Catálogo`, `Pedidos`, `Clientes`, `CMS`) desacoplados con *Database-per-Service*.
- **Subdivisión del Contexto de Pedidos**: Subdivisión en 3 servicios independientes: `Cart Service` (Redis en memoria para sesión efímera), `Order Service` (PostgreSQL para agregados durables) y `Payment Service` (aislamiento del perímetro PCI-DSS).
- **Patrones de Comunicación**: Síncrono (gRPC) para lecturas de baja latencia entre BFFs y microservicios; Asíncrono (Kafka) para propagación de eventos transaccionales (`OrderPlaced`, `OrderConfirmed`).

##### 2.2. Resoluciones del Hito 2 (Comportamiento Distribuido, SAGA y DDD Táctico)
- **Flujo Transaccional Distribuido**: Orquestación no bloqueante con *Transactional Outbox Pattern + Debezium CDC* para emisión confiable de eventos hacia Kafka.
- **Políticas de Resiliencia**: Circuit Breakers (Resilience4j) en llamadas hacia pasarelas de pago y proveedores externos; Reintentos con Backoff Exponencial e Idempotencia en consumidores de Kafka.
- **Invariantes del Dominio**: Cumplimiento estricto de consistencia en el Aggregate Root `Order` y desacoplamiento de Catálogo y CMS mediante DTOs publicados.

##### 2.3. Resoluciones del Hito 3 (Escalabilidad, Observabilidad y Despliegue Cloud-Native)
- **Estrategia de Escalabilidad Elástica**: Escalado horizontal autónomo por microservicio (HPA en Kubernetes) aprovechando la naturaleza *stateless* (Factor VI).
- **Trazabilidad y Observabilidad**: Propagación de `TraceID` / `SpanID` con OpenTelemetry a través de API Gateway, gRPC y cabeceras de Kafka.
- **Gestión de Fallas y Desechabilidad**: Apagado elegante (*Graceful Shutdown* ante `SIGTERM`) y colas de descarte (*Dead Letter Queues - DLQ*) para aislamiento de mensajes corruptos.

---

## Formato del Entregable
Guarda el informe consolidado final en `../report.md` (y en `../outputs/report.md`).
