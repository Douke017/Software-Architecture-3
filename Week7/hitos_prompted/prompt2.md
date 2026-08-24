# Context Engineering Master Prompt - Hito 2: Comportamiento Distribuido y DDD (ShopStream - Week 7)

## Contexto de Referencia
Asimila la descripción del problema de ShopStream en `../context/problem_description.md`, las directrices del rol en `../../shared_context/role.md`, el marco de microservicios en `../../shared_context/architecture_framework.md`, los principios de `../../shared_context/twelve_factor_app_guide.md`, los estándares C4 en `../../shared_context/structurizr_c4_guide.md`, las reglas de diagramación en `../../shared_context/plantuml_guide.md` y las reglas de formato en `../../shared_context/markdown_guide.md`.

---

## Directivas Metodológicas para el Arquitecto Principal

Actúa como **Principal Software & Enterprise Architect** y lidera el análisis del **Hito 2: Comportamiento Distribuido y Diseño Táctico/Estratégico DDD para ShopStream**.

Tu objetivo es resolver con rigor arquitectónico de alto nivel cómo colaboran e interactúan los microservicios en escenarios transaccionales complejos, garantizando la consistencia eventual, el aislamiento de fallas y la integridad del modelo de dominio.

---

### Ejes de Razonamiento Arquitectónico y Entregables del Hito 2 (Numeración Profesional desde la Sección 1)

#### 1. Diseño del Flujo Transaccional Distribuido: "Realizar Pedido"
- **Análisis del Ciclo de Vida de la Compra**: Modela el recorrido completo de la transacción desde la intención de compra del cliente en el checkout hasta la confirmación definitiva o la compensación por fallo.
- **Topología de Datos Descentralizada (*Database-per-Service*)**: Explica cómo se preserva la autonomía e integridad de los datos en cada servicio involucrado sin recurrir a transacciones distribuidas bloqueantes (2PC) ni esquemas de base de datos compartidos.
- **Diagrama PlantUML 1 (Secuencia Transaccional de Realizar Pedido)**:
  - Diagrama de secuencia nativo parseable que muestre el flujo completo de checkout, reserva de inventario, procesamiento de cobro, actualización del pedido y disparo de notificaciones.
  - *Reglas Estrictas de Secuencia*: PROHIBIDO usar estereotipos `<< >>` en líneas `participant`, PROHIBIDO usar la palabra clave `queue`, PROHIBIDO usar apóstrofes `'` o paréntesis `()` dentro de los mensajes de las flechas.

#### 2. Selección y Justificación del Patrón SAGA (Coreografía vs. Orquestación)
- **Evaluación Comparativa de Alternativas**: Realiza un análisis exhaustivo y objetivo de trade-offs entre:
  - *Alternativa A: SAGA por Coreografía (Choreography-based Saga)*: Coordinación implícita guiada por eventos descentralizados.
  - *Alternativa B: SAGA por Orquestación (Orchestration-based Saga)*: Coordinación explícita mediante un orquestador o máquina de estados dedicada.
- **Matriz Comparativa de SAGA (Tabla Markdown Breve de 8-10 palabras por celda)**:
  Compara ambas alternativas según: complejidad de implementación, acoplamiento entre servicios, visibilidad/monitoreo del estado, facilidad de prueba y riesgo de dependencias circulares.
- **Decisión y Justificación para ShopStream**: Selecciona y fundamenta la estrategia de SAGA más adecuada para el flujo de pedidos de ShopStream.
- **Estrategia de Transacciones Compensatorias**: Detalla los pasos de reversión semántica si ocurre una falla en un paso intermedio (ej. rechazo de pago por fondos insuficientes o falta de stock concurrente).

#### 3. Estrategias de Resiliencia: Ubicación y Justificación de Retry y Circuit Breaker
- **Análisis de Vulnerabilidad y Modos de Falla de Red**: Identifica qué puntos del sistema están expuestos a fallas transitorias o caídas prolongadas.
- **Matriz Resumen de Resiliencia (Tabla Breve)**:
  | Punto de Interacción | Patrón Aplicado | Falla Mitigada |
  | :--- | :--- | :--- |
  | `Payment Svc -> Pasarela Externa` | Circuit Breaker + Retry | Caída prolongada pasarela |
  | `Order Svc -> DB Local` | Transactional Outbox | Desconexión temporal Kafka |
  | `Gateway -> BFFs` | Rate Limiting + Fallback | Picos masivos de tráfico |

- **Análisis Detallado de Resiliencia (Redactado en Viñetas Markdown)**:
  - *REGLA DE FORMATO*: Desarrolla la justificación técnica, configuración de timeouts, umbrales de fallo, backoff exponencial y fallback para cada interacción en **párrafos y viñetas estructuradas**, NUNCA dentro de celdas de tabla.
- **Políticas de Idempotencia**: Explica cómo se garantiza la idempotencia en las operaciones de cobro y reserva para que los reintentos automáticos no generen dobles cargos ni inconsistencias de inventario.

#### 4. Diseño Táctico DDD: El Agregado Pedido (Order Aggregate)
- **Definición del Agregado y Límites Transaccionales**: Delimita el agregado `Pedido` identificando sus componentes internos:
  - **Aggregate Root (Raíz de Agregado)**: Justifica la entidad principal que actúa como guardián del acceso y mutación.
  - **Entidades Internas y Value Objects (Objetos de Valor)**: Identifica los elementos que componen el agregado (ej. ítems, direcciones, cálculos monetarios, estados).
- **Definición de Invariantes de Negocio**: Enuncia y explica formalmente al menos **dos invariantes críticas** que el Aggregate Root debe hacer cumplir de forma estricta antes de permitir cualquier cambio de estado.
- **Diagrama PlantUML 2 (Modelo Estructural del Agregado Pedido)**:
  - Diagrama de clases/componentes nativo que ilustre el Aggregate Root, sus Value Objects, entidades asociadas y métodos de dominio para mutación de estado.

#### 5. Diseño Estratégico DDD: Relación Catálogo–CMS en el Context Map (Mapa de Contextos)
- **Evaluación de Patrones de Context Mapping**: Analiza los posibles patrones de relación estratégica entre el `Contexto de Catálogo` y el `Contexto de CMS`:
  - *Shared Kernel*, *Customer/Supplier*, *Conformist*, *Open Host Service / Published Language (OHS/PL)* o *Anticorruption Layer (ACL)*.
- **Definición y Justificación de la Relación**:
  - Establece la relación upstream/downstream entre Catálogo y CMS.
  - Explica cómo el CMS consume información de productos para campañas y banners sin contaminar su propio modelo de dominio ni generar acoplamiento directo a la base de datos de catálogo.
- **Diagrama PlantUML 3 (Context Map Estratégico ShopStream)**:
  - Diagrama formal que muestre los Bounded Contexts del sistema y la relación explícita (Upstream `[U]`, Downstream `[D]`, `[OHS]`, `[PL]`, `[ACL]`) entre el Catálogo y el CMS.

---

## Formato del Entregable
Elabora el informe técnico de arquitectura estructurado y guárdalo en `../outputs/output2.md`.
