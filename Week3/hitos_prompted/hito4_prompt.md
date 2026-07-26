# Context Engineering Prompt - Hito 4

## Contexto de Referencia
Asimila las directrices del rol en `../context/role.md`, la descripción en `../context/problem_description.md` y los estándares en `../context/plantuml_guide.md` y `../context/markdown_guide.md`.
La especificación de origen proviene de `../hitos/hito4.md`.

---

## Directivas Arquitectónicas para el Modelo

Analiza y desarrolla la solución técnica de arquitectura a alto nivel para el **Hito 4** según la especificación:

# Hito 4 (Parte 4): Síntesis de Arquitectura

Simplemente integrar todas las decisiones en una arquitectura coherente y justificar los compromisos asumidos. La idea es tener una o dos carillas máximo en el informe con el diagrama final y unos buenos statements de cierre.

Que voy a buscar:

Tener un diagrama de arquitectura integral, que incluya: Frontend, nuestros Servicios desacoplados, Broker(s) de mensajes, Procesadores de flujo, Almacenamiento, Monitoreo

Corroborar una correcta documentación de decisiones clave, por ejemplo: 

- ¿Por qué EDA en lugar de REST sincrónico? 
- Trade-offs entre consistencia y latencia, Impacto en complejidad operativa
- Relacionar la arquitectura con los requerimientos elaborados: Escalabilidad, Resiliencia, Tiempo real

---

## Entregable
Guarda la respuesta en `../outputs/output4.md`.
