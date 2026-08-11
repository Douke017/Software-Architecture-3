Como Principal Software & Enterprise Architect, presento el análisis y diseño arquitectónico para la plataforma de pedidos de comida orientada a eventos, siguiendo los principios de Domain-Driven Design (DDD) y Arquitecturas Guiadas por Eventos (EDA) para lograr un sistema altamente escalable, resiliente y débilmente acoplado.

---

# Informe Arquitectónico: Plataforma de Delivery Orientada a Eventos (PedidosYa)

## 1. Análisis de la Arquitectura Orientada a Eventos (EDA) y Ciclo de Vida del Pedido

La adopción de una Arquitectura Orientada a Eventos (EDA) es fundamental para una plataforma de delivery como PedidosYa, permitiendo un **desacoplamiento asíncrono** entre microservicios. Este enfoque elimina las dependencias síncronas directas, lo que se traduce en:

*   **Mayor Resiliencia**: Los servicios pueden fallar y recuperarse de forma independiente sin afectar a otros. Los eventos pueden ser reintentados o procesados por Dead Letter Queues (DLQ).
*   **Escalabilidad Horizontal**: Cada microservicio puede escalar de forma autónoma según su carga, y el bus de eventos (ej. Apache Kafka) puede manejar grandes volúmenes de mensajes.
*   **Flexibilidad y Agilidad**: Facilita la evolución del sistema, permitiendo añadir o modificar funcionalidades sin impactar a los servicios existentes.
*   **Consistencia Eventual**: Aunque no hay transacciones ACID distribuidas, la consistencia se logra a lo largo del tiempo mediante el procesamiento de eventos y patrones como Saga.
*   **Observabilidad Mejorada**: Los flujos de eventos proporcionan un rastro auditable de lo que ha ocurrido en el sistema.

El ciclo de vida del pedido se orquesta a través de la publicación y consumo de eventos inmutables en un **Bus de Eventos Centralizado (Apache Kafka)**, garantizando que cada microservicio reaccione a los cambios de estado relevantes para su dominio. Para asegurar la publicación confiable de eventos, se implementa el **Patrón Outbox** en cada microservicio, garantizando la atomicidad entre la escritura en la base de datos local y la publicación del evento.

A continuación, se detalla el ciclo de vida de los eventos clave:

### 1.1. Evento `OrderPlaced`
-   **Publicador**: **Servicio de Pedidos (Order Service)**.
-   **Descripción**: Se publica después de que un cliente ha confirmado un pedido y el pago ha sido procesado exitosamente. Representa el inicio oficial del ciclo de vida del pedido en el sistema.
-   **Consumidores y Reacciones**:
    -   **Servicio de Restaurante (Restaurant Service)**: Recibe el evento para mostrar el pedido en la pantalla de la cocina y permitir que el personal lo acepte o rechace.
    -   **Servicio de Notificaciones (Notification Service)**: Envía una notificación (Email/SMS/Push) al cliente confirmando la recepción del pedido.
    -   **Servicio de Fidelización (Loyalty Service)**: Si el cliente utilizó puntos o un cupón, este servicio bloquea temporalmente esos puntos/cupones hasta la entrega final.

### 1.2. Evento `OrderAccepted`
-   **Publicador**: **Servicio de Restaurante (Restaurant Service)**.
-   **Descripción**: Se publica cuando el personal del restaurante ha revisado y aceptado el pedido, indicando que la preparación ha comenzado o está a punto de comenzar.
-   **Consumidores y Reacciones**:
    -   **Servicio de Entrega (Delivery Service)**: Inicia el proceso de búsqueda y asignación de un repartidor disponible para el pedido.
    -   **Servicio de Notificaciones (Notification Service)**: Actualiza al cliente sobre el estado del pedido, informando que "Su comida está en preparación".

### 1.3. Evento `DriverAssigned`
-   **Publicador**: **Servicio de Entrega (Delivery Service)**.
-   **Descripción**: Se publica una vez que el Servicio de Entrega ha encontrado y asignado exitosamente un repartidor al pedido.
-   **Consumidores y Reacciones**:
    -   **Servicio de Notificaciones (Notification Service)**: Envía una notificación al cliente con los datos del conductor asignado y un enlace para el seguimiento GPS en tiempo real.

### 1.4. Evento `OrderDelivered`
-   **Publicador**: **Servicio de Entrega (Delivery Service)**.
-   **Descripción**: Se publica cuando el repartidor ha completado exitosamente la entrega del pedido al cliente.
-   **Consumidores y Reacciones**:
    -   **Servicio de Fidelización (Loyalty Service)**: Acredita permanentemente los puntos de fidelidad ganados por el cliente con este pedido y libera cualquier bloqueo temporal de puntos/cupones.
    -   **Servicio de Analítica (Analytics Service)**: Ingesta el evento para actualizar métricas de negocio en tiempo real, como el tiempo promedio de entrega, volumen de pedidos por restaurante, etc.

