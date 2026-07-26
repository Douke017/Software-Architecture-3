# Guía Estándar de Diagramación en PlantUML (PlantUML Syntax & Best Practices)

Esta guía define las reglas de sintaxis estrictas y patrones de diseño visual en **PlantUML** para garantizar que todos los diagramas arquitectónicos generados sean **100% sintácticamente válidos, parseables y libres de errores**.

---

## 1. Reglas Generales de Sintaxis

1. **Delimitadores Obligatorios**: Todo diagrama debe comenzar estrictamente con `@startuml` y finalizar con `@enduml`.
2. **Uso Obligatorio de Alias y Comillas**:
   - Todo componente con espacios o caracteres especiales en su nombre DEBE declararse con alias y comillas:
     - **INCORRECTO (Error de sintaxis)**: `component API Gateway as APIGW`
     - **CORRECTO**: `component "API Gateway" as APIGW`
3. **Identificadores Limpios**: Los alias deben ser cadenas alfanuméricas simples sin espacios ni guiones especiales (ej: `APIGW`, `CheckoutSvc`, `InvDB`).
4. **Etiquetas de Flechas**: Si la etiqueta de una flecha contiene espacios o caracteres especiales, usa comillas o sintaxis simple:
   - **CORRECTO**: `Producer --> Broker : "Publish user_joined"`
5. **Separación de Líneas en Nombres**: Para añadir saltos de línea dentro del nombre visible de un componente, usa `\n` en lugar de `<br>`:
   - **CORRECTO**: `component "Servicio de Notificaciones\n<<Asíncrono>>" as NotifSvc`

---

## 2. Diagramas de Componentes y Despliegue

### A. Elementos Soportados y Sintaxis
```plantuml
@startuml
skinparam componentStyle uml2
skinparam packageStyle rectangle
skinparam backgroundColor white

' 1. Declaración de Nodos y Componentes
actor "Usuario / Cliente" as User
component "API Gateway" as APIGW <<Edge>>
component "Servicio de Pedidos" as OrderSvc <<Microservice>> #E0F2FE
queue "Cola: purchase_attempt" as QueuePurchase #FEF3C7
database "Base de Datos Primaria" as MainDB <<Database>> #DCFCE7

' 2. Agrupación Lógica
package "Capa de Aplicaciones" {
    component "Worker 1" as W1
    component "Worker 2" as W2
}

' 3. Relaciones y Conexiones
User --> APIGW : "Solicitud HTTP"
APIGW --> QueuePurchase : "Enqueue event"
QueuePurchase --> W1 : "Process task (P2P)"
W1 --> MainDB : "Write transaction"

' 4. Notas
note right of QueuePurchase
  Absorbe picos de tráfico
  mediante patrón P2P.
end note

@enduml
```

---

## 3. Diagramas de Secuencia (Sequence Diagrams)

### A. Elementos y Estructura Sintáctica
```plantuml
@startuml
autonumber
skinparam backgroundColor white

title Flujo Asíncrono de Procesamiento de Eventos

actor "Cliente" as User
participant "API Gateway" as Gateway
queue "Message Broker" as Broker
participant "Worker de Inventario" as Worker

== 1. Emisión de Evento ==
User -> Gateway : POST /api/v1/checkout
activate Gateway

Gateway -> Broker : "Publish [purchase_attempt]"
activate Broker
Broker --> Gateway : ACK (Enqueued)
deactivate Broker

Gateway --> User : HTTP 202 Accepted
deactivate Gateway

== 2. Procesamiento Asíncrono ==
Broker -> Worker : "Consume [purchase_attempt]"
activate Worker
Worker -> Worker : Validar y Reservar Stock
Worker --> Broker : "Publish [inventory_updated]"
deactivate Worker

@enduml
```

---

## 4. Lista de Trampas de Sintaxis a Evitar (Checklist Anti-Errores)

| Error Común en PlantUML | Causa del Error | Forma Correcta |
| :--- | :--- | :--- |
| `component Servicio Pedidos` | Falta comillas en nombre con espacio. | `component "Servicio Pedidos" as OrderSvc` |
| `<Service>` | Estereotipo con solo 1 corchete angular. | `<<Service>>` (Doble corchete angular) |
| `--->` o `====>` | Flechas con demasiados guiones no estándar. | `-->` o `->` |
| `endnote` | Palabra clave de nota pegada. | `end note` |
| `package Capa App {` sin cerrar `}` | Llave desbalanceada en package. | Asegurar cerrar cada `package` con `}` |
| Uso de `<br>` dentro de nombres de PlantUML | Etiquetas HTML no soportadas en alias. | Usar `\n` para saltos de línea visibles. |
