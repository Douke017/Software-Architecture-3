# Context Engineering Prompt - Hito 2: Síntesis y Creación de Entregables de Contrapresión (GlobalNewsFeed)

## Contexto de Referencia
Asimila las directrices del rol en `../context/role.md`, el marco metodológico en `../context/architecture_framework.md`, las reglas visuales en `../context/markdown_guide.md`, la guía de diagramación en `../context/plantuml_guide.md`, y la descripción del escenario en `../context/problem_description.md`.
La especificación de origen proviene de `../hitos/hito2.md`.

---

## Directivas Arquitectónicas para el Modelo

Actúa como **Principal Software & Enterprise Architect** y elabora un informe técnico completo de arquitectura (extensión equivalente a 3-4 páginas) que consolide la propuesta arquitectónica de contrapresión para **GlobalNewsFeed**.

---

### Ejes de Análisis y Entregables Requeridos

#### 2.1 Selección, Justificación y Análisis Crítico de la Estrategia
- **Estrategia Seleccionada**: Define la estrategia o patrón híbrido elegido (ej. *Control de Flujo Reactivo Pull-Based con Event Stream Buffer (Apache Kafka) + Auto-escalado de Consumidores + Descarte de Carga (Load Shedding) en el Ingress*).
- **Justificación Técnica**: Explica por qué esta combinación es idónea para procesar flujos masivos de posts en tiempo real durante eventos globales de tráfico extremo.
- **Alcance y Limitaciones**: Detalla explícitamente **qué problemas resuelve** (agotamiento de memoria, caídas en cascada, acoplamiento síncrono) y **qué problemas NO resuelve** (ej. latencia inevitable si la cola se llena, costo de almacenamiento de estado en ventanas gigantes).
- **Feedback Crítico e Impugnación de la Arquitectura**: Presenta una evaluación explícita de estrés ("¿Qué debilidades ocultas tiene esta propuesta?", "¿Qué ocurre si el tráfico se triplica en 10 segundos?", "¿Cómo reacciona si el Event Bus entra en contención de discos?").

#### 2.2 Diseño Completo de la Arquitectura Objetivo
- **Componentes Principales**: Modela responsabilidades de *Ingestion Gateway*, *Message Broker / Event Bus*, *Hashtag Processor Workers*, *Sliding Window State Store (RocksDB)*, *Redis Trend Cache* y *Dead Letter Queue (DLQ)*.
- **Flujo de Datos End-to-End**: Describe el recorrido completo del dato desde que el usuario publica un post hasta que el hashtag clasificado se refleja en la sección de tendencias.
- **Punto(s) Exacto(s) de Gestión de Contrapresión**: Identifica y resalta **los puntos de control donde el sistema aplica contrapresión**, buffers de retención, señalización pull y descarte de carga cuando el umbral de capacidad supera el 85%.
- **Diagramación Visual en PlantUML (Estricto sin ASCII Art)**:
  - **Diagrama de Componentes de Arquitectura Objetivo**: Ilustra los componentes, capas y puntos de control de contrapresión (aplicando `plantuml_guide.md`: `rectangle` para usuarios, estereotipos sin espacios como `<<EventStream>>`, flechas válidas).
  - **Diagrama de Secuencia de Gestión de Contrapresión y Load Shedding**: Muestra la interacción cuando la tasa de ingesta supera la capacidad máxima y se activan las señales de ajuste de ritmo o descarte de muestra.

#### 2.3 Reflexión Metodológica sobre el Uso de la IA en Arquitectura
- Elabora un apartado de reflexión técnica analizando el rol de la IA generativa como copiloto de arquitectura de software:
  - Cómo la IA potencia la exploración rápida de compromisos (*trade-offs*) y simulación de escenarios límite.
  - La importancia crítica de que el arquitecto mantenga el control técnico, el criterio de dominio y la validación de consistencia sin delegar a ciegas.

#### 2.4 Prompt Maestro Reutilizable de Redacción y Estilo (Sin Delegación Técnica)
Diseña un **Prompt Maestro de Redacción** completo, reutilizable y delimitado en un bloque de código Markdown (` ```prompt ... ``` `) con la siguiente estructura:
- **Objetivo**: Pulir redacción, gramática, concisión y fluidez sin alterar ninguna decisión técnica.
- **Reglas Negativas Estrictas**: Prohibir explícitamente a la IA cambiar datos cuantitativos, eliminar componentes, sugerir nuevas tecnologías o modificar la lógica de arquitectura elegida.
- **Instrucciones de Estilo**: Preservar el tono profesional, activo y de arquitecto redactor.

---

## Entregable
Guarda la respuesta técnica completa en `../outputs/output2.md`.
