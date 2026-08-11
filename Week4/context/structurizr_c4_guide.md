# Guía Estándar de Diagramación C4 con Structurizr y PlantUML (C4 Model Standard)

Esta guía define la especificación para generar **Diagramas del Modelo C4** (Nivel 1: Contexto, Nivel 2: Contenedores, Nivel 3: Componentes) utilizando la sintaxis estándar de **PlantUML C4-Stdlib** y **Structurizr DSL**.

---

## 1. Niveles del Modelo C4 (C4 Architecture Model)

El Modelo C4 consta de 4 niveles de abstracción. Para Assignment 3 se requieren los primeros 3 niveles:

1. **Nivel 1: Diagrama de Contexto de Sistema (System Context)**:
   - Muestra el sistema en su entorno, los usuarios finales (*Person*) y los sistemas externos interconectados (*System_Ext*).
2. **Nivel 2: Diagrama de Contenedores (Container Diagram)**:
   - Muestra los bloques ejecutables del sistema (Aplicación Móvil, API Gateway, Microservicios, Bus de Eventos/Broker, Bases de Datos).
3. **Nivel 3: Diagrama de Componentes (Component Diagram)**:
   - Modela la estructura interna de un microservicio crítico (ej. *Servicio de Pedidos / Order Service*), detallando sus controladores, manejadores de eventos, procesadores y adaptadores de persistencia.

---

## 2. Sintaxis Estándar C4 en PlantUML (C4-PlantUML Macros)

### A. Nivel 1: Diagrama de Contexto (`C4_Context.puml`)
```plantuml
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml

title Modelo C4 - Nivel 1: Diagrama de Contexto de Sistema (PedidosYa EDA)

Person(cliente, "Cliente", "Usuario que realiza pedidos de comida")
Person(restaurante, "Restaurante / Cocina", "Personal del restaurante que acepta y prepara pedidos")
Person(driver, "Repartidor / Conductor", "Repartidor que transporta la comida")

System(pedidosYaSystem, "Plataforma PedidosYa EDA", "Sistema distribuido orientado a eventos para gestión de pedidos y entregas")

System_Ext(paymentGateway, "Pasarela de Pagos", "Procesa pagos con tarjeta de crédito/débito")
System_Ext(notificationGateway, "Servicio de Notificaciones Push/SMS", "Envía mensajes a móviles")

Rel(cliente, pedidosYaSystem, "Realiza pedidos y consulta estado", "HTTPS/Mobile App")
Rel(restaurante, pedidosYaSystem, "Acepta pedidos y notifica preparación", "HTTPS/Tablet App")
Rel(driver, pedidosYaSystem, "Recibe asignación de entregas y actualiza GPS", "HTTPS/Driver App")

Rel(pedidosYaSystem, paymentGateway, "Autoriza pagos", "REST/HTTPS")
Rel(pedidosYaSystem, notificationGateway, "Envía SMS/Push", "REST/HTTPS")

@enduml
```

