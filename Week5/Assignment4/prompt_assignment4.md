# Context Engineering Prompt - Assignment 4: Modelo C4 Extendido con Componente de Contrapresión y UI Mockups (PedidosYa EDA)

## Contexto de Referencia
Asimila las directrices del rol en `../context/role.md`, el marco de microservicios en `../context/architecture_framework.md`, las reglas visuales en `../context/markdown_guide.md`, las guías de diagramación en `../context/plantuml_guide.md` y `../context/structurizr_c4_guide.md`, el escenario en `./problem_description.md` y los objetivos específicos en `./specifics_objectives.md`.

---

## Directivas Arquitectónicas Imperativas para el Modelo

Actúa como **Principal Software & Enterprise Architect** y elabora un informe técnico de arquitectura completo (extensión de 3-4 páginas) para **PedidosYa EDA** extendiendo el modelo C4 con un **Componente de Contrapresión** y **Pantallas de Interfaz de Usuario (UI Mockups)**.

---

### Ejes de Análisis y Entregables Requeridos

#### 1. Extensión del Modelo C4 con Componente de Contrapresión (PlantUML Nativo Parseable)
Genera los **tres diagramas del Modelo C4 extendidos** en bloques PlantUML parseables (` ```plantuml @startuml ... @enduml `) aplicando estrictamente `plantuml_guide.md` y `structurizr_c4_guide.md`:

- **REGLAS ANTI-ERRORES PLANTUML OBLIGATORIAS**:
  1. **PROHIBIDO USAR `!include` EXTERNOS O REMOTOS**: NUNCA incluyas `!include <C4/...>` ni `!include https://...`. Usa componentes nativos (`component`, `rectangle`, `queue`, `database`, `package`).
  2. **ESTEREOTIPOS LIMPIOS**: Estereotipos en una sola palabra fuera de las comillas (ej. `component "API Gateway" as APIGW <<EdgeGateway>>`).
  3. **ETIQUETAS DE RELACIÓN LIMPIAS**: NUNCA uses comas `,`, comillas anidadas, ni `<< >>` dentro de la etiqueta de la flecha (ej. `APIGW --> BPSvc : "Consulta limites de tasa via gRPC"`).
  4. **SIN HTML NI MARKDOWN EN DIAGRAMAS**: Prohibido `<b>`, `<br>`, `**` dentro de diagramas o notas.

- **Nivel 1: Diagrama de Contexto de Sistema Extendido**:
  - Representa a los usuarios (`rectangle "Cliente\n<<Person>>" as User`), el sistema principal (`component "Plataforma PedidosYa EDA\n<<SoftwareSystem>>" as PedidosYa`) y los sistemas externos de pago y notificaciones bajo señalización de contrapresión.
- **Nivel 2: Diagrama de Contenedores con Contrapresión**:
  - Incorpora el contenedor **`Backpressure Controller Service`** (`component "Backpressure Controller Service\n<<Container>>" as BPSvc #FED7AA`) coordinando el flujo entre API Gateway, Order Service y el Event Bus Kafka.
- **Nivel 3: Diagrama de Componentes del Order Service con Contrapresión**:
  - Detalla los componentes internos de *Order Service*: `Order Controller`, `Backpressure Flow Manager`, `Queue Buffer Monitor`, `Event Publisher Component`, `Order Repository`.

#### 2. Escenarios Operacionales de Contrapresión
Describe en detalle 3 escenarios realistas de sobrecarga:
- **Escenario 1: Sobrecarga Masiva de Ingesta (Peak Event)**: Rate Limiting y Load Shedding en API Gateway.
- **Escenario 2: Saturación de Capacidad en Cocina (Kitchen Saturation)**: Gestión de capacidad y cola de retención.
- **Escenario 3: Agotamiento de Flota de Repartidores (Driver Fleet Depletion)**: Extensión dinámica del SLA de entrega.

#### 3. Pantallas de Interfaz de Usuario (UI Mockups ante Contrapresión en PlantUML Salt)
Genera bocetos visuales de interfaz en bloques `@startsalt ... @endsalt`:

- **REGLAS ANTI-ERRORES PLANTUML SALT OBLIGATORIAS**:
  1. **PROHIBIDO ANIDAR PARÉNTESIS DENTRO DE BOTONES**: NUNCA pongas `( )` dentro de un botón `[ ]`. Usar: `[ Pausar Pedidos Por 5 Minutos ]`.
  2. **SIN COMAS NI SÍMBOLOS ESPECIALES INTERNOS**: No uses comas `,` ni asteriscos `**` dentro de textos en Salt.

- **Mockup 1 (App Móvil Cliente - Alta Demanda)**: Banner de "ALTA DEMANDA EN TU ZONA - Tiempo estimado ajustado 45-60 min".
- **Mockup 2 (App Móvil Cliente - Pausa Temporal de Ingesta)**: Pantalla de "SERVICIO TEMPORALMENTE OCUPADO - Opciones de pedido programado".
- **Mockup 3 (Tablet Cocina Restaurante - Control de Capacidad)**: Panel del restaurante mostrando "Capacidad Actual 92%" y botón "Pausar Nuevos Pedidos Por 5 Minutos".

---

## Entregable
Guarda la respuesta técnica completa en `./assignment4_output.md`.