---

## 2. Modelo C4 Completo (Structurizr & C4-PlantUML Standards)

A continuación, se presentan los diagramas del Modelo C4, detallando la arquitectura de la plataforma de delivery en sus tres niveles de abstracción.

### 2.1. Modelo C4 - Nivel 1: Diagrama de Contexto de Sistema (System Context Diagram)

Este diagrama muestra el sistema "Plataforma PedidosYa EDA" en su entorno, interactuando con sus usuarios principales y sistemas externos.

```plantuml
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml

title Modelo C4 - Nivel 1: Diagrama de Contexto de Sistema (PedidosYa EDA)

Person(cliente, "Cliente", "Usuario que realiza pedidos de comida a través de la aplicación móvil o web.")
Person(restaurante, "Restaurante / Cocina", "Personal del restaurante que gestiona la aceptación y preparación de pedidos.")
Person(driver, "Repartidor / Conductor", "Repartidor que transporta la comida desde el restaurante al cliente.")

System(pedidosYaSystem, "Plataforma PedidosYa EDA", "Sistema distribuido orientado a eventos para la gestión integral de pedidos y entregas de comida.")

System_Ext(paymentGateway, "Pasarela de Pagos", "Sistema externo que procesa pagos con tarjeta de crédito/débito y otros métodos de pago.")
System_Ext(notificationGateway, "Servicio de Notificaciones Push/SMS", "Sistema externo que envía mensajes push a dispositivos móviles y SMS.")

Rel(cliente, pedidosYaSystem, "Realiza pedidos y consulta estado", "HTTPS/Mobile App/Web")
Rel(restaurante, pedidosYaSystem, "Acepta pedidos y notifica preparación", "HTTPS/Tablet App")
Rel(driver, pedidosYaSystem, "Recibe asignación de entregas y actualiza GPS", "HTTPS/Driver App")

Rel(pedidosYaSystem, paymentGateway, "Autoriza y procesa pagos", "REST/HTTPS")
Rel(pedidosYaSystem, notificationGateway, "Envía SMS/Push", "REST/HTTPS")

@enduml
```

### 2.2. Modelo C4 - Nivel 2: Diagrama de Contenedores (Container Diagram)

Este diagrama descompone la "Plataforma PedidosYa EDA" en sus principales contenedores (microservicios, aplicaciones, bases de datos, bus de eventos) y muestra cómo interactúan.

```plantuml
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

title Modelo C4 - Nivel 2: Diagrama de Contenedores (Arquitectura EDA)

Person(cliente, "Cliente", "Usuario de la aplicación")
Person(restaurante, "Restaurante", "Personal de cocina")
Person(driver, "Repartidor", "Conductor de entregas")

System_Boundary(pedidosYa, "Ecosistema PedidosYa") {
    Container(mobileApp, "App Móvil / Web", "React Native / Next.js", "Interfaz de usuario para realizar pedidos y rastrear entregas.")
    Container(apiGateway, "API Gateway", "Kong / Envoy", "Punto de entrada unificado, autenticación (JWT/OAuth2), rate limiting y enrutamiento.")
    
    Container(orderSvc, "Servicio de Pedidos", "Node.js / Go", "Gestiona la creación, validación y ciclo de vida inicial del pedido. Publica OrderPlaced.")
    Container(restaurantSvc, "Servicio de Restaurante", "Java Spring Boot", "Gestiona la visualización y aceptación de pedidos por parte de los restaurantes. Publica OrderAccepted.")
    Container(deliverySvc, "Servicio de Entrega", "Go", "Asigna repartidores, rastrea geolocalización y gestiona el ciclo de entrega. Publica DriverAssigned, OrderDelivered.")
    Container(loyaltySvc, "Servicio de Fidelización", "Python / FastAPI", "Administra puntos, recompensas y cupones de los clientes.")
    Container(notificationSvc, "Servicio de Notificaciones", "Node.js", "Envía alertas Push/SMS/Email a clientes, restaurantes y repartidores.")
    Container(analyticsSvc, "Servicio de Analítica", "Python / Spark", "Ingesta eventos para generar reportes de negocio y métricas en tiempo real.")
    
    ContainerQueue(eventBus, "Bus de Eventos Central", "Apache Kafka", "Broker de eventos distribuido para comunicación asíncrona entre microservicios.")
    
    ContainerDb(orderDb, "Order DB", "PostgreSQL", "Almacena el estado persistente de los pedidos (Database-per-Service).")
    ContainerDb(restaurantDb, "Restaurant DB", "PostgreSQL", "Almacena información de restaurantes y menús.")
    ContainerDb(deliveryDb, "Delivery DB", "MongoDB", "Almacena rutas, ubicaciones GPS y estado de entregas.")
    ContainerDb(loyaltyDb, "Loyalty DB", "Cassandra", "Almacena puntos y recompensas de clientes.")
}

System_Ext(paymentGateway, "Pasarela de Pagos", "Procesa pagos con tarjeta de crédito/débito")
System_Ext(notificationGateway, "Servicio de Notificaciones Push/SMS", "Envía mensajes a móviles")

Rel(cliente, mobileApp, "Usa", "HTTPS")
Rel(mobileApp, apiGateway, "Envía solicitudes", "HTTPS/REST")
Rel(apiGateway, orderSvc, "Enruta solicitudes de pedido", "gRPC/REST")
Rel(orderSvc, paymentGateway, "Autoriza pagos", "REST/HTTPS")

Rel(orderSvc, orderDb, "Persiste estado del pedido", "JDBC/SQL")
Rel(orderSvc, eventBus, "Publica OrderPlaced", "Kafka Protocol")

Rel(eventBus, restaurantSvc, "Consume OrderPlaced", "Kafka Protocol")
Rel(restaurantSvc, restaurantDb, "Persiste estado de restaurante", "JDBC/SQL")
Rel(restaurantSvc, eventBus, "Publica OrderAccepted", "Kafka Protocol")

Rel(eventBus, deliverySvc, "Consume OrderAccepted", "Kafka Protocol")
Rel(deliverySvc, deliveryDb, "Persiste rutas y ubicaciones", "MongoDB Wire Protocol")
Rel(deliverySvc, eventBus, "Publica DriverAssigned, OrderDelivered", "Kafka Protocol")

Rel(eventBus, loyaltySvc, "Consume OrderPlaced, OrderDelivered", "Kafka Protocol")
Rel(loyaltySvc, loyaltyDb, "Persiste puntos y recompensas", "CQL")

Rel(eventBus, notificationSvc, "Consume OrderPlaced, OrderAccepted, DriverAssigned", "Kafka Protocol")
Rel(notificationSvc, notificationGateway, "Envía notificaciones", "REST/HTTPS")

Rel(eventBus, analyticsSvc, "Consume OrderDelivered", "Kafka Protocol")

@enduml
```

