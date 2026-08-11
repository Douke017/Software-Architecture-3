# Context Engineering Prompt - Informe Final Sintético de Arquitectura (Week 4: report.md)

## Contexto de Referencia
Asimila las directrices del rol en `../context/role.md`, el marco de microservicios en `../context/architecture_framework.md`, las reglas visuales en `../context/markdown_guide.md`, la guía de diagramación en `../context/plantuml_guide.md`, y la descripción del escenario en `../context/problem_description.md`.
Consolida los análisis y hallazgos desarrollados en los hitos de la Semana 4.

---

## Directivas Arquitectónicas para el Modelo

Actúa como **Principal Software & Enterprise Architect** y elabora un **Documento de Diseño Arquitectónico Consolidado** para **GlobalNewsFeed** (guardado como `report.md`).

---

### Ejes de Análisis y Secciones Requeridas

#### 1. Planteamiento del Problema
- Un resumen ejecutivo conciso del escenario **"Análisis de Hashtags en Tendencia"** para la plataforma de redes sociales GlobalNewsFeed.
- Explicación del riesgo operacional crítico de la **Contrapresión (Backpressure)** cuando la ingesta masiva de publicaciones supera la capacidad de procesamiento de los consumidores en eventos de alto impacto global.

#### 2. Tabla de Comparación Arquitectónica
Presenta una **Tabla Comparativa Sintética** evaluando al menos 5 enfoques arquitectónicos alternativos para la contrapresión y el procesamiento de flujos:
1. **Colas de Mensajes Finitas / Buffering** (Apache Kafka / RabbitMQ).
2. **Procesadores de Flujos en Tiempo Real** (Apache Flink / Kafka Streams).
3. **Arquitectura Orientada a Eventos (EDA)** (Desacoplamiento Pub/Sub con Consumer Groups).
4. **Patrón CQRS (Command Query Responsibility Segregation)** (Separación de comandos de escritura e ingesta frente a consultas de tendencias).
5. **Procesadores de Trabajos por Lotes / Workers** (Background Worker Job Processors).

Para cada enfoque, la tabla o análisis estructurado debe incluir:
- **Mecanismo de Manejo de Contrapresión**.
- **Ventajas Principales**.
- **Desventajas / Riesgos**.
- **Idoneidad para GlobalNewsFeed**.

#### 3. Diseño Recomendado y Justificación Técnico-Arquitectónica
- **Recomendación Principal**: Define la solución objetivo (ej. Patrón Híbrido: Ingress API Gateway con Load Shedding + Event Stream Buffer Apache Kafka + Procesador de Flujos Flink en Ventanas Deslizantes + Redis Cluster Cache).
- **Justificación Técnica**: Explica por qué es la mejor opción para amortiguar picos de carga, mantener baja latencia y garantizar resiliencia.
- **Diagramación Visual en PlantUML (Estricto sin ASCII Art)**:
  - Genera un **Diagrama de Componentes unificado en PlantUML** (` ```plantuml @startuml ... @enduml `) respetando `plantuml_guide.md` (estereotipos en una palabra sin espacios como `<<EventStream>>`, `<<StreamProcessor>>`, `rectangle` para usuarios, flechas válidas).

#### 4. Documentación Step-by-Step del Flujo de Trabajo y Conclusiones
- **Documentación Paso a Paso**: Detalla la secuencia de ejecución desde la publicación del post en el cliente, la ingesta en el gateway, la retención en el broker, la agregación en ventanas temporales, el control de contrapresión y la actualización del ranking en Redis.
- **Conclusiones Finales**: Síntesis sobre lecciones aprendidas en la gestión de contrapresión, escalabilidad horizontal y resiliencia en sistemas distribuidos de gran escala.

---

## Entregables
Guarda la respuesta técnica consolidada en `../report.md` (y `../outputs/report.md`).
