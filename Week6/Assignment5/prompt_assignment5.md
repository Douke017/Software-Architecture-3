# Context Engineering Master Prompt - Assignment 5: Modelo C4 Orientado a MSA & EDA con Estilo Structurizr (Week 6)

## Contexto de Referencia
Asimila las directrices del rol en `../../shared_context/role.md`, el marco de microservicios en `../../shared_context/architecture_framework.md`, las guías de diagramación en `../../shared_context/plantuml_guide.md` y `../../shared_context/structurizr_c4_guide.md`, las reglas de formato en `../../shared_context/markdown_guide.md`, la descripción del problema en `./problem_description.md` y los objetivos específicos en `./specifics_objectives.md`.

---

## Directivas Arquitectónicas Imperativas para el Modelo

Actúa como **Principal Software & Enterprise Architect** y elabora un informe técnico de arquitectura completo (extensión de 3-4 páginas) para la plataforma de pedidos de comida, orientando el **Modelo C4 a una Arquitectura de Microservicios (MSA)** guiada por eventos (EDA).

Debes aplicar estrictamente la **Identidad Visual de Structurizr C4** (`structurizr_c4_guide.md`) en todos los diagramas PlantUML, asegurando que cada componente tenga su color representativo y que las comunicaciones y bases de datos estén explícitamente delimitadas.

---

### Ejes de Análisis y Entregables Requeridos (Numeración Profesional desde la Sección 1)

#### 1. Resumen Ejecutivo del Modelo C4 Orientado a Microservicios (MSA & EDA)
- Descripción del enfoque arquitectónico: Descomposición por Bounded Contexts, patrón *Database-per-Service* y comunicación asíncrona desacoplada via Message Broker (Apache Kafka).

#### 2. Modelo C4 Nivel 1: Diagrama de Contexto de Sistema (Estilo Structurizr)
- **Diagrama PlantUML 1 (Contexto de Sistema - C4 Nivel 1)**:
  - Muestra los 3 actores principales (`Cliente Mobile/Web\n<<Person>>` `#E0F2FE`, `Personal de Cocina\n<<Person>>` `#E0F2FE`, `Conductor Repartidor\n<<Person>>` `#E0F2FE`), la plataforma central (`Sistema Pedidos Comida\n<<SoftwareSystem>>` `#DCFCE7`) y los proveedores externos (`Pasarela de Pagos Externa\n<<ExternalSystem>>` `#FFEDD5`, `Proveedor Push/SMS\n<<ExternalSystem>>` `#FFEDD5`).
  - *Reglas Visuales Structurizr*: Tarjetas de color Structurizr, sin `skinparam handwritten true`, sin ovalos `usecase`, cajas rectangulares limpias con texto oscuro contrastante.

#### 3. Modelo C4 Nivel 2: Diagrama de Contenedores de Microservicios & Topología de Datos (Estilo Structurizr)
- **Diagrama PlantUML 2 (Contenedores - C4 Nivel 2)**:
  - Representa con la paleta visual Structurizr:
    - `API Gateway / BFF` `#DCFCE7`
    - Los 6 microservicios autónomos (`Order Service` `#DBEAFE`, `Restaurant Service` `#DBEAFE`, `Delivery Service` `#DBEAFE`, `Notification Service` `#DBEAFE`, `Loyalty Service` `#DBEAFE`, `Analytics Service` `#DBEAFE`)
    - El `Event Bus (Apache Kafka)` `#FDE68A`
    - La capa de persistencia descentralizada *Database-per-Service* (`Order DB PostgreSQL` `#DDD6FE`, `Restaurant DB MongoDB` `#DDD6FE`, `Delivery DB PostGIS` `#DDD6FE`, `Notification Cache Redis` `#DDD6FE`, `Loyalty DB PostgreSQL` `#DDD6FE`, `Analytics DW ClickHouse` `#DDD6FE`).
  - **Etiquetado Explícito de Patrones de Comunicación**: Escribir en cada flecha si la comunicación es `Síncrona (gRPC/REST)` o `Asíncrona (Kafka Events)`.

- **Tabla de Identificación de Microservicios, Límites y Persistencia Descentralizada (Markdown Limpio, Celdas Breves de 10-12 Palabras)**:
  | Microservicio | Responsabilidad y Límite de Dominio | Motor de Base de Datos Asociado | Patrón de Comunicación |
  | :--- | :--- | :--- | :--- |
  | `Order Service` | Orquesta checkout y máquina de estados del pedido. | PostgreSQL (`order_db`) | Síncrono gRPC / Asíncrono Kafka |
  | `Restaurant Service` | Gestiona aceptación de pedidos en cocina. | MongoDB (`restaurant_db`) | Asíncrono Kafka (`OrderPlaced`) |
  | `Delivery Service` | Asigna conductores y rastrea entregas. | PostgreSQL + PostGIS (`delivery_db`) | Asíncrono Kafka (`OrderAccepted`) |
  | `Notification Service` | Entrega emails, SMS y alertas push. | Redis (`notif_cache`) | Asíncrono Kafka (Multi-Consumer) |
  | `Loyalty Service` | Gestiona puntos y recompensas del cliente. | PostgreSQL (`loyalty_db`) | Asíncrono Kafka (`OrderDelivered`) |
  | `Analytics Service` | Genera reportes de negocio e indicadores. | ClickHouse / BigQuery | Asíncrono Kafka Stream (OLAP) |

