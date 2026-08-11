# Guía Estándar de Diagramación en PlantUML (PlantUML Syntax & Best Practices - Strict Native Standard)

Esta guía define las reglas de sintaxis imperativas en **PlantUML** basándose en la especificación oficial ([PlantUML Language Reference Guide](https://plantuml.com/es/sequence-diagram)) para garantizar que todos los diagramas sean **100% sintácticamente válidos, parseables y libres de errores en cualquier compilador**.

---

## 1. Reglas Estrictas para Diagramas de Secuencia (Sequence Diagrams)

1. **FLECHAS PERMITIDAS EN DIAGRAMAS DE SECUENCIA (`->`, `-->`, `->>`)**:
   - En Diagramas de Secuencia, las ÚNICAS flechas de mensaje válidas son:
     - `A -> B : "Mensaje"` (Llamada síncrona / estándar).
     - `A ->> B : "Mensaje"` (Envío/Publicación de evento asíncrono).
     - `B --> A : "Respuesta"` (Respuesta/Retorno).
   - **PROHIBIDO USAR `..>` EN SECUENCIA**: `..>` es una flecha de dependencia exclusiva de diagramas de componentes o clases. Usar `..>` en un diagrama de secuencia provoca `syntax error (assumed diagram type: sequence)` en la línea 21.
   - **INCORRECTO**: `OrderSvc ..> EventBus : "Publish OrderCreated"`
   - **CORRECTO**: `OrderSvc ->> EventBus : "Publish OrderCreated"` o `OrderSvc -> EventBus : "Publish OrderCreated"`.

2. **PROHIBIDO USAR ESTEREOTIPOS `<< ... >>` EN PARTICIPANTES DE SECUENCIA**:
   - En Diagramas de Secuencia, colocar estereotipos `<< ... >>` en declaraciones `participant "Nombre" as Alias` provoca `syntax error (assumed diagram type: sequence)`.
   - **INCORRECTO**: `participant "API Gateway" <<EdgeGateway>> as APIGW`
   - **CORRECTO**: `participant "API Gateway" as APIGW` (NUNCA incluyas estereotipos `<< >>` en participantes de secuencia).

3. **PROHIBIDO USAR LA PALABRA CLAVE `queue` EN DIAGRAMAS DE SECUENCIA**:
   - `queue` es exclusiva de diagramas de componentes. Usar `queue` en secuencia confunde al parser.
   - **INCORRECTO en Secuencia**: `queue "Event Bus" as EventBus`
   - **CORRECTO en Secuencia**: `participant "Event Bus Kafka" as EventBus`

4. **PROHIBIDO USAR EL SÍMBOLO AMPERSAND '&' EN NOMBRES O ETIQUETAS**:
   - Usa siempre la palabra `and` (ej: `Catalog and Inventory Service`).

5. **PROHIBIDO USAR CORCHETES '[' O ']' EN ETIQUETAS DE FLECHAS Y MENSAJES**:
   - NUNCA pongas corchetes `[` `]` dentro de textos de relación o eventos.

6. **PROHIBIDO USAR PARÉNTESIS '(' O ')' Y APÓSTROFES '\'' EN MENSAJES DE SECUENCIA**:
   - En mensajes de secuencia (`A -> B : "Mensaje"`), no uses apóstrofes `'` ni paréntesis `(` `)`.
   - **INCORRECTO**: `OrderSvc -> OrderSvc : "3'. Guardar (PENDING)"`
   - **CORRECTO**: `OrderSvc -> OrderSvc : "3b. Guardar PENDING_PAYMENT"`

7. **SIMETRÍA DE ACTIVACIÓN/DESACTIVACIÓN**:
   - En bloques `alt ... else ... end`, asegúrate de que todo `deactivate Participant` tenga su correspondiente `activate Participant` previo dentro de esa misma rama.

---

## 2. Reglas Estrictas para Diagramas de Componentes (Component Diagrams)

1. **FLECHAS EN COMPONENTES**:
   - En Componentes SÍ se permiten `-->`, `..>`, `->`.

2. **ELEMENTOS NATIVOS EN COMPONENTES**:
   - **Usuarios / Clientes**: `rectangle "Cliente / Usuario" as User`
   - **API Gateway / Microservicios**: `component "API Gateway" as APIGW <<EdgeGateway>>` (estereotipos permitidos en componentes)
   - **Bus de Eventos**: `queue "Event Bus (Apache Kafka)" as EventBus`
   - **Bases de Datos**: `database "Order DB (PostgreSQL)" as OrderDB`
   - **Límites de Sistema**: `package "Ecosistema BookSphere" #FFFBEB { ... }`

3. **PROHIBIDO `!include` EXTERNOS**: NUNCA incluyas `!include <C4/...>` ni `!include https://...`.

---

## 3. Reglas Estrictas de PlantUML Salt para UI Mockups (`@startsalt`)

1. **SIN CONTROLES ANIDADOS DENTRO DE BOTONES `[ ]`**: NUNCA pongas `( )` dentro de `[ ]` (ej: usa `[ Pausar Pedidos Por 5 Minutos ]`).
2. **SIN COMAS, APÓSTROFES, AMPERSANDS NI MARKDOWN**: No uses `,`, `'`, `&` ni `**bold**` en Salt.

---

## 4. Ejemplo Estándar 100% Parseable de Diagrama de Secuencia (Según PlantUML Reference Guide)

```plantuml
@startuml
skinparam sequenceMessageAlign center
skinparam backgroundColor white

title Flujo de Procesamiento de Pedidos (Saga por Coreografia)

participant "Cliente Web Mobile" as Client
participant "API Gateway" as APIGW
participant "Order Management Service" as OrderSvc
participant "Event Bus Kafka" as EventBus
participant "Payment Processing Service" as PaymentSvc
participant "Catalog and Inventory Service" as CatalogSvc
participant "Recommendation Engine" as RecSvc
participant "Pasarela de Pagos Externa" as ExtPayment

Client -> APIGW : "1. POST /orders Checkout"
activate APIGW
APIGW -> OrderSvc : "2. Crear Pedido HTTP"
activate OrderSvc
OrderSvc -> OrderSvc : "3a. Guardar Order en OrderDB PENDING_PAYMENT"
OrderSvc ->> EventBus : "3b. Publish OrderCreated"
deactivate OrderSvc
deactivate APIGW

EventBus -> PaymentSvc : "4. Consume OrderCreated"
activate PaymentSvc
PaymentSvc -> ExtPayment : "5. Charge Request API REST con Circuit Breaker"
activate ExtPayment
ExtPayment --> PaymentSvc : "6. Payment Response"
deactivate ExtPayment

alt Payment Processed Successfully
    PaymentSvc -> PaymentSvc : "7a. Guardar Payment en PaymentDB PROCESSED"
    PaymentSvc ->> EventBus : "8a. Publish PaymentProcessed"
    deactivate PaymentSvc
else Payment Failed
    activate PaymentSvc
    PaymentSvc -> PaymentSvc : "7b. Guardar Payment en PaymentDB FAILED"
    PaymentSvc ->> EventBus : "8b. Publish PaymentFailed"
    deactivate PaymentSvc
end

@enduml
```
