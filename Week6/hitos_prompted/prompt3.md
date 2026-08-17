# Context Engineering Master Prompt - Hito 3: Gestión de Datos y Escalabilidad (QuickCart - Week 6)

## Contexto de Referencia
Asimila las directrices del rol en `../context/role.md`, la descripción del problema QuickCart en `../context/problem_description.md`, las reglas de formato en `../context/markdown_guide.md`, los estándares de diagramación en `../context/plantuml_guide.md` y los resultados acumulados de los Hitos 1 y 2 (`output1.md`, `output2.md`).

---

## Directivas Arquitectónicas Imperativas para el Modelo

Actúa como **Principal Software & Enterprise Architect** especializado en **Arquitectura de Datos Descentralizada (Database-per-Service)** y **Estrategias de Escalabilidad**. Elabora el informe técnico de arquitectura definitivo para el **Hito 3: Gestión de Datos y Escalabilidad de QuickCart**.

Tu informe debe destacar por su **rigor técnico, análisis explícito de titularidad de datos (ownership), modelos de almacenamiento políglotas (SQL, NoSQL, In-Memory), estrategias de escalamiento (Horizontal, Vertical, Réplicas de Lectura, Sharding), investigación de un vendor de base de datos real (ej. AWS Aurora PostgreSQL o Redis Cluster), análisis del efecto dominó y anti-patrones de persistencia**.

---

### Estructura Obligatoria y Entregables del Hito 3 (Numeración Profesional desde la Sección 1)

#### 1. Titularidad de Datos y Descentralización en QuickCart
- **Análisis de Propiedad de Datos (Data Ownership)**: Explica el principio de *Database-per-Service*, garantizando que ningún microservicio acceda a las tablas de otro servicio de forma directa ni mediante joins cruzados en la base de datos.
- **Definición de 3 Microservicios Clave para el Análisis de Datos**:
  1. `Order Management Service`: Titular de transacciones de compra, historial de estados y detalle de órdenes.
  2. `Catalog and Search Service`: Titular de metadatos de productos, categorías, atributos y precios de lista.
  3. `Cart Service`: Titular de sesiones de compras efímeras, carritos activos y totalizaciones tentativas.

#### 2. Selección de Persistencia y Estrategias de Escalamiento
Para los 3 microservicios seleccionados, desglosa en subsecciones técnicas:

- **2.1. Order Management Service**:
  - *Persistencia Sugerida*: Relacional ACID (PostgreSQL). Justificación basada en integridad financiera, transacciones ACID estrictas e historial auditable.
  - *Estrategia de Escalamiento*: Escalamiento Vertical primario para escrituras con Réplicas de Lectura (*Read Replicas*) asíncronas para consultas históricas.
- **2.2. Catalog and Search Service**:
  - *Persistencia Sugerida*: Documentos NoSQL (MongoDB / Elasticsearch). Justificación basada en esquemas flexibles de atributos de productos, búsqueda full-text y alto rendimiento de lectura.
  - *Estrategia de Escalamiento*: Escalamiento Horizontal masivo (*Auto-scaling groups* y *Replica Sets*) para responder a tráfico masivo de exploración.
- **2.3. Cart Service**:
  - *Persistencia Sugerida*: In-Memory Key-Value (Redis Cluster). Justificación basada en latencia sub-milisegundo, TTL automático para carritos abandonados y mutabilidad constante.
  - *Estrategia de Escalamiento*: Escalamiento Horizontal mediante *Sharding / Partitioning* automático por `userId`.

#### 3. Tabla Resumen de Gestión de Datos y Escalado
Tabla Markdown con celdas concisas de máximo 10-12 palabras por celda:

| Servicio | Datos que Posee (Ownership) | Tipo de Persistencia & Escalado | Riesgo / Falla de Vendor |
| :--- | :--- | :--- | :--- |
| `Order Service` | Historial de pedidos, estados y cobros. | RDBMS PostgreSQL ACID / Vertical + Réplicas | Bloqueos de tabla y saturación de conexiones. |
| `Catalog Service` | Metadatos de productos y precios. | NoSQL Documentos / Horizontal con Caching | Desincronización de réplicas y lecturas obsoletas. |
| `Cart Service` | Carritos temporales, ítems y TTL. | In-Memory Redis Key-Value / Horizontal Sharding | Pérdida de memoria en cluster y eviction masivo. |

