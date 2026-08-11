# Context Engineering Prompt - Hito 2 (Week 5)

## Contexto de Referencia
Asimila las directrices del rol en `../context/role.md`, el marco metodológico en `../context/architecture_framework.md`, la descripción del monolito BookSphere en `../context/problem_description.md` y los estándares en `../context/plantuml_guide.md` y `../context/markdown_guide.md`.
La especificación de origen proviene de `../hitos/hito2.md`.

---

## Directivas Arquitectónicas para el Modelo

Analiza y desarrolla la solución técnica de arquitectura a alto nivel para el **Hito 2** según la especificación:

# Hito 2: Rediseño Arquitectónico en Microservicios (BookSphere)

Pasaremos del diagnóstico monolítico al diseño de una Arquitectura de Microservicios (MSA) desacoplada, coherente y altamente escalable para la plataforma "BookSphere", aplicando los principios de Domain-Driven Design (DDD).

---

## 2.1 Identificación y Deconstrucción de Microservicios

Deconstruir la aplicación monolítica BookSphere en microservicios autónomos alineados estrictamente a sus capacidades de negocio (*Bounded Contexts*).

Para cada microservicio propuesto (mínimo 5, recomendados los 7 dominios centrales de BookSphere):

1. **Nombre del Servicio** (ej. `User & Identity Service`, `Catalog & Inventory Service`, etc.).
2. **Bounded Context & Responsabilidad Principal**:
   - Delimitación clara del dominio de negocio.
   - Qué datos posee de forma exclusiva y qué decisiones opera.
3. **Ejemplos de Endpoints de API**:
   - Definir al menos 3 a 4 endpoints de API representativos (método HTTP, ruta URL orientada a recursos, descripción funcional y parámetros clave).

---

## 2.2 Patrón Database-per-Service y Topología de Datos

- Definir la estrategia de persistencia descentralizada (*Database-per-Service*) para cada microservicio.
- Justificar la selección del motor de almacenamiento óptimo (SQL vs NoSQL vs In-Memory) según la naturaleza de la carga de trabajo de cada servicio.

---

## 2.3 Diagramación de la Arquitectura de Microservicios

- Generar un diagrama PlantUML de componentes parseable (`@startuml ... @enduml`) que muestre la topología de la nueva arquitectura de microservicios:
  - Capa de Entrada: Clientes (Web/Mobile), API Gateway / BFF.
  - Capa de Microservicios Autónomos.
  - Almacenes de Datos Independientes (*Database-per-Service*).

---

## Entregable Esperado:
- Documento técnico guardado en `../outputs/output2.md`.
- Diagrama PlantUML parseable sin errores de la topología de la nueva arquitectura en microservicios.


---

## Entregable
Guarda la respuesta en `../outputs/output2.md`.
