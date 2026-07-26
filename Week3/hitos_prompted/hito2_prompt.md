# Context Engineering Prompt - Hito 2: Diseño de Brokers de Mensajes y EDA

## Contexto de Referencia
Asimila las directrices del rol en `../context/role.md` y la descripción del escenario en `../context/problem_description.md`.
La especificación de origen proviene de `../hitos/hito2.md`.

---

## Directivas Arquitectónicas para el Modelo

Propón una **Arquitectura Orientada a Eventos (EDA)** de alto nivel usando brokers de mensajes para **FlashSales Inc.**. Elabora un informe técnico de arquitectura (extensión equivalente a 2-3 páginas).

---

### Ejes de Análisis Requeridos (Estrictos según Hito 2)

#### 1. Identificación del Ecosistema EDA
Identifica explícitamente:
- **Productores de eventos**: Servicios que generan y emiten eventos.
- **Brokers de mensajes**: Componentes de enrutamiento y almacenamiento intermedio.
- **Consumidores**: Servicios que procesan y reaccionan a los eventos.

#### 2. Mapeo de Eventos Clave del Flash Sale
Mapea y describe los 5 eventos clave:
- `user_joined`
- `item_viewed`
- `purchase_attempt`
- `purchase_successful`
- `inventory_updated`

#### 3. Selección y Justificación del Tipo de Cola por Evento
Para cada uno de los 5 eventos clave:
- Selecciona el tipo de cola adecuado: **Punto a Punto (P2P)** o **Publicación/Suscripción (Pub/Sub)**.
- Proporciona una **justificación breve** de cada elección.

#### 4. Investigación Comparativa de Servicios de Brokers de Mensajes
Investiga al menos 4 herramientas (mínimo una Open-Source y al menos una gestionada en la nube, ej: Apache Kafka, Confluent, RabbitMQ, HiveMQ, AWS SQS/SNS, Google Pub/Sub, Azure Service Bus).
Para cada broker indica:
- **Tipo**: Cola, Streaming, Híbrido.
- **Principales capacidades**.
- **Modelo de precios**: Alto nivel (si no está disponible colocar "no está disponible").

#### 5. Modelado Visual en PlantUML (Estricto sin ASCII Art)
Genera **dos diagramas en PlantUML** (` ```plantuml @startuml ... @enduml `):
1. **Diagrama de Arquitectura EDA**: Muestra productores, brokers de mensajes y consumidores.
2. **Diagrama de Secuencia de Compra Asíncrona**: Ilustra el flujo no bloqueante desde el inicio hasta los consumidores.

---

## Entregable
Guarda la respuesta en `../outputs/output2.md`.
