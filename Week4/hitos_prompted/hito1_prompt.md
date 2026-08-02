# Context Engineering Prompt - Hito 1: Exploración y Aprendizaje de Contrapresión en GlobalNewsFeed

## Contexto de Referencia
Asimila las directrices del rol en `../context/role.md`, el marco metodológico en `../context/architecture_framework.md`, las reglas de formato en `../context/markdown_guide.md`, el estándar de PlantUML en `../context/plantuml_guide.md`, y la descripción del escenario en `../context/problem_description.md`.
La especificación de origen proviene de `../hitos/hito1.md`.

---

## Directivas Arquitectónicas para el Modelo

Actúa como **Principal Software & Enterprise Architect** y elabora un informe técnico analítico de alto nivel (extensión equivalente a 2-3 páginas) para el sistema **GlobalNewsFeed** en su funcionalidad **Análisis de Hashtags en Tendencia**.

---

### Ejes de Análisis Requeridos (Estrictos según Hito 1)

#### 1.1 Análisis del Escenario del Sistema GlobalNewsFeed
- **Identificación de Roles**: Especifica claramente los componentes que actúan como Productores (Ingesta de Posts, clientes web/móvil) y Consumidores (Servicio de HashTag Counter, agregadores de tendencias).
- **Naturaleza del Proceso de Larga Duración**: Explica por qué el parsing de texto, extracción de hashtags, deduplicación, cálculo en ventanas deslizantes (*sliding windows*) y clasificación en tiempo real constituyen un proceso intensivo de larga duración.
- **Situaciones Concretas de Contrapresión**: Describe escenarios operacionales reales (ej. evento deportivo global, noticias de última hora) donde la tasa de producción de posts supera la capacidad de procesamiento del consumidor.
- **Ejemplos Comparativos en Sistemas Reales**: Compara con patrones similares de la industria (ej. la canalización de ingesta de tendencias de Twitter/X, el procesamiento de métricas de reproducción en Netflix, o la ingesta de telemetría IoT).

#### 1.2 Investigación de Conceptos Clave
Presenta definiciones intuitivas, rigurosas e ingenieriles estructuradas con **Analogía de la Vida Real**, **Comparación Técnico-Arquitectónica** y **Contraejemplo (Qué NO es)** para:
1. **Procesos de Larga Duración** (*Long-Running Processes*)
2. **Productores y Consumidores** (*Producers & Consumers*)
3. **Contrapresión** (*Backpressure*)
4. **Colas, Buffers y Desacoplamiento** (*Queues, Buffers & Decoupling*)
5. **Procesamiento Síncrono vs. Asíncrono** (*Sync vs. Async Processing*)

#### 1.3 Exploración de Estrategias Arquitectónicas para Manejar la Contrapresión
Evalúa las principales alternativas arquitectónicas utilizando una **sección analítica estructurada con viñetas en negrita** (evaluando Mecanismo, Ventajas, Riesgos y Aplicabilidad en GlobalNewsFeed):
- **Uso de Colas de Mensajes / Event Streams** (Buffering finito/infinito con Kafka/PubSub).
- **Escalado Horizontal de Consumidores** (Consumer Groups & HPA).
- **Limitación de Tasa y Descarte de Carga** (Rate Limiting, Load Shedding & Throttling).
- **Degradación Controlada del Servicio** (Graceful Degradation, Sampling / Lossy Processing).
- **Control de Flujo Basado en Extracción Reactiva** (Reactive Streams Pull-based Backpressure).

#### 1.4 Modelado Visual en PlantUML (Estricto sin ASCII Art)
Genera **dos diagramas profesionales en PlantUML** (` ```plantuml @startuml ... @enduml `):
1. **Diagrama de Componentes del Flujo de Ingesta y Contrapresión**: Representa el servicio de ingesta, el buffer distribuido, la capa de consumidores escalables y la señal de contrapresión (aplicando `plantuml_guide.md`: `rectangle` para usuarios, estereotipos sin espacios como `<<EventStream>>`, flechas válidas).
2. **Diagrama de Secuencia de Gestión de Contrapresión**: Ilustra el comportamiento del sistema cuando el buffer alcanza un umbral crítico de saturación y activa el descarte de carga o la limitación de velocidad.

---

## Entregable
Guarda la respuesta técnica completa en `../outputs/output1.md`.