### 2.3. Modelo C4 - Nivel 3: Diagrama de Componentes Internos del Servicio de Pedidos (Component Diagram)

Este diagrama detalla la estructura interna del **Servicio de Pedidos (Order Service)**, mostrando sus componentes clave y cómo interactúan para procesar la creación de un pedido y publicar el evento `OrderPlaced`.

```plantuml
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Component.puml

title Modelo C4 - Nivel 3: Diagrama de Componentes Internos (Servicio de Pedidos / Order Service)

ContainerQueue(eventBus, "Bus de Eventos", "Apache Kafka", "Broker distribuido para eventos de negocio")
ContainerDb(orderDb, "Order DB", "PostgreSQL", "Base de datos transaccional para el estado de pedidos")
Container(apiGateway, "API Gateway", "Envoy", "Gateway de entrada para solicitudes externas")
System_Ext(paymentGateway, "Pasarela de Pagos", "Sistema externo de procesamiento de pagos")

Container_Boundary(orderSvcBoundary, "Servicio de Pedidos (Order Service)") {
    Component(orderController, "Order Controller", "REST / gRPC Controller", "Recibe y valida solicitudes HTTP/gRPC de creación de pedidos.")
    Component(orderManager, "Order Domain Service", "Domain Logic", "Contiene la lógica de negocio para la creación, validación y gestión del ciclo de vida del pedido.")
    Component(paymentAdapter, "Payment Adapter", "External Service Client", "Adapta las llamadas al Payment Gateway para autorizar y procesar pagos.")
    Component(eventPublisher, "Event Publisher Component", "Kafka Producer / Outbox", "Garantiza la publicación confiable del evento OrderPlaced al bus de eventos.")
    Component(orderRepository, "Order Repository", "Spring Data JPA / ORM", "Gestiona la persistencia transaccional del estado del pedido en la base de datos.")
}

Rel(apiGateway, orderController, "HTTP POST /orders", "JSON/gRPC")
Rel(orderController, orderManager, "Invoca lógica de creación de pedido", "In-Process Call")
Rel(orderManager, paymentAdapter, "Solicita autorización de pago", "In-Process Call")
Rel(paymentAdapter, paymentGateway, "Autoriza/Procesa pago", "REST/HTTPS")
Rel(orderManager, orderRepository, "Guarda estado del pedido (PENDING)", "Java Method Call")
Rel(orderRepository, orderDb, "INSERT / UPDATE", "JDBC/SQL")
Rel(orderManager, eventPublisher, "Dispara evento OrderPlaced", "In-Process Call")
Rel(eventPublisher, eventBus, "Publica evento OrderPlaced", "Kafka TCP")

@enduml
```