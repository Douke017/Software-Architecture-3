# Objetivos Específicos: Assignment 5 (Modelo C4 Orientado a MSA & EDA)

1. **Diagramación C4 Nivel 1 (Contexto del Sistema)**:
   - Representar a los 3 usuarios clave (`Cliente`, `Restaurante/Cocina`, `Repartidor`), el sistema central de pedidos de comida y los sistemas externos de pago y notificaciones.
2. **Diagramación C4 Nivel 2 (Contenedores de Microservicios)**:
   - Representar el `API Gateway`, los 6 microservicios autónomos (`Order Service`, `Restaurant Service`, `Delivery Service`, `Notification Service`, `Loyalty Service`, `Analytics Service`), el `Event Bus Kafka` y la topología de datos descentralizada (`Database-per-Service`).
3. **Diagramación C4 Nivel 3 (Componentes de Order Service)**:
   - Representar los componentes internos del `Order Service`: `Order Controller`, `Outbox Publisher Component`, `Order Repository`, `Saga Manager`, `Event Consumer Listener`.
4. **Diagramación de Secuencia del Flujo de Eventos (Coreografía)**:
   - Representar la secuencia de publicación y consumo asíncrono de los 4 eventos centrales (`OrderPlaced`, `OrderAccepted`, `DriverAssigned`, `OrderDelivered`).
5. **Matriz de Servicios y Eventos (Tabla Markdown Concisa)**:
   - Mapear cada evento, emisor, consumidores, protocolo y esquema de datos a alto nivel.
6. **Análisis de Resiliencia y Desacoplamiento**:
   - Explicar la independencia de datos, patrón Outbox y tolerancia a fallos en el bus de eventos.
