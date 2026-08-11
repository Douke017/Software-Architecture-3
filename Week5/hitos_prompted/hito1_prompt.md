# Context Engineering Prompt - Hito 1 (Week 5)

## Contexto de Referencia
Asimila las directrices del rol en `../context/role.md`, el marco metodológico en `../context/architecture_framework.md`, la descripción del monolito BookSphere en `../context/problem_description.md` y los estándares en `../context/plantuml_guide.md` y `../context/markdown_guide.md`.
La especificación de origen proviene de `../hitos/hito1.md`.

---

## Directivas Arquitectónicas para el Modelo

Analiza y desarrolla la solución técnica de arquitectura a alto nivel para el **Hito 1** según la especificación:

# Hito 1: Comprensión Conceptual y Análisis del Monolito BookSphere

Nos aseguraremos de comprender los principios conceptuales fundamentales de la Arquitectura de Microservicios y efectuar un diagnóstico crítico profundo de la aplicación monolítica "BookSphere" antes de proponer cualquier refactorización.

---

## 1.1 Investigación de Conceptos Clave de Arquitectura de Microservicios

Desarrollar definiciones rigurosas, analíticas y estratégicas (utilizando analogías de ingeniería, comparaciones estructuradas y ejemplos en sistemas distribuidos reales) para los siguientes 6 pilares:

1. **Principio de Responsabilidad Única (SRP)**:
   - Definición formal y análisis de su relación directa con los principios S.O.L.I.D. (específicamente la 'S' a nivel de clase, módulo y microservicio).
   - Por qué una clase o servicio debe tener "una sola razón para cambiar" y cómo esto evita efectos secundarios no deseados.
2. **Acoplamiento Débil (*Loose Coupling*) vs. Acoplamiento Fuerte (*Tight Coupling*)**:
   - Grado de dependencia entre componentes y conocimiento de los detalles internos de implementación.
   - Mecanismos de propagación de fallas en cascada (*Cascading Failures*) cuando existe acoplamiento fuerte en memoria o en base de datos.
3. **APIs como Contratos Estables (*APIs as Stable Contracts*)**:
   - Qué significa tratar a una API como un contrato inmutable o versionado semánticamente.
   - Principio de Tolerancia (*Robustness Principle / Postel's Law*) y desacoplamiento de la evolución interna del servicio respecto a sus consumidores.
4. **Comunicación Síncrona vs. Asíncrona entre Servicios**:
   - Análisis comparativo entre modelo Request-Response bloquante (HTTP/REST, gRPC) y comunicación Guiada por Eventos / Mensajería (Pub/Sub, Event Bus).
   - Latencia acumulativa, acoplamiento temporal y tolerancia a caídas parciales en ambos esquemas.
5. **Gestión de Datos Descentralizada (*Database-per-Service*)**:
   - Justificación de por qué la gestión de datos descentralizada es la extensión directa del principio SRP (la 'S' de SOLID) a la capa de persistencia.
   - Problemas de las bases de datos compartidas (contención de bloqueos, acoplamiento de esquemas, falta de autonomía de despliegue).
6. **Aislamiento de Fallas y Marco FDIR (*Fault Detection, Isolation, and Recovery*)**:
   - Significado profundo de FDIR en arquitectura de sistemas distribuidos y críticos.
   - Estrategias concretas para cada fase: Detección (Healthchecks/Metrics), Aislamiento (*Bulkheads/Circuit Breakers*), y Recuperación (Auto-healing/Sagas compensatorias).

---

## 1.2 Análisis Crítico del Monolito BookSphere

Analizar el monolito "BookSphere" (7 módulos: Usuarios, Catálogo, Carrito, Pedidos, Pagos, Recomendaciones, Reseñas; sobre una única base de datos PostgreSQL) como un sistema real en crecimiento bajo alta carga:

1. **Identificación de al menos 2 Desafíos Críticos de Escalabilidad o Mantenimiento**:
   - **Desafío 1**: Analizar un escenario realista de **Cuello de Botella y Contención en la Base de Datos Relacional Compartida** (ej. cómo las consultas pesadas del Motor de Recomendaciones y las escrituras masivas de Reseñas afectan negativamente el procesamiento de Pedidos y Pagos).
   - **Desafío 2**: Analizar un escenario realista de **Riesgo de Fallas Globales y Degradación de UX (Blast Radius masivo)** (ej. cómo una falla en un servicio no crítico como Reseñas o Pasarela de Pagos de terceros bloqueante detiene todo el proceso monolítico y el registro/catálogo de usuarios).
2. **Impacto en el Negocio y Operación**:
   - Dificultades de despliegue ("todo o nada"), bloqueo tecnológico y fricción en el equipo de desarrollo.
3. **Diagramación de Arquitectura de la Problemática**:
   - Incluir un diagrama PlantUML de la arquitectura actual del monolito BookSphere destacando los módulos, la base de datos compartida y la propagación de fallas.

---

## Entregables Esperados:
- Documento técnico analítico exhaustivo guardado en `../outputs/output1.md`.
- Diagrama PlantUML parseable y sin errores de sintaxis integrando la arquitectura monolítica actual y la propagación de fallas.


---

## Entregable
Guarda la respuesta en `../outputs/output1.md`.
