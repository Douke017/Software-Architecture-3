# Guía Maestra de Diagramación C4 con Structurizr & C4-PlantUML (Master C4 Standard)

Esta guía define el estándar oficial e imperativo para generar **Diagramas del Modelo C4** (Nivel 1: Contexto, Nivel 2: Contenedores, Nivel 3: Componentes) utilizando la librería estándar nativa de **C4-PlantUML** (`!include <C4/...>`), garantizando la identidad visual oficial de Structurizr (tarjetas azules `«person»`, `«system»`, `«container»`, doradas `«queue»`, púrpuras `«database»` y grises `«external_system»`).

---

## 1. Reglas Sintácticas Críticas de Macros C4-PlantUML (Zero-Error Protocol)

1. **INCLUSIONES OFICIALES DE LA LIBRERÍA ESTÁNDAR C4**:
   - **Nivel 1 (Contexto)**: `!include <C4/C4_Context>`
   - **Nivel 2 (Contenedores)**: `!include <C4/C4_Container>`
   - **Nivel 3 (Componentes)**: `!include <C4/C4_Component>`
   *(Nota: `plantuml.jar` incluye estas librerías de forma nativa e integrada sin requerir conexión a internet).*

2. **REGLA DE ORO: PROHIBIDAS LAS COMAS ',' DENTRO DE ARGUMENTOS DE TEXTO**:
   - El preprocesador de macros de PlantUML divide los parámetros de las macros en cada coma `,`, incluso si está dentro de comillas dobles `"..."`.
   - **INCORRECTO (Rompe el preprocesador C4)**: `Person(cliente, "Cliente", "Realiza pedidos, paga y recibe alertas")`
   - **CORRECTO (Usa conjunciones o guiones)**: `Person(cliente, "Cliente", "Realiza pedidos y paga y recibe alertas")`

3. **ESTRUCTURA DE PARÁMETROS EN MACROS C4**:
   - `Person(alias, "Nombre", "Descripción")`
   - `System(alias, "Nombre", "Descripción")`
   - `System_Ext(alias, "Nombre", "Descripción")`
   - `Container(alias, "Nombre", "Tecnología", "Descripción")`
   - `ContainerDb(alias, "Nombre", "Tecnología", "Descripción")`
   - `ContainerQueue(alias, "Nombre", "Tecnología", "Descripción")`
   - `Component(alias, "Nombre", "Tecnología", "Descripción")`
   - `Rel(origen, destino, "Etiqueta de Acción", "Protocolo o Tecnología")`

4. **LÍMITES DE SISTEMA Y CONTENEDOR**:
   - Para agrupar servicios en Nivel 2: `System_Boundary(c1, "Ecosistema PedidosYa EDA") { ... }`
   - Para agrupar componentes en Nivel 3: `Container_Boundary(c2, "Order Service") { ... }`

---

## 2. Plantilla Maestra Nivel 1: Diagrama de Contexto de Sistema

```plantuml
@startuml
!include <C4/C4_Context>

title Modelo C4 - Nivel 1: Diagrama de Contexto de Sistema (PedidosYa EDA)

Person(client, "Cliente", "Usuario que realiza pedidos de comida y recibe alertas de demanda")
Person(restaurant, "Restaurante / Cocina", "Personal que acepta y prepara pedidos y gestiona capacidad")
Person(driver, "Repartidor / Conductor", "Repartidor que transporta la comida y actualiza disponibilidad")

System(system, "Plataforma PedidosYa EDA", "Sistema distribuido orientado a eventos con gestion de contrapresion")

System_Ext(payment, "Pasarela de Pagos", "Procesa pagos con tarjeta de credito o debito")
System_Ext(notification, "Servicio Notificaciones Push/SMS", "Envia mensajes y alertas a telefonos moviles")

Rel(client, system, "Realiza pedidos y consulta estado con feedback de demanda", "HTTPS / Mobile App")
Rel(restaurant, system, "Acepta pedidos y notifica preparacion con indicador de carga", "HTTPS / Tablet App")
Rel(driver, system, "Recibe asignacion de entregas y actualiza GPS con impacto de demanda", "HTTPS / Driver App")

Rel(system, payment, "Autoriza cobros y procesa reembolsos", "REST / HTTPS")
Rel(system, notification, "Envia SMS o Push incluyendo alertas de contrapresion", "REST / HTTPS")

@enduml
```

---

## 3. Plantilla Maestra Nivel 2: Diagrama de Contenedores y Bases de Datos (MSA & EDA)

