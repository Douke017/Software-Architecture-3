# Guía Estándar de Diagramación en PlantUML (Shared Global PlantUML Standard)

Esta guía define las reglas de sintaxis imperativas en **PlantUML** para garantizar que todos los diagramas arquitectónicos y UI mockups generados por el modelo sean **100% sintácticamente válidos, parseables, legibles en temas claro/oscuro y libres de errores en cualquier entorno local o remoto**.

---

## 1. Reglas Estrictas de Renderizado y Legibilidad Visual

1. **PROHIBIDO USAR `skinparam handwritten true`**:
   - NUNCA incluyas `skinparam handwritten true` ni `skinparam handwritten false`. Provoca una barra amarilla de advertencia (`Please use '!option handwritten true'`).

2. **PROHIBIDO FORMAS OVALADAS `usecase` Y TEXTO BLANCO SOBRE BLANCO**:
   - NUNCA utilices `usecase` ni formas de casillas ovaladas blancas para representar componentes o servicios. Provoca texto blanco ilegible en visores en modo oscuro.
   - Utiliza exclusivamente formas estándar C4: `component`, `rectangle`, `database`, `queue`, `participant`.

3. **PROHIBIDO SOBREESCRIBIR COLORES DE FUENTE QUE CAUSEN ILEGIBILIDAD**:
   - NUNCA fuerces `FontColor #FFFFFF` o `FontColor #000000` sobre fondos del mismo tono. Deja los colores por defecto o usa esquemas de contraste alto aprobados (`#DBEAFE` fondo azul claro con texto oscuro, `#1E293B` con texto claro).

4. **PROHIBIDO BLOQUES LARGOS DE SKINPARAM**:
   - NUNCA incluyas 30 líneas de estilización `skinparam`. Usar únicamente `skinparam backgroundColor white` o `skinparam componentStyle uml2`.

---

## 2. Reglas Estrictas para Diagramas de Secuencia (Sequence Diagrams)

1. **PROHIBIDO USAR ESTEREOTIPOS `<< ... >>` EN PARTICIPANTES DE SECUENCIA**:
   - En Diagramas de Secuencia, colocar estereotipos `<< ... >>` en declaraciones `participant "Nombre" as Alias` provoca error sintáctico (`syntax error (assumed diagram type: sequence)`).
   - **CORRECTO en Secuencia**: `participant "API Gateway" as APIGW` (sin estereotipos `<< >>`).

2. **PROHIBIDO LA PALABRA CLAVE `queue` EN DIAGRAMAS DE SECUENCIA**:
   - `queue` es exclusiva de diagramas de componentes. Usar `queue` en secuencia confunde al parser.
   - **CORRECTO en Secuencia**: `participant "Event Bus Kafka" as EventBus`

3. **PROHIBIDO USAR EL SÍMBOLO AMPERSAND '&' EN NOMBRES O ETIQUETAS**:
   - Usa siempre la palabra `and` (ej: `Catalog and Inventory Service`).

4. **PROHIBIDO USAR CORCHETES '[' O ']' EN ETIQUETAS DE FLECHAS Y MENSAJES**:
   - NUNCA pongas corchetes `[` `]` dentro de textos de relación o eventos.

5. **PROHIBIDO USAR PARÉNTESIS '(' O ')' Y APÓSTROFES '\'' EN MENSAJES DE SECUENCIA**:
   - En mensajes de secuencia (`A -> B : "Mensaje"`), no uses apóstrofes `'` ni paréntesis `(` `)`.

6. **SIMETRÍA DE ACTIVACIÓN/DESACTIVACIÓN**:
   - En bloques `alt ... else ... end`, asegúrate de que todo `deactivate Participant` tenga su correspondiente `activate Participant` previo dentro de esa misma rama.

---

## 3. Reglas Estrictas para Diagramas de Componentes (Component Diagrams)

1. **ELEMENTOS NATIVOS EN COMPONENTES**:
   - **Usuarios / Clientes**: `rectangle "Cliente / Usuario" as User`
   - **API Gateway / Microservicios**: `component "API Gateway" as APIGW <<EdgeGateway>>`
   - **Bus de Eventos**: `queue "Event Bus (Apache Kafka)" as EventBus`
   - **Bases de Datos**: `database "Order DB (PostgreSQL)" as OrderDB`
   - **Límites de Sistema**: `package "Ecosistema QuickCart" #FFFBEB { ... }`

2. **PROHIBIDO `!include` EXTERNOS**: NUNCA incluyas `!include <C4/...>` ni `!include https://...`.

---

## 4. Reglas Estrictas de PlantUML Salt para UI Mockups (`@startsalt`)

1. **SIN CONTROLES ANIDADOS DENTRO DE BOTONES `[ ]`**: NUNCA pongas `( )` dentro de `[ ]`.
2. **SIN COMAS, APÓSTROFES, AMPERSANDS NI MARKDOWN**: No uses `,`, `'`, `&` ni `**bold**` en Salt.
