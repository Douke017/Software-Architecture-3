# Hito 3: Reflexión sobre el uso de IA y Documentación de Prompts

Como Principal Software & Enterprise Architect, presento una reflexión metacognitiva sobre la ingeniería de prompts y su impacto en la calidad y precisión de las respuestas arquitectónicas generadas.

---

## 3.1 Documentación y Análisis del Prompt Más Efectivo

La efectividad de las respuestas del modelo se ha logrado mediante una arquitectura de prompt modular y jerárquica, diseñada para inyectar contexto y directivas de manera precisa y controlada. Esta estructura emula un `prompt_builder.js` que ensambla dinámicamente el prompt final en memoria.

### 3.1.1 Transcripción de la Arquitectura de Prompt Ensamblada

La arquitectura de prompt se compone de los siguientes módulos, inyectados secuencialmente para construir un contexto completo y coherente:

-   **`SYSTEM ROLE DIRECTIVES` (`role.md`)**:
    -   **Propósito**: Establece la persona del "Principal Software & Enterprise Architect", su mentalidad (Microservicios, DDD, FDIR, Database-per-Service) y las restricciones absolutas de estilo y nivel de abstracción (cero código de aplicación, formato estructurado).
    -   **Impacto**: Define el "quién" y el "cómo" general de la respuesta, asegurando un tono y enfoque consistentes.

-   **`GENERAL MICROSERVICES & DDD ARCHITECTURAL FRAMEWORK` (`architecture_framework.md`)**:
    -   **Propósito**: Proporciona el marco metodológico fundamental para la descomposición estratégica (Bounded Contexts, Database-per-Service), la estrategia de comunicación (Síncrona vs. Asíncrona, EDA, Sagas, Outbox/CDC) y el aislamiento de fallas (FDIR).
    -   **Impacto**: Guía la lógica de descomposición y diseño, asegurando la aplicación de patrones arquitectónicos modernos y robustos.

-   **`PLANTUML SYNTAX & BEST PRACTICES STANDARDS` (`plantuml_guide.md`)**:
    -   **Propósito**: Inyecta reglas sintácticas estrictas y patrones de diseño visual para la generación de diagramas PlantUML, incluyendo restricciones sobre estereotipos, flechas, declaración de componentes y alias.
    -   **Impacto**: Garantiza la generación de diagramas 100% parseables y visualmente coherentes, eliminando errores de sintaxis comunes.

-   **`MARKDOWN FORMATTING STANDARDS` (`markdown_guide.md`)**:
    -   **Propósito**: Define las reglas de formato Markdown para encabezados, listas, negritas y tablas, así como la reiteración de la prohibición de código de aplicación.
    -   **Impacto**: Asegura una presentación uniforme, legible y profesional de los informes técnicos.

-   **`SPECIALIZED GUIDES` (ej. `eda_patterns_guide.md`, `domain_driven_design_guide.md`, `resilience_patterns_guide.md`)**:
    -   **Propósito**: Proporcionan referencias técnicas avanzadas y detalladas sobre patrones específicos (Transactional Outbox, Sagas, CQRS, Bounded Contexts, Circuit Breaker, Bulkhead, Rate Limiting).
    -   **Impacto**: Enriquece la profundidad técnica de las explicaciones, permitiendo al modelo razonar con un vocabulario y conocimiento de nivel sénior sobre patrones complejos.

-   **`BUSINESS & TECHNICAL CONTEXT` (`problem_description.md`)**:
    -   **Propósito**: Describe el problema específico a resolver, en este caso, el monolito "BookSphere" y sus funcionalidades.
    -   **Impacto**: Proporciona el "qué" del problema, permitiendo al modelo aplicar todas las directivas y marcos anteriores al contexto real.

### 3.1.2 Justificación de su Efectividad

Esta arquitectura de prompt modular es altamente efectiva por varias razones clave:

-   **Aislamiento de Preocupaciones (Separation of Concerns)**: Cada módulo aborda un aspecto específico (rol, metodología, sintaxis, formato, patrones, contexto). Esto evita la sobrecarga cognitiva del modelo con un único bloque de texto masivo y permite una referencia más precisa a la información relevante en cada etapa de la generación.
-   **Control Granular y Flexibilidad**: Permite activar o desactivar módulos según la fase del proyecto o el tipo de entregable. Por ejemplo, los estándares de requerimientos NASA/IBM (`requirements_standards.md`) se inyectan solo cuando es pertinente, evitando "alucinaciones" en otros contextos.
-   **Reducción de Ambigüedad**: Al tener directivas explícitas para cada aspecto (ej. sintaxis PlantUML), se minimiza la interpretación errónea por parte del modelo. Las reglas son claras y no dejan espacio a la ambigüedad.
-   **Refuerzo de Restricciones**: La repetición de restricciones clave (ej. "cero código de aplicación") en múltiples módulos (rol, formato) refuerza su cumplimiento, haciendo que el modelo sea menos propenso a desviarse.
-   **Profundidad y Precisión Técnica**: La inyección de guías especializadas eleva el nivel de detalle y la corrección técnica de las explicaciones, permitiendo al modelo generar análisis y diseños que reflejan un conocimiento arquitectónico avanzado.
-   **Consistencia y Estructura**: La combinación de directivas de rol, marco metodológico y estándares de formato asegura que cada respuesta no solo sea técnicamente correcta, sino también consistentemente estructurada y presentada.

Esta aproximación ha sido fundamental para evitar la generación de código irrelevante, garantizar diagramas PlantUML 100% parseables y estructurar explicaciones de nivel sénior, transformando al modelo en un asistente arquitectónico altamente competente.

