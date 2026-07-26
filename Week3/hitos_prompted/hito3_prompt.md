# Context Engineering Prompt - Hito 3: Procesamiento de Flujos y Formulación Estricta de Requerimientos

## Contexto de Referencia
Asimila las directrices del rol en `../context/role.md`, la descripción del escenario en `../context/problem_description.md` y los estándares de ingeniería de requerimientos en `../context/requirements_standards.md` (Basados en **NASA SP-2016-6105 Rev2 Appendix C** e **IBM DOORS Standards**).
La especificación de origen proviene de `../hitos/hito3.md`.

---

## Directivas Arquitectónicas para el Modelo

Diseña la arquitectura de **Procesamiento de Flujos en Tiempo Real (Stream Processing)** para **FlashSales Inc.** y formula los **Requerimientos Formales de Sistema** con rigor técnico absoluto. Elabora un informe técnico de arquitectura de alto nivel (extensión equivalente a 2-3 páginas).

---

### Ejes de Análisis y Reflexión Requeridos

#### 1. Formulación Estricta de Requerimientos en Tiempo Real (Norma NASA & IBM DOORS)
Formula de 4 a 6 **Requerimientos Formales Vinculantes** para los casos de uso clave (Detección de Fraude en vivo, Actualización Atómica de Inventario, Recomendaciones Personalizadas y Alertas Operativas de Infraestructura).

Cada requerimiento debe redactarse **ESTRICTAMENTE** siguiendo la sintaxis imperativa de la NASA:
$$\text{[Sujeto/Sistema]} + \text{\textbf{DEBERÁ (SHALL)}} + \text{[Acción/Capacidad]} + \text{[Condición/Métrica Cuantitativa]}$$

**Reglas de Redacción Impuestas por la NASA e IBM**:
- **NUNCA ES UNA SUGERENCIA**: Está estrictamente prohibido usar verbos condicionales ("debería", "podría", "se sugiere").
- **Atómico y Singular**: Una sola capacidad o restricción verificable por requerimiento (sin conjunciones ambiguas "y/o").
- **Libre de Implementación**: Especifica el QUÉ, no el CÓMO a nivel de código fuente.
- **Cuantitativo (Sin términos vagos de IBM)**: Prohibido usar "rápido", "eficiente" o "adecuado". Especifica límites cuantitativos precisos (ej. `< 100 ms`, `> 5,000 eventos/sec`).
- **Formato de Ficha**: Incluye ID Único (`REQ-STREAM-001`), Declaración Imperativa (SHALL Statement), Tipo de Requerimiento y Criterio de Verificación.

#### 2. Diseño de Pipelines de Procesamiento de Flujos
Modela las canalizaciones de eventos de alta frecuencia especificando:
- **Fuentes de Eventos (Event Sources / Ingestion)**: Tópicos de entrada (`purchase_attempt`, `item_viewed`, `user_joined`).
- **Procesadores de Flujo (Stream Processors / Transformations)**: Operaciones de filtrado, agregación, uniones de flujos (*stream joins*) y computación de estado.
- **Drenajes o Salidas (Event Sinks)**: Bases de datos analíticas, cachés en memoria, WebSocket gateways o sistemas de alerta.

#### 3. Garantías de Consistencia, Ordenamiento y Estado
- **Compara Garantías de Entrega**: Sopesa *At-least-once* vs. *Exactly-once processing* (justificando dónde se requiere idempotencia estricta como en pagos/inventario).
- **Tratamiento de Eventos Fuera de Orden**: Modela el manejo de desalineaciones temporales mediante *Watermarks* y tiempos de evento (*Event Time vs. Processing Time*).
- **Gestión de Estado y Ventanas Temporales**: Clasifica el uso de *Tumbling Windows*, *Sliding Windows* y *Session Windows* para agregar métricas de fraude y popularidad.

#### 4. Investigación Comparativa de Tecnologías de Stream Processing
- Investiga al menos 3 tecnologías de procesamiento de flujos (ej: **Kafka Streams**, **Apache Flink**, **Spark Structured Streaming**, **Google Cloud Dataflow**).
- Presenta la evaluación mediante **sub-secciones analíticas con viñetas en negrita** (ej: `### 4.1. Apache Flink`, `- **Modelo de Procesamiento**: ...`, `- **Gestión de Estado**: ...`, `- **Ventajas**: ...`).

#### 5. Modelado Visual en PlantUML (Estricto sin ASCII Art)
Genera **dos diagramas profesionales en PlantUML** (delimitados por ` ```plantuml ` conteniendo `@startuml` y `@enduml`):
1. **Diagrama de Arquitectura de Stream Processing (Pipeline Topology)**: Muestra la topología desde Fuentes de Ingesta, Procesadores de Flujo (ventanas/agregaciones) hasta los Drenajes (Sinks).
2. **Diagrama de Secuencia de Detección de Fraude y Alerta en Tiempo Real**: Ilustra el procesamiento en tiempo real sobre la ventana temporal sin retrasar la respuesta al cliente.

---

## Entregable
Guarda la respuesta completa en `../outputs/output3.md`.
