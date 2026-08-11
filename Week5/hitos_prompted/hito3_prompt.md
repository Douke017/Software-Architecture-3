# Context Engineering Prompt - Hito 3: Reflexión sobre el uso de IA y Documentación de Prompts (Week 5)

## Contexto de Referencia
Asimila las directrices del rol en `../context/role.md`, el marco metodológico en `../context/architecture_framework.md`, las guías de DDD y resiliencia en `../context/`, la descripción del monolito BookSphere en `../context/problem_description.md` y las guías de formato y diagramación.
La especificación de origen proviene de `../hitos/hito3.md`.

---

## Directivas Arquitectónicas para el Modelo

Actúa como **Principal Software & Enterprise Architect** y elabora un informe de reflexión metacognitiva y documentación técnica de prompts (guardado en `../outputs/output3.md`).

---

### Ejes de Análisis y Entregables Requeridos

#### 3.1 Documentación y Análisis del Prompt Más Efectivo
- **Transcripción de la Arquitectura de Prompt Ensamblada**: Detalla la estructura modular de ensamblaje en memoria (`prompt_builder.js`), que combina:
  - `SYSTEM ROLE DIRECTIVES` (`role.md`)
  - `GENERAL MICROSERVICES & DDD ARCHITECTURAL FRAMEWORK` (`architecture_framework.md`)
  - `PLANTUML SYNTAX & BEST PRACTICES STANDARDS` (`plantuml_guide.md`)
  - `MARKDOWN FORMATTING STANDARDS` (`markdown_guide.md`)
  - `SPECIALIZED GUIDES` (`eda_patterns_guide.md`, `domain_driven_design_guide.md`, `resilience_patterns_guide.md`)
  - `BUSINESS & TECHNICAL CONTEXT` (`problem_description.md`)
- **Justificación de su Efectividad**: Explica por qué esta arquitectura de prompt evitó la generación de código irrelevante, garantizó diagramas PlantUML 100% parseables y estructuró explicaciones de nivel sénior.

#### 3.2 Iteración, Depuración y Refinamiento de Prompts (Casos de Estudio con Por Qué y Modificaciones)
Documenta de forma explícita 3 casos reales de fallas en respuestas iniciales del modelo, la causa raíz identificada, la modificación aplicada al prompt/contexto y el resultado refinado:

1. **Caso 1: Contaminación de Requerimientos Formales NASA/IBM en Hitos de Análisis (Isolation Failure)**:
   - *Falla Inicial*: La inyección global de directivas `SHALL` (NASA/IBM) hacía que el modelo alucinara listas de requerimientos `REQ-001` en hitos orientados únicamente a diagnóstico monolítico o descomposición.
   - *Modificación Aplicada*: Aislamiento condicional de `requirements_standards.md` en `prompt_builder.js` para inyectarse únicamente en hitos de ingeniería de requerimientos.
   - *Resultado*: Respuestas limpias y enfáticas en arquitectura sin ruido de requerimientos.

2. **Caso 2: Errores de Sintaxis en Diagramas PlantUML (`Syntax Error Assumed Diagram Type: Component`)**:
   - *Falla Inicial*: El modelo generaba estereotipos con espacios (ej. `<<External Partner>>`), flechas no soportadas (`<-->`) y la palabra clave `actor` al inicio de diagramas de componentes, provocando caídas en el compilador de PlantUML.
   - *Modificación Aplicada*: Creación de `plantuml_guide.md` inyectando reglas imperativas anti-errores (`<<ExternalPartner>>`, `rectangle` para usuarios, flechas válidas `-->`, `<->`).
   - *Resultado*: Diagramas PlantUML 100% parseables en el primer intento.

3. **Caso 3: Vaguedad en la Deconstrucción de Microservicios e Interfaces de API**:
   - *Falla Inicial*: El modelo devolvía definiciones genéricas de microservicios con endpoints superficiales sin verbos HTTP ni esquemas de persistencia descentralizada.
   - *Modificación Aplicada*: Inclusión de `domain_driven_design_guide.md` exigiendo tablas estructuradas con Bounded Context, responsabilidad, verbos HTTP, URIs de recursos y patrón *Database-per-Service*.
   - *Resultado*: Deconstrucción profunda y formal alineada a estándares industriales.

---

## Entregable
Guarda la respuesta técnica completa en `../outputs/output3.md`.