```plantuml
@startuml
!include <C4/C4_Container>

title Modelo C4 - Nivel 2: Diagrama de Contenedores de Microservicios (Structurizr C4)

Person(client, "Cliente", "Usuario de la aplicacion movil")
Person(restaurant, "Restaurante", "Personal de cocina")
Person(driver, "Repartidor", "Conductor de entregas")

System_Boundary(c1, "Ecosistema PedidosYa EDA") {
    Container(api_gw, "API Gateway / BFF", "Kong / Envoy", "Punto unico de entrada con autenticacion y rate limiting")
    
    Container(order_svc, "Order Service", "Java / Spring Boot", "Orquesta ciclo de vida del pedido y transacciones")
    ContainerDb(order_db, "Order DB", "PostgreSQL", "Almacen transaccional ACID de pedidos y outbox")
    
    Container(rest_svc, "Restaurant Service", "Node.js / Express", "Gestiona aceptacion y tiempos de preparacion")
    ContainerDb(rest_db, "Restaurant DB", "MongoDB", "Almacen de catalogos y pedidos de cocina")
    
    Container(deliv_svc, "Delivery Service", "Go / Gin", "Asignacion de conductores y tracking de rutas")
    ContainerDb(deliv_db, "Delivery DB", "PostgreSQL + PostGIS", "Almacen geoespacial de conductores")
    
    Container(notif_svc, "Notification Service", "Python / FastAPI", "Despacho multicanal de emails SMS y push")
    
    Container(loyalty_svc, "Loyalty Service", "Java / Quarkus", "Gestion de puntos y recompensas")
    ContainerDb(loyalty_db, "Loyalty DB", "PostgreSQL", "Balance de puntos y transacciones")
    
    Container(analytics_svc, "Analytics Service", "Python / Apache Flink", "Procesamiento de eventos analiticos")
    ContainerDb(analytics_dw, "Analytics DW", "ClickHouse", "Data Warehouse en tiempo real")
    
    ContainerQueue(event_bus, "Event Bus", "Apache Kafka", "Broker distribuido de eventos inmutables de alta concurrencia")
}

System_Ext(payment_gate, "Pasarela de Pagos Externa", "API REST externa para procesamiento de tarjetas")

' Relaciones de Clientes al Gateway
Rel(client, api_gw, "Realiza pedidos y consulta estado", "HTTPS / JSON")
Rel(restaurant, api_gw, "Acepta pedidos y actualiza cocina", "HTTPS / WebSockets")
Rel(driver, api_gw, "Actualiza posicion GPS y estado de entrega", "gRPC / HTTPS")

' Gateway a Microservicios
Rel(api_gw, order_svc, "Enruta checkout y creacion de pedidos", "gRPC / Sincrono")
Rel(api_gw, rest_svc, "Consulta estado de restaurantes", "REST / Sincrono")
Rel(api_gw, deliv_svc, "Consulta tracking de repartidor", "REST / Sincrono")

' Microservicios y sus Bases de Datos Exclusivas (Database-per-Service)
Rel(order_svc, order_db, "Lee y escribe estado de pedidos", "JDBC / SSL")
Rel(rest_svc, rest_db, "Lee y escribe tickets de cocina", "Mongo Driver")
Rel(deliv_svc, deliv_db, "Consultas geoespaciales de conductores", "PostGIS Driver")
Rel(loyalty_svc, loyalty_db, "Actualiza balance de puntos", "JDBC / SSL")
Rel(analytics_svc, analytics_dw, "Inserta registros de eventos", "ClickHouse Client")

' Integracion Externa Sincrona Protegida
Rel(order_svc, payment_gate, "Autoriza cobros con Circuit Breaker", "REST / HTTPS")

' Publicacion y Consumo de Eventos Asincronos (EDA)
Rel(order_svc, event_bus, "Publish OrderPlaced", "Kafka Protocol")
Rel(event_bus, rest_svc, "Consume OrderPlaced", "Kafka Protocol")
Rel(rest_svc, event_bus, "Publish OrderAccepted", "Kafka Protocol")
Rel(event_bus, deliv_svc, "Consume OrderAccepted", "Kafka Protocol")
Rel(deliv_svc, event_bus, "Publish DriverAssigned y OrderDelivered", "Kafka Protocol")
Rel(event_bus, notif_svc, "Consume todos los eventos del pedido", "Kafka Protocol")
Rel(event_bus, loyalty_svc, "Consume OrderPlaced y OrderDelivered", "Kafka Protocol")
Rel(event_bus, analytics_svc, "Consume stream de eventos de negocio", "Kafka Protocol")

@enduml
```

---

## 4. Plantilla Maestra Nivel 3: Diagrama de Componentes del Order Service

```plantuml
@startuml
!include <C4/C4_Component>

title Modelo C4 - Nivel 3: Diagrama de Componentes de Order Service (Structurizr C4)

Container_Boundary(c1, "Order Service") {
    Component(order_ctrl, "Order REST Controller", "Spring REST Controller", "Expone endpoints HTTP para creacion y consulta de pedidos")
    Component(order_mgr, "Order Management Service", "Spring Service Bean", "Implementa reglas de negocio y maquina de estados de pedidos")
    Component(outbox_pub, "Outbox Event Publisher", "Transactional Outbox Component", "Persiste eventos en tabla outbox dentro de la transaccion local")
    Component(order_repo, "Order Repository", "Spring Data JPA", "Gestiona la persistencia de entidades de pedido en PostgreSQL")
    Component(event_listener, "Order Event Listener", "Kafka Consumer Listener", "Escucha eventos compensatorios o confirmaciones de pago")
}

ContainerDb(order_db, "Order DB", "PostgreSQL", "Almacena tablas de orders y outbox_events")
ContainerQueue(event_bus, "Event Bus", "Apache Kafka", "Broker distribuido de eventos")
Component_Ext(debezium, "Debezium CDC Connector", "Kafka Connect", "Lee el WAL de PostgreSQL y publica en Kafka")

Rel(order_ctrl, order_mgr, "Invoca operaciones de pedido", "Metodo Java")
Rel(order_mgr, order_repo, "Persiste agregado de pedido", "Metodo Java")
Rel(order_mgr, outbox_pub, "Registra evento de negocio", "Metodo Java")
Rel(order_repo, order_db, "Escribe en tabla orders", "SQL / ACID")
Rel(outbox_pub, order_db, "Escribe en tabla outbox_events", "SQL / ACID")

Rel(debezium, order_db, "Lee cambios en WAL de outbox_events", "PostgreSQL CDC")
Rel(debezium, event_bus, "Publica eventos en topic order-events", "Kafka Protocol")

Rel(event_bus, event_listener, "Consume eventos de pago o cancelacion", "Kafka Protocol")
Rel(event_listener, order_mgr, "Dispara transicion de estado", "Metodo Java")

@enduml
```
