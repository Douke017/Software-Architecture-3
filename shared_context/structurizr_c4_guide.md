# Guía Maestra de Diagramación C4 con Structurizr & C4-PlantUML (Master C4 Standard)

Esta guía define el estándar oficial e imperativo para generar **Diagramas del Modelo C4** (Nivel 1: Contexto, Nivel 2: Contenedores, Nivel 3: Componentes) utilizando la librería estándar nativa de **C4-PlantUML** (`!include <C4/...>`), garantizando la identidad visual oficial de Structurizr y el enrutamiento perfecto de todas las flechas y relaciones (`Rel`).

---

## 1. Protocolo Imperativo C4-PlantUML (Zero-Error Rules)

1. **INCLUSIONES OFICIALES DE LA LIBRERÍA ESTÁNDAR C4**:
   - **Nivel 1 (Contexto)**: `!include <C4/C4_Context>`
   - **Nivel 2 (Contenedores)**: `!include <C4/C4_Container>`
   - **Nivel 3 (Componentes)**: `!include <C4/C4_Component>`

2. **NOMBRES DE MACROS OFICIALES EN C4-PLANTUML (NOMBRES ESTRICTOS)**:
   - `Person(alias, "Nombre", "Descripción")`
   - `System(alias, "Nombre", "Descripción")`
   - `System_Ext(alias, "Nombre", "Descripción")`  *(PROHIBIDO usar ExternalSystem)*
   - `Container(alias, "Nombre", "Tecnología", "Descripción")`
   - `ContainerDb(alias, "Nombre", "Tecnología", "Descripción")`
   - `ContainerQueue(alias, "Nombre", "Tecnología", "Descripción")`
   - `Component(alias, "Nombre", "Tecnología", "Descripción")`
   - `Rel(origen, destino, "Etiqueta de Acción", "Protocolo o Tecnología")`

3. **BALANCE EXACTO DE COMILLAS DOBLES EN CADA ARGUMENTO**:
   - Todo texto dentro de una macro DEBE estar estrictamente encerrado entre comillas dobles `"..."`.
   - **INCORRECTO**: `ContainerDb(search_idx, Search Index", "Elasticsearch", "Motor")`
   - **CORRECTO**: `ContainerDb(search_idx, "Search Index", "Elasticsearch", "Motor")`

4. **CIERRE OBLIGATORIO DE `System_Boundary` ANTES DE LAS RELACIONES `Rel` (REGLA DE LAS FLECHAS)**:
   - Declara todos los contenedores dentro del bloque `System_Boundary(c1, "Nombre del Sistema") { ... }`.
   - **DEBES CERRAR EL BLOQUE CON `}` ANTES DE ESCRIBIR LAS RELACIONES `Rel(...)`**.
   - Si colocas las relaciones dentro del `System_Boundary`, el motor de diagramación pierde el cálculo de rutas y no dibuja las flechas entre clientes y contenedores.

5. **TOPOLOGÍA COMPLETA DE FLECHAS Y CONEXIONES (PROHIBIDO CONTENEDORES SIN FLECHAS)**:
   - Todo contenedor en el diagrama DEBE tener sus conexiones explícitas:
     - Flecha del Cliente al API Gateway.
     - Flechas del API Gateway a los BFFs (`web_bff`, `mobile_bff`).
     - Flechas de los BFFs a los microservicios de dominio.
     - Flechas de cada microservicio a su base de datos exclusiva (`ContainerDb`).
     - Flechas de publicación y consumo hacia el bus de eventos (`ContainerQueue`).
     - Flechas hacia los sistemas externos (`System_Ext`).

6. **DECLARACIÓN PREVIA OBLIGATORIA (SIN ALIAS HUÉRFANOS)**:
   - Toda relación `Rel(origen, destino, ...)` DEBE referenciar ÚNICAMENTE aliases que hayan sido declarados previamente arriba en ese mismo diagrama.

7. **REGLA DE UNA SOLA LÍNEA POR MACRO Y PROHIBIDAS LAS COMAS EN TEXTOS**:
   - Cada llamada a macro DEBE estar en una **sola línea continua** (sin saltos de línea `ENTER` dentro de los argumentos).
   - NUNCA uses comas `,` dentro de los textos entre comillas (usa conjunciones `y` o guiones `-`).

---

## 2. Plantilla Maestra Nivel 1: Diagrama de Contexto de Sistema

```plantuml
@startuml
!include <C4/C4_Context>

title Modelo C4 - Nivel 1: Diagrama de Contexto de Sistema (Structurizr C4)

Person(client, "Cliente", "Usuario que realiza compras y consulta productos en la plataforma")

System(system, "Plataforma ShopStream EDA", "Sistema distribuido de comercio electronico orientado a eventos")

System_Ext(payment, "Pasarela de Pagos Externa", "Procesa pagos con tarjeta de credito y debito")
System_Ext(notification, "Servicio Notificaciones Push/SMS", "Envia mensajes y alertas a telefonos moviles")

Rel(client, system, "Navega catalogo y gestiona carrito y realiza pedidos", "HTTPS / Mobile App")
Rel(system, payment, "Autoriza cobros y procesa reembolsos", "REST / HTTPS")
Rel(system, notification, "Envia confirmaciones de compra y tracking", "REST / HTTPS")

@enduml
```

---

## 3. Plantilla Maestra Nivel 2: Diagrama de Contenedores Completo con Todas las Flechas

