# Context Engineering Master Prompt - Assignment 7: Patrones C4, Database-per-Service y Diseño DDD Táctico/Estratégico (Week 7)

## Contexto de Referencia
Asimila las directrices del rol en `../../shared_context/role.md`, el marco de microservicios en `../../shared_context/architecture_framework.md`, los principios de `../../shared_context/twelve_factor_app_guide.md`, las guías de diagramación C4 en `../../shared_context/structurizr_c4_guide.md` y `../../shared_context/plantuml_guide.md`, las reglas de formato en `../../shared_context/markdown_guide.md`, la descripción del problema en `./problem_description.md` y los objetivos específicos en `./specifics_objectives.md`.

---

## Directivas Arquitectónicas Imperativas para el Modelo

Actúa como **Principal Software & Enterprise Architect** y elabora un informe técnico de arquitectura completo (extensión de 3 a 4 páginas) para la plataforma de pedidos de comida, integrando patrones avanzados en el Modelo C4, resolviendo los desafíos de *Database-per-Service*, y modelando el diseño estratégico y táctico de Domain-Driven Design (DDD).

---

### Ejes de Razonamiento Arquitectónico y Entregables de Assignment 7 (Numeración Profesional desde la Sección 1)

#### 1. Integración de Patrones Arquitectónicos en el Ecosistema C4
Analiza y describe escenarios concretos de aplicación para tres patrones arquitectónicos fundamentales:
- **Patrón Backend-for-Frontend (BFF)**:
  - Justificación de BFFs especializados por tipo de cliente (`Mobile Client BFF`, `Restaurant Kitchen Tablet BFF`, `Driver Mobile BFF`).
  - Explica cómo cada BFF adapta los payloads, reduce el *over-fetching* y aísla la experiencia de usuario sin contaminar los microservicios de dominio.
- **Patrón Circuit Breaker (Resilience4j / Envoy)**:
  - Identificación de los puntos de integración de alto riesgo (ej. llamadas síncronas hacia la pasarela de pagos externa o proveedores de notificaciones SMS/Push).
  - Definición de estados (Closed, Open, Half-Open), umbrales de fallo y estrategias de degradación elegante (*Graceful Fallback*).
- **Patrón SAGA para Transacciones Distribuidas**:
  - Comparación y justificación del tipo de SAGA (Orquestación vs. Coreografía) para coordinar el ciclo de vida del pedido (`OrderPlaced` -> `OrderAccepted` -> `DriverAssigned` -> `OrderDelivered`).
  - Especificación de la máquina de estados y las transacciones compensatorias ante rechazo de pago, falta de disponibilidad de cocina o ausencia de repartidores.

#### 2. Modelo C4 Nivel 1: Diagrama de Contexto de Sistema (Structurizr Standard)
- **Diagrama PlantUML 1 (Contexto de Sistema - C4 Nivel 1)**:
  - Aplica `!include <C4/C4_Context>` conforme a `structurizr_c4_guide.md`.
  - Muestra los 3 actores principales (`Cliente`, `Personal del Restaurante/Cocina`, `Repartidor`), la plataforma central de pedidos y los sistemas externos asociados (`Pasarela de Pagos Externa`, `Proveedor Notificaciones SMS/Push`).
  - *Reglas de Diagramación*: Cierre de etiquetas limpio, comillas balanceadas, una sola línea por macro y cero comas dentro de los textos entre comillas.

#### 3. Desafíos de la Persistencia Descentralizada (*Database-per-Service*) y Mitigaciones
Analiza en profundidad los cuatro desafíos críticos inherentes a la propiedad exclusiva de datos por microservicio y detalla la estrategia de ingeniería para superarlos:
1. **Transacciones Distribuidas y Escrituras Duales**:
   - *Desafío*: Riesgo de inconsistencia si la base de datos local se actualiza pero falla la publicación del evento en Kafka.
   - *Mitigación*: Implementación del **Transactional Outbox Pattern + Debezium CDC** para garantizar atomicidad local y publicación confiable *at-least-once*.
2. **Consultas Cruzadas y Agregación de Datos (Join Queries)**:
   - *Desafío*: Imposibilidad de ejecutar `JOINs` relacionales directos entre tablas de diferentes microservicios.
   - *Mitigación*: Aplicación del patrón **CQRS (Command Query Responsibility Segregation)** con vistas materializadas proyectadas asíncronamente mediante eventos.
3. **Duplicación de Datos y Consistencia Eventual**:
   - *Desafío*: Necesidad de replicar datos maestros (ej. nombre del plato o dirección) en múltiples servicios para evitar llamadas síncronas "chatty".
   - *Mitigación*: Propagación de eventos de dominio con datos enriquecidos (*Event-Carried State Transfer*) y aceptación de consistencia eventual.