### B. Nivel 2: Diagrama de Contenedores (`C4_Container.puml`)
```plantuml
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

title Modelo C4 - Nivel 2: Diagrama de Contenedores (Arquitectura EDA)

Person(cliente, "Cliente", "Usuario de la aplicación")
Person(restaurante, "Restaurante", "Personal de cocina")
Person(driver, "Repartidor", "Conductor de entregas")

System_Boundary(pedidosYa, "Ecosistema PedidosYa") {
    Container(mobileApp, "App Móvil / Web", "React Native / Next.js", "Interfaz de usuario para pedidos y rastreo")
    Container(apiGateway, "API Gateway", "Kong / Envoy", "Punto de entrada unificado, autenticación y rate limiting")
    
    Container(orderSvc, "Servicio de Pedidos", "Node.js / Go", "Gestiona la creación y ciclo de vida del pedido")
    Container(restaurantSvc, "Servicio de Restaurante", "Java Spring Boot", "Orquesta la aceptación y preparación en cocina")
    Container(deliverySvc, "Servicio de Entrega", "Go", "Asigna repartidores y rastrea geolocalización")
    Container(loyaltySvc, "Servicio de Fidelización", "Python / FastAPI", "Administra puntos y recompensas")
    Container(notificationSvc, "Servicio de Notificaciones", "Node.js", "Envía alertas Push/SMS al cliente")
    Container(analyticsSvc, "Servicio de Analítica", "Python / Spark", "Genera reportes de negocio en tiempo real")
    
    ContainerQueue(eventBus, "Bus de Eventos Central", "Apache Kafka", "Broker de eventos inmutables (OrderPlaced, OrderAccepted, DriverAssigned, OrderDelivered)")
    
    ContainerDb(orderDb, "Order DB", "PostgreSQL", "Almacena el estado persistente de pedidos")
    ContainerDb(deliveryDb, "Delivery DB", "MongoDB", "Almacena rutas y ubicaciones GPS")
}

Rel(cliente, mobileApp, "Usa", "HTTPS")
Rel(mobileApp, apiGateway, "Envía solicitudes", "HTTPS/REST")
Rel(apiGateway, orderSvc, "Enruta pedidos", "gRPC/REST")

Rel(orderSvc, orderDb, "Persiste estado", "SQL")
Rel(orderSvc, eventBus, "Publica OrderPlaced", "Kafka Protocol")

Rel(eventBus, restaurantSvc, "Consume OrderPlaced", "Kafka Protocol")
Rel(eventBus, notificationSvc, "Consume OrderPlaced, OrderAccepted, DriverAssigned", "Kafka Protocol")
Rel(eventBus, loyaltySvc, "Consume OrderPlaced, OrderDelivered", "Kafka Protocol")

Rel(restaurantSvc, eventBus, "Publica OrderAccepted", "Kafka Protocol")
Rel(eventBus, deliverySvc, "Consume OrderAccepted", "Kafka Protocol")

Rel(deliverySvc, deliveryDb, "Persiste rutas", "MongoDB Wire")
Rel(deliverySvc, eventBus, "Publica DriverAssigned, OrderDelivered", "Kafka Protocol")
Rel(eventBus, analyticsSvc, "Consume OrderDelivered", "Kafka Protocol")

@enduml
```

### C. Nivel 3: Diagrama de Componentes del Servicio Crítico (`C4_Component.puml`)
```plantuml
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Component.puml

title Modelo C4 - Nivel 3: Diagrama de Componentes Internos (Servicio de Pedidos / Order Service)

ContainerQueue(eventBus, "Bus de Eventos", "Apache Kafka", "Broker distribuido")
ContainerDb(orderDb, "Order DB", "PostgreSQL", "Base de datos transaccional")
Container(apiGateway, "API Gateway", "Envoy", "Gateway de entrada")

Container_Boundary(orderSvcBoundary, "Servicio de Pedidos (Order Service)") {
    Component(orderController, "Order Controller", "REST / gRPC Controller", "Recibe y valida solicitudes HTTP/gRPC de pedidos")
    Component(orderManager, "Order Domain Service", "Domain Logic", "Aplica reglas de negocio de creación de pedidos")
    Component(eventPublisher, "Event Publisher Component", "Kafka Producer / Outbox", "Publica evento inmutable OrderPlaced al bus")
    Component(orderRepository, "Order Repository", "Spring Data JPA / ORM", "Gestiona la persistencia transaccional")
}

Rel(apiGateway, orderController, "HTTP POST /orders", "JSON/gRPC")
Rel(orderController, orderManager, "Invoca lógica de creación", "In-Process")
Rel(orderManager, orderRepository, "Guarda estado del pedido (PENDING)", "Java Method")
Rel(orderRepository, orderDb, "INSERT / UPDATE", "JDBC/SQL")
Rel(orderManager, eventPublisher, "Dispara evento OrderPlaced", "In-Process")
Rel(eventPublisher, eventBus, "Publica evento OrderPlaced", "Kafka TCP")

@enduml
```

---

## 3. Reglas de Sintaxis Anti-Errores para Diagramas C4

1. **Inclusión de Librerías Obligatorias**:
   - Nivel 1: `!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml`
   - Nivel 2: `!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml`
   - Nivel 3: `!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Component.puml`
2. **Sintaxis de Relaciones**: `Rel(desde, hasta, "Descripción", "Tecnología/Protocolo")` (sin espacios dentro del identificador de alias).
3. **Identificadores Limpios**: Alias simples sin espacios (ej. `orderSvc`, `eventBus`, `orderDb`).