- **Diagrama PlantUML 1 (Topología de Persistencia Descentralizada y Escalamiento)**: Diagrama nativo parseable mostrando los 3 microservicios con sus respectivas bases de datos aisladas y réplicas de lectura.

#### 4. Investigación y Selección Justificada de un Vendor de Base de Datos Real
- Selecciona una tecnología/vendor de base de datos real en la nube (ej. **AWS Aurora PostgreSQL** o **MongoDB Atlas**).
- Desarrolla una evaluación técnica completa en 5 criterios (incluyendo escalabilidad como eje central):
  1. `Escalabilidad Gestionada`: Capacidad de Auto-scaling de almacenamiento hasta 128TB y adición automática de réplicas de lectura en minutos.
  2. `Rendimiento y Throughput`: Replicación distribuida de baja latencia con motor de almacenamiento optimizado.
  3. `Modelo de Costos`: Costo por capacidad reservada + IOPS bajo demanda sin sobredimensionar infraestructura.
  4. `SLA y Alta Disponibilidad`: Disponibilidad del 99.99% con failover automático multi-AZ en menos de 30 segundos.
  5. `Soporte y Operaciones`: Respaldos automatizados point-in-time (PITR) y parches sin tiempo de inactividad.

#### 5. Análisis de Efecto Dominó ante Fallas de Escalado y Anti-Patrón Evitado

##### 5.1. Identificación del Efecto Dominó ante Falla de Escalado del Vendor
- Describe el escenario de saturación de conexiones o falla de escalado en la base de datos de pedidos (ej. AWS Aurora saturada por consultas lentas no indexadas).
- Análisis en cadena: Acumulación de hilos en `Order Service` -> Agotamiento de CPU/Memoria -> Timeouts en `API Gateway` -> Parálisis total de las compras de clientes en QuickCart.

##### 5.2. Párrafo Explícito sobre el Anti-Patrón Evitado (Database Compartida / Dual Writes / 2PC)
- Desarrolla un análisis contundente en un párrafo dedicado sobre el **Anti-patrón evitado** (ej. **Shared Database / Shared Schema** o **Transacciones Distribuidas 2PC**):
  - *Análisis*: Evitar compartir una única base de datos entre `Cart`, `Catalog` y `Order` impide que el tráfico de exploración de catálogo o la mutación constante de carritos bloquee las tablas transaccionales de pedidos, eliminando el riesgo de contención de bloqueos y garantizando que la falla de un motor de datos no derribe la plataforma.

- **Diagrama PlantUML 2 (Arquitectura Resiliente de Persistencia e Independencia de Datos)**: Diagrama nativo parseable mostrando la separación estricta de motores de persistencia y prevención del antipatrón.

#### 6. Lista de Verificación (Checklist del Hito 3)
Incluye una lista de verificación al final con casillas markdown `[x]`:
- `[x] Titularidad de datos explicada para al menos 3 microservicios (Order, Catalog, Cart)`
- `[x] Tipo de persistencia sugerida y justificada (SQL, NoSQL, In-Memory)`
- `[x] Estrategias de escalamiento (Horizontal, Vertical, Réplicas) justificadas`
- `[x] Vendor de base de datos investigado y evaluado (AWS Aurora / MongoDB Atlas / Redis)`
- `[x] Tabla resumen entregada con celdas concisas`
- `[x] Escenario de efecto dominó ante fallas de escalado analizado`
- `[x] Párrafo explícito sobre el anti-patrón de persistencia evitado (Shared Database)`

---

## Reglas Estrictas de Formato Markdown y PlantUML (ALTO CONTRASANTE Y SINTAXIS LIMPIA)
1. **ASIGNACIÓN DE COLORES EXPLÍCITOS EN ELEMENTOS**: Asigna a CADA elemento un color de fondo claro explícito (`#DBEAFE`, `#DCFCE7`, `#FEF08A`, `#DDD6FE`, `#FFEDD5`, `#F1F5F9`) para evitar texto blanco sobre fondo blanco en visores de Modo Oscuro.
2. **PROHIBIDO CASOS DE USO / ÓVALOS `( ... )`**: Usar únicamente `component`, `rectangle`, `database`, `queue`, `participant`.
3. **PROHIBIDO `skinparam handwritten`**: Prohibida la opción obsoleta handwritten.
4. **CELDAS CONCISAS**: Máximo 10 a 12 palabras por celda para evitar deformación horizontal de tablas.

---

## Entregables
Guarda la respuesta técnica estructurada en `../outputs/output3.md`.