---

## 3.2 Iteración, Depuración y Refinamiento de Prompts

La mejora continua de la calidad de las respuestas ha requerido un proceso iterativo de depuración y refinamiento de los prompts y el contexto inyectado. A continuación, se documentan 3 casos de estudio reales:

### 3.2.1 Caso 1: Contaminación de Requerimientos Formales NASA/IBM en Hitos de Análisis (Isolation Failure)

-   **Falla Inicial**: En las primeras iteraciones, el modelo tendía a generar listas de requerimientos funcionales y no funcionales (`[FR-001]`, `[NFR-001]`) en hitos que estaban enfocados en el diagnóstico monolítico o la descomposición arquitectónica, no en la ingeniería de requerimientos formal. Esto ocurría porque la guía `requirements_standards.md` se inyectaba globalmente.
    -   **Causa Raíz**: La inyección indiscriminada de directivas de requerimientos formales, aunque valiosas, generaba ruido y desviaba el enfoque del modelo en contextos donde no eran pertinentes. El modelo interpretaba la presencia de la directiva como una instrucción para aplicarla siempre.
-   **Modificación Aplicada**: Se implementó un mecanismo de **aislamiento condicional** en el `prompt_builder.js` (conceptual) para inyectar `requirements_standards.md` únicamente en los hitos o fases del proyecto explícitamente dedicados a la ingeniería de requerimientos. Para hitos de análisis o diseño arquitectónico, esta guía se omitía.
-   **Resultado**: Las respuestas se volvieron limpias y enfáticas en el análisis arquitectónico, la descomposición en Bounded Contexts y la aplicación de patrones de microservicios, sin la inclusión de listas de requerimientos formales que no correspondían al objetivo del hito. Esto mejoró la coherencia contextual y la relevancia de la información generada.

### 3.2.2 Caso 2: Errores de Sintaxis en Diagramas PlantUML (`Syntax Error Assumed Diagram Type: Component`)

-   **Falla Inicial**: El modelo generaba consistentemente errores de sintaxis en los diagramas PlantUML, lo que impedía su renderizado. Los problemas comunes incluían:
    -   Estereotipos con espacios internos (ej. `<<External Partner>>` en lugar de `<<ExternalPartner>>`).
    -   Uso de flechas no soportadas (ej. `A <--> B` en lugar de `A <-> B`).
    -   Uso de la palabra clave `actor` en diagramas de componentes, lo que confundía al parser de PlantUML sobre el tipo de diagrama.
    -   Nombres de componentes con espacios sin comillas o alias.
    -   Falta de cierre `@enduml`.
    -   **Causa Raíz**: Aunque se le pedía generar PlantUML, el modelo carecía de un conjunto de reglas sintácticas explícitas y estrictas para evitar estas trampas comunes del parser. Su conocimiento general de PlantUML no era lo suficientemente preciso para la generación sin errores.
-   **Modificación Aplicada**: Se creó y se inyectó la guía `plantuml_guide.md` con **reglas imperativas anti-errores**. Esta guía especificaba explícitamente:
    -   Estereotipos de una sola palabra (ej. `<<MobileClient>>`).
    -   Lista de flechas estándar válidas (ej. `-->`, `<->`).
    -   Uso de `rectangle "Cliente / Usuario" as User` o `component "Cliente" as User <<User>>` para clientes en diagramas de componentes, prohibiendo `actor`.
    -   Uso obligatorio de alias y comillas para componentes con espacios (ej. `component "API Gateway" as APIGW`).
    -   Cierre obligatorio con `@enduml`.
-   **Resultado**: Los diagramas PlantUML generados se volvieron 100% parseables en el primer intento, eliminando la necesidad de correcciones manuales y mejorando significativamente la utilidad de los entregables visuales.

### 3.2.3 Caso 3: Vaguedad en la Deconstrucción de Microservicios e Interfaces de API

-   **Falla Inicial**: Las primeras respuestas del modelo sobre la descomposición de monolitos eran superficiales. Proponía microservicios con descripciones genéricas y endpoints de API poco detallados, sin especificar verbos HTTP, URIs de recursos claros, o el patrón *Database-per-Service*. Las explicaciones sobre la persistencia eran vagas o sugerían bases de datos compartidas.
    -   **Causa Raíz**: La falta de directivas explícitas sobre la profundidad y el formato esperado para la deconstrucción de microservicios y la definición de APIs. El modelo operaba con un entendimiento general de "microservicios" pero sin la rigurosidad del Domain-Driven Design y la gestión de datos descentralizada.
-   **Modificación Aplicada**: Se incluyó `domain_driven_design_guide.md` y se reforzó la sección de "Gestión de Datos Descentralizada (Database-per-Service)" en `architecture_framework.md`. Se exigió la presentación de la deconstrucción en **tablas estructuradas** que detallaran para cada Bounded Context/Microservicio:
    -   **Responsabilidad**: Descripción unívoca de la capacidad de negocio.
    -   **APIs Expuestas**: Verbos HTTP, URIs de recursos, ejemplos de payloads (lógicos, no código).
    -   **Persistencia**: Tipo de base de datos (ej. PostgreSQL, MongoDB) y justificación del patrón *Database-per-Service*.
    -   **Eventos de Dominio**: Ejemplos de eventos publicados/consumidos.
-   **Resultado**: La deconstrucción se volvió profunda y formal, alineada a estándares industriales. El modelo ahora genera propuestas de microservicios con límites de contexto claros, APIs bien definidas como contratos estables y una estrategia de persistencia descentralizada explícita, demostrando un razonamiento arquitectónico de alto nivel.