```plantuml
@startuml
!include <C4/C4_Container>

title Modelo C4 - Nivel 2: Diagrama de Contenedores de Microservicios (Structurizr C4)

Person(client, "Cliente", "Usuario comprador en plataforma web o movil")

System_Boundary(c1, "Plataforma ShopStream EDA") {
    Container(api_gw, "API Gateway", "Kong / Envoy", "Punto unico de entrada con autenticacion y rate limiting")
    
    Container(web_bff, "Web BFF", "Node.js / GraphQL", "Backend para frontend web agrega datos y catalogo")
    Container(mobile_bff, "Mobile BFF", "Java / Spring Boot", "Backend para frontend movil optimiza payloads")
    
    Container(customer_svc, "Customer Service", "Java / Spring Boot", "Gestiona perfiles autenticacion y direcciones")
    ContainerDb(customer_db, "Customer DB", "PostgreSQL", "Almacen relacional de perfiles y usuarios")
    
    Container(catalog_svc, "Catalog Service", "Python / FastAPI", "Administra productos categorias y precios base")
    ContainerDb(catalog_db, "Catalog DB", "MongoDB", "Almacen de documentos de productos")
    
    Container(inventory_svc, "Inventory Service", "Go / Gin", "Controla stock reservas y disponibilidad")
    ContainerDb(inventory_db, "Inventory DB", "PostgreSQL", "Almacen transaccional de inventario")
    
    Container(cart_svc, "Cart Service", "Go / Gin", "Mantiene carrito de compras efimero y calculo de totales")
    ContainerDb(cart_store, "Cart Store", "Redis Cluster", "Almacen en memoria de carritos de compra")
    
    Container(order_svc, "Order Service", "Java / Quarkus", "Orquesta maquina de estados del pedido y Saga")
    ContainerDb(order_db, "Order DB", "PostgreSQL", "Almacen transaccional de pedidos y outbox")
    
    Container(payment_svc, "Payment Service", "Java / Spring Boot", "Orquesta cobros tokenizacion y reembolsos")
    ContainerDb(payment_db, "Payment DB", "PostgreSQL", "Almacen de transacciones financieras y conciliacion")
    
    Container(cms_svc, "CMS Service", "Node.js / Strapi", "Entrega banners promociones y contenido editorial")
    ContainerDb(cms_db, "CMS DB", "PostgreSQL", "Almacen de contenido editorial")
    
    ContainerQueue(event_bus, "Event Bus", "Apache Kafka", "Broker distribuido de eventos inmutables de alta concurrencia")
}

System_Ext(payment_gate, "Pasarela de Pagos Externa", "API REST externa para procesamiento de tarjetas")

' 1. Clientes a API Gateway
Rel(client, api_gw, "Accede a la plataforma", "HTTPS / JSON")

' 2. API Gateway a BFFs
Rel(api_gw, web_bff, "Enruta trafico web", "HTTPS / gRPC")
Rel(api_gw, mobile_bff, "Enruta trafico movil", "HTTPS / gRPC")

' 3. Web BFF a Microservicios
Rel(web_bff, customer_svc, "Consulta perfil de usuario", "gRPC / Sincrono")
Rel(web_bff, catalog_svc, "Consulta productos y categorias", "gRPC / Sincrono")
Rel(web_bff, cms_svc, "Obtiene banners y promociones", "gRPC / Sincrono")
Rel(web_bff, cart_svc, "Gestiona carrito de compras", "gRPC / Sincrono")
Rel(web_bff, order_svc, "Inicia proceso de checkout", "gRPC / Sincrono")

' 4. Mobile BFF a Microservicios
Rel(mobile_bff, customer_svc, "Consulta perfil de usuario", "gRPC / Sincrono")
Rel(mobile_bff, catalog_svc, "Consulta productos y categorias", "gRPC / Sincrono")
Rel(mobile_bff, cart_svc, "Gestiona carrito de compras", "gRPC / Sincrono")
Rel(mobile_bff, order_svc, "Inicia proceso de checkout", "gRPC / Sincrono")

' 5. Microservicios a sus Bases de Datos Exclusivas (Database-per-Service)
Rel(customer_svc, customer_db, "Lee y escribe datos de cliente", "JDBC / SSL")
Rel(catalog_svc, catalog_db, "Lee y escribe catalogo de productos", "Mongo Driver")
Rel(inventory_svc, inventory_db, "Actualiza stock y reservas", "JDBC / SSL")
Rel(cms_svc, cms_db, "Lee y escribe articulos y banners", "JDBC / SSL")
Rel(cart_svc, cart_store, "Almacena y recupera items del carrito", "Redis Protocol")
Rel(order_svc, order_db, "Almacena pedidos y tabla outbox", "JDBC / SSL")
Rel(payment_svc, payment_db, "Registra pagos y conciliaciones", "JDBC / SSL")

' 6. Integracion Externa Sincrona
Rel(payment_svc, payment_gate, "Autoriza cobros con Circuit Breaker", "REST / HTTPS")

' 7. Publicacion y Consumo de Eventos Asincronos (EDA via Kafka)
Rel(order_svc, event_bus, "Publish OrderPlaced", "Kafka Protocol")
Rel(event_bus, payment_svc, "Consume OrderPlaced para cobro", "Kafka Protocol")
Rel(payment_svc, event_bus, "Publish PaymentProcessed", "Kafka Protocol")
Rel(event_bus, order_svc, "Consume PaymentProcessed", "Kafka Protocol")
Rel(event_bus, inventory_svc, "Consume OrderPlaced para reserva de stock", "Kafka Protocol")
Rel(inventory_svc, event_bus, "Publish StockReserved y StockReleased", "Kafka Protocol")

@enduml
```
