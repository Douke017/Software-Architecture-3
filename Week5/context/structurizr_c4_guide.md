# Guía Estándar de Diagramación C4 con Structurizr y PlantUML (C4 Model Native Standard - Strict Anti-Error)

Esta guía define la especificación para generar **Diagramas del Modelo C4** (Nivel 1: Contexto, Nivel 2: Contenedores, Nivel 3: Componentes) utilizando la sintaxis nativa de **PlantUML** sin dependencias externas `!include`.

---

## 1. Reglas de Diagramación Nativa C4 (100% Parseable y Libre de Errores)

1. **PROHIBIDO USAR `!include` EXTERNOS O REMOTOS**:
   - NUNCA incluyas `!include <C4/...>` ni `!include https://...`.
   - Usa la sintaxis nativa de componentes de PlantUML (`skinparam componentStyle uml2`), que compila en 100% de las herramientas locales y remotas sin fallos de inclusión.

2. **MODELADO C4 CON ELEMENTOS NATIVOS**:
   - **Personas / Usuarios**: `rectangle "Nombre del Usuario\n<<Person>>" as UserAlias`
   - **Sistemas Externos**: `component "Nombre del Sistema Extero\n<<ExternalSystem>>" as ExtSysAlias`
   - **Contenedores de Aplicación**: `component "Nombre del Contenedor\n<<Container>>" as ContainerAlias`
   - **Buses de Eventos / Colas**: `queue "Message Broker (Kafka)\n<<EventBus>>" as EventBusAlias`
   - **Bases de Datos**: `database "Order DB (PostgreSQL)\n<<Database>>" as DBAlias`
   - **Límites de Sistema**: `package "Ecosistema PedidosYa" #FFFBEB { ... }`

3. **RELACIONES Y ETIQUETAS SIN COMAS NI SÍMBOLOS ESPECIALES**:
   - NUNCA uses comas `,`, comillas anidadas, paréntesis ni corchetes `<< >>` dentro del string de la etiqueta de la flecha:
     - **INCORRECTO**: `A --> B : "Relacion, <<Protocolo>>"`
     - **CORRECTO**: `A --> B : "Enruta solicitud via gRPC"`

---

## 2. Ejemplo Parseable Nivel 1: Diagrama de Contexto Nativo

```plantuml
@startuml
skinparam componentStyle uml2
skinparam packageStyle rectangle
skinparam backgroundColor white

title Modelo C4 - Nivel 1: Diagrama de Contexto de Sistema (PedidosYa EDA)

rectangle "Cliente Mobile App\n<<Person>>" as User #E0F2FE
rectangle "Restaurante Cocina\n<<Person>>" as Rest #E0F2FE

package "Plataforma PedidosYa" #F0FDF4 {
    component "Sistema Principal PedidosYa EDA\n<<SoftwareSystem>>" as PedidosYaSystem #DCFCE7
}

component "Pasarela de Pagos Externa\n<<ExternalSystem>>" as PaymentGate #FFEDD5
component "Servicio Notificaciones Push\n<<ExternalSystem>>" as NotifGate #FFEDD5

User --> PedidosYaSystem : "Realiza pedidos y consulta estado via HTTPS"
Rest --> PedidosYaSystem : "Acepta pedidos y notifica preparacion"
PedidosYaSystem --> PaymentGate : "Autoriza cobros via REST"
PedidosYaSystem --> NotifGate : "Envia alertas Push y SMS"

@enduml
```

---

## 3. Ejemplo Parseable Nivel 2: Diagrama de Contenedores con Contrapresión

```plantuml
@startuml
skinparam componentStyle uml2
skinparam packageStyle rectangle
skinparam backgroundColor white

title Modelo C4 - Nivel 2: Diagrama de Contenedores con Contrapresion

rectangle "Cliente Mobile App\n<<Person>>" as User #E0F2FE

package "Ecosistema PedidosYa" #FFFBEB {
    component "API Gateway\n<<Container>>" as APIGW #DCFCE7
    component "Backpressure Controller\n<<Container>>" as BPSvc #FED7AA
    component "Order Service\n<<Container>>" as OrderSvc #DBEAFE
    component "Restaurant Service\n<<Container>>" as RestSvc #DBEAFE
    queue "Event Bus Kafka\n<<ContainerQueue>>" as EventBus #FDE68A
    database "Order DB\n<<ContainerDb>>" as OrderDB #DDD6FE
}

User --> APIGW : "Realiza pedido via HTTPS"
APIGW --> BPSvc : "Consulta limites de tasa y capacidad"
APIGW --> OrderSvc : "Enruta pedido si hay capacidad disponible"
OrderSvc ..> EventBus : "Publish OrderCreated"
EventBus ..> RestSvc : "Consume OrderCreated"
OrderSvc --> OrderDB : "Persiste estado de pedido"

@enduml
```