#### 4. Modelo C4 Nivel 3: Diagrama de Componentes del Order Service (Estilo Structurizr)
- **Diagrama PlantUML 3 (Componentes - C4 Nivel 3)**:
  - Detalla los componentes internos de `Order Service` usando la paleta Structurizr (`#DBEAFE`): `Order REST Controller`, `Order Business Service`, `Order Outbox Publisher`, `Order Repository` y `Event Listener Component`.

#### 5. Flujo Central de Eventos y Diagrama de Secuencia de Coreografía
- **Matriz de Eventos de Negocio (Tabla Markdown Limpia con Celdas Breves)**:
  | Evento de Negocio | Servicio Emisor | Servicios Consumidores | Protocolo / Canal | Payload Clave (Alto Nivel) |
  | :--- | :--- | :--- | :--- | :--- |
  | `OrderPlaced` | `Order Service` | `Restaurant`, `Notification`, `Loyalty` | Kafka Topic (`order-events`) | `orderId`, `userId`, `items`, `totalAmount` |
  | `OrderAccepted` | `Restaurant Service` | `Delivery`, `Notification` | Kafka Topic (`restaurant-events`) | `orderId`, `restaurantId`, `prepTimeMinutes` |
  | `DriverAssigned` | `Delivery Service` | `Notification` | Kafka Topic (`delivery-events`) | `orderId`, `driverId`, `driverName`, `eta` |
  | `OrderDelivered` | `Delivery Service` | `Loyalty`, `Analytics` | Kafka Topic (`delivery-events`) | `orderId`, `deliveredTimestamp`, `ratingPrompt` |

- **Diagrama PlantUML 4 (Secuencia del Flujo de Eventos por Coreografía)**:
  - Ilustra la publicación y consumo asíncrono de los 4 eventos centrales (`OrderPlaced`, `OrderAccepted`, `DriverAssigned`, `OrderDelivered`).
  - *Regla Estricta de Secuencia*: PROHIBIDO usar estereotipos `<< >>` en líneas `participant`, PROHIBIDO usar la palabra clave `queue`, PROHIBIDO apóstrofes `'` o paréntesis `()` en mensajes de secuencia.

#### 6. Consideraciones de Consistencia e Integridad de Datos a través de los Servicios
Desarrolla un análisis técnico exhaustivo sobre cómo mantener la integridad y consistencia de datos entre microservicios autónomos:
- **Consistencia Eventual vs. Consistencia ACID Local**: Explicación de por qué no se utilizan transacciones distribuidas 2PC (*Two-Phase Commit*) y cómo cada servicio garantiza ACID dentro de su propia base de datos.
- **Patrón Saga por Coreografía**: Gestión de transacciones de larga duración a través de eventos de compensación ante fallas (ej. si el restaurante rechaza el pedido, `Order Service` compensa cancelando la orden y `Loyalty Service` desbloquea los puntos).
- **Transactional Outbox Pattern + Debezium CDC**: Explicación de cómo `Order Service` garantiza la integridad al escribir el pedido y el evento en la misma base de datos PostgreSQL local antes de publicarlo en Kafka, previniendo la pérdida de eventos ante caídas de red.

#### 7. Lista de Verificación (Checklist de Assignment 5)
- Casillas markdown `[x]` verificando todos los entregables.

---

## Reglas Estrictas de Formato Markdown y PlantUML Structurizr
1. **IDENTIDAD VISUAL STRUCTURIZR**: Todos los diagramas C4 (Nivel 1, Nivel 2 y Nivel 3) DEBEN incluir los colores Structurizr (`#E0F2FE` Persons, `#DCFCE7` Gateway/System, `#DBEAFE` Microservices, `#FDE68A` Event Bus, `#DDD6FE` Databases, `#FFEDD5` External Partners).
2. **CELDAS CONCISAS**: Máximo 10 a 12 palabras por celda para evitar deformación horizontal de tablas.
3. **PLANTUML NATIVO Y LEGIBLE**: Diagramas limpios sin `handwritten true`, sin ovalos `usecase` y con alto contraste de texto.

---

## Entregable
Guarda la respuesta técnica completa en `./assignment5_output.md`.