4. **Evolución de Esquemas y Migraciones Independientes**:
   - *Desafío*: Riesgo de romper contratos entre servicios al evolucionar esquemas de datos.
   - *Mitigación*: Versionado estricto de eventos con **Schema Registry (Apache Avro / Protobuf)** y migraciones independientes de base de datos (Flyway / Liquibase).

#### 4. Diseño Estratégico DDD: Bounded Contexts y Context Mapping
- **Identificación de Contextos Delimitados**:
  - Delimita y describe los Bounded Contexts clave del ecosistema: `Contexto de Pedidos`, `Contexto de Cocina/Restaurante`, `Contexto de Entrega y Despacho`, `Contexto de Facturación y Pagos`, `Contexto de Fidelización` y `Contexto de Clientes`.
- **Mapeo de Relaciones Estratégicas (Context Map)**:
  - Define formalmente las relaciones entre los contextos aplicando los patrones de DDD: *Customer-Supplier (Upstream/Downstream)*, *Partnership / Asociación*, *Open Host Service / Published Language (OHS/PL)* y *Anticorruption Layer (ACL)*.
- **Diagrama PlantUML 2 (Context Map Estratégico)**:
  - Diagrama nativo parseable que muestre los Bounded Contexts y sus etiquetas de relación formal (`[U]`, `[D]`, `[OHS]`, `[PL]`, `[ACL]`, `[P]`).

#### 5. Diseño Táctico DDD: Modelado de 4 Agregados Clave, Raíces e Invariantes
Modela en detalle cuatro agregados centrales del dominio:
1. **Agregado Pedido (`Order Aggregate`)**:
   - *Aggregate Root*: Entidad `Order`.
   - *Entidades y Value Objects*: `OrderItem`, `DeliveryAddress`, `Money`, `OrderStatus`.
   - *Invariante de Negocio*: El total del pedido debe coincidir exactamente con la suma de los subtotales de ítems más impuestos y tarifas de envío; el pedido no puede pasar a confirmado sin pago exitoso.
2. **Agregado Entrega (`Delivery Aggregate`)**:
   - *Aggregate Root*: Entidad `DeliveryTrip`.
   - *Entidades y Value Objects*: `DriverLocation`, `RouteWaypoint`, `DeliveryStatus`, `ETA`.
   - *Invariante de Negocio*: No se puede asignar un repartidor si su estado no es disponible; el viaje de entrega no puede completarse sin registrar las coordenadas GPS de destino.
3. **Agregado Cocina (`Kitchen Ticket Aggregate`)**:
   - *Aggregate Root*: Entidad `KitchenTicket`.
   - *Entidades y Value Objects*: `TicketItem`, `PreparationStage`, `EstimatedPrepTime`.
   - *Invariante de Negocio*: Un ticket no puede marcarse como "Listo para Recoger" sin haber pasado previamente por el estado "En Preparación".
4. **Agregado Facturación (`Payment Transaction Aggregate`)**:
   - *Aggregate Root*: Entidad `PaymentTransaction`.
   - *Entidades y Value Objects*: `PaymentMethodToken`, `Currency`, `TransactionReceipt`, `PaymentStatus`.
   - *Invariante de Negocio*: Toda transacción debe incluir una clave de idempotencia única para prevenir cobros duplicados.
- **Diagrama PlantUML 3 (Diagrama Estructural de Agregados Tácticos)**:
  - Diagrama de clases/estructuras nativo ilustrando los 4 Aggregate Roots, sus entidades internas, Value Objects y métodos de dominio.

#### 6. Perfilado de Carga y Estrategias de Escalabilidad
Clasifica y detalla las estrategias de escalado para cada perfil de carga del sistema:
- **Servicios Intensivos en Lectura (Read-Intensive)** (ej. *Servicio de Menú / Catálogo*):
  - Estrategia: Caché distribuida multi-nivel (Redis Cluster con TTLs adaptativos), Edge CDN y Read Replicas en MongoDB/PostgreSQL.
- **Servicios Intensivos en Escritura (Write-Intensive)** (ej. *Servicio de Pedidos durante horas pico*):
  - Estrategia: Ingesta desacoplada mediante Kafka Topics particionados por `restaurantId`, Transactional Outbox y escalado horizontal automático de pods (HPA).
- **Servicios Intensivos en Cómputo (Compute-Intensive)** (ej. *Servicio de Despacho de Entrega - Delivery Dispatch*):
  - Estrategia: Nivelación de carga basada en colas (Queue-based Load Leveling), workers desacoplados sin estado escalados por *Consumer Lag* (KEDA) y algoritmos de optimización espacial en memoria (H3/S2).

#### 7. Lista de Verificación (Checklist de Assignment 7)
- Casillas markdown `[x]` verificando todos los entregables.

---

## Formato del Entregable
Guarda el informe técnico completo en `./assignment7_output.md`.
