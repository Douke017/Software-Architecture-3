# Guía Estándar de Diagramación en PlantUML (PlantUML Syntax & Best Practices - Strict Native Standard)

Esta guía define las reglas de sintaxis imperativas en **PlantUML** para garantizar que todos los diagramas arquitectónicos y UI mockups generados por el modelo sean **100% sintácticamente válidos, parseables y libres de errores en cualquier entorno local o remoto**.

---

## 1. Reglas Estrictas para Diagramas de Secuencia (Sequence Diagrams)

1. **PROHIBIDO USAR ESTEREOTIPOS `<< ... >>` EN PARTICIPANTES DE SECUENCIA**:
   - En Diagramas de Secuencia, colocar estereotipos `<< ... >>` en declaraciones `participant "Nombre" as Alias` provoca un error de sintaxis inmediato (`syntax error (assumed diagram type: sequence)` en la línea 8).
   - **INCORRECTO en Secuencia**: `participant "API Gateway" <<EdgeGateway>> as APIGW` o `participant "API Gateway" as APIGW <<EdgeGateway>>`
   - **CORRECTO en Secuencia**: `participant "API Gateway" as APIGW` (NUNCA incluyas estereotipos `<< >>` en participantes de secuencia).

2. **PROHIBIDO USAR LA PALABRA CLAVE `queue` EN DIAGRAMAS DE SECUENCIA**:
   - `queue` es exclusiva de diagramas de componentes. Usar `queue` en secuencia confunde al parser.
   - **INCORRECTO en Secuencia**: `queue "Event Bus" as EventBus`
   - **CORRECTO en Secuencia**: `participant "Event Bus Kafka" as EventBus`

3. **PROHIBIDO USAR EL SÍMBOLO AMPERSAND '&' EN NOMBRES O ETIQUETAS**:
   - Usa siempre la palabra `and` (ej: `Catalog and Inventory Service`).

4. **PROHIBIDO USAR CORCHETES '[' O ']' EN ETIQUETAS DE FLECHAS Y MENSAJES**:
   - NUNCA pongas corchetes `[` `]` dentro de textos de relación o eventos (ej: `OrderSvc ..> EventBus : "Publish OrderCreated"`).

5. **PROHIBIDO USAR PARÉNTESIS '(' O ')' Y APÓSTROFES '\'' EN MENSAJES DE SECUENCIA**:
   - En mensajes de secuencia (`A -> B : "Mensaje"`), no uses apóstrofes `'` ni paréntesis `(` `)`.
   - **INCORRECTO**: `OrderSvc -> OrderSvc : "3'. Guardar (PENDING)"`
   - **CORRECTO**: `OrderSvc -> OrderSvc : "3b. Guardar PENDING_PAYMENT"`

6. **SIMETRÍA DE ACTIVACIÓN/DESACTIVACIÓN**:
   - En bloques `alt ... else ... end`, asegúrate de que todo `deactivate Participant` tenga su correspondiente `activate Participant` previo dentro de esa misma rama.

---

## 2. Reglas Estrictas para Diagramas de Componentes (Component Diagrams)

1. **ELEMENTOS NATIVOS EN COMPONENTES**:
   - **Usuarios / Clientes**: `rectangle "Cliente / Usuario" as User`
   - **API Gateway / Microservicios**: `component "API Gateway" as APIGW <<EdgeGateway>>` (los estereotipos SÍ se permiten en componentes)
   - **Bus de Eventos**: `queue "Event Bus (Apache Kafka)" as EventBus`
   - **Bases de Datos**: `database "Order DB (PostgreSQL)" as OrderDB`
   - **Límites de Sistema**: `package "Ecosistema BookSphere" #FFFBEB { ... }`

2. **PROHIBIDO `!include` EXTERNOS**: NUNCA incluyas `!include <C4/...>` ni `!include https://...`.

---

## 3. Reglas Estrictas de PlantUML Salt para UI Mockups (`@startsalt`)

1. **SIN CONTROLES ANIDADOS DENTRO DE BOTONES `[ ]`**: NUNCA pongas `( )` dentro de `[ ]` (ej: usa `[ Pausar Pedidos Por 5 Minutos ]`).
2. **SIN COMAS, APÓSTROFES, AMPERSANDS NI MARKDOWN**: No uses `,`, `'`, `&` ni `**bold**` en Salt.
