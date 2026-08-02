# Guía Estándar de Ingeniería de Requerimientos (NASA & IBM Standards - Week 4)

Esta guía sintetiza los estándares oficiales de la **NASA** (NASA Systems Engineering Handbook SP-2016-6105 Rev2 - *Appendix C: How to Write a Good Requirement*) y las directrices de **IBM DOORS** (*Get It Right The First Time*) para la formulación de requerimientos de software de nivel industrial.

---

## 1. Características Obligatorias de un Buen Requerimiento

Todo requerimiento formulado para el sistema debe cumplir estrictamente con las 6 propiedades fundamentales:

1. **Necesario (Necessary)**: Define una capacidad, calidad o restricción esencial.
2. **Singular / Atómico (Singular/Atomic)**: Contiene **una sola afirmación o capacidad verificable**. Evita conjunciones complejas ("y", "o").
3. **Libre de Implementación (Implementation-Free)**: Especifica **QUÉ** debe lograr el sistema, **NO CÓMO** implementarlo a nivel de código.
4. **Claro y Sin Ambigüedades (Clear & Unambiguous)**: Expresado en lenguaje conciso con una única interpretación.
5. **Verificable (Verifiable)**: Vía Inspección, Análisis, Demostración o Prueba (Test).
6. **Completo (Complete)**: Auto-contenido con condiciones de contorno y rangos cuantitativos.

---

## 2. Sintaxis y Reglas Gramaticales Estrictas (Regla del "SHALL")

$$\text{[Sujeto/Sistema]} + \text{\textbf{DEBERÁ (SHALL)}} + \text{[Acción/Capacidad]} + \text{[Condición/Métrica Cuantitativa]}$$

- **`shall` (Deberá)**: Se utiliza **única y exclusivamente para requerimientos obligatorios y vinculantes**.
- **`will` (Será/Hará)**: Declaraciones de hecho o contexto.
- **`should` (Debería)**: Metas no vinculantes.

### Prohibición de Términos Ambiguos (Vague Terms Prohibited - IBM Standards)
Queda estrictamente prohibido utilizar palabras vagas (*"rápido"*, *"eficiente"*, *"adecuado"*, *"robusto"*). Reemplazar siempre por métricas cuantitativas explícitas (ej: `latencia p95 < 200 ms`, `throughput > 5,000 req/s`).
