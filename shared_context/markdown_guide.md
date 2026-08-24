# Guía Maestra de Formato Markdown (Master Markdown Formatting Standard)

Esta guía establece los estándares de formato y tipografía Markdown para garantizar informes de arquitectura técnica de nivel ejecutivo, limpios, legibles y 100% libres de deformaciones o truncamientos.

---

## 1. Reglas Estrictas para Tablas Markdown (Uso Correcto vs. Viñetas)

1. **PROPÓSITO EXCLUSIVO DE LAS TABLAS (DATOS TABULARES BREVES)**:
   - Las tablas Markdown son ÚNICAMENTE para matrices comparativas breves (máximo **8 a 10 palabras por celda**).
   - **CORRECTO**:
     | Microservicio | Base de Datos | Patrón de Consistencia |
     | :--- | :--- | :--- |
     | `Order Service` | PostgreSQL | ACID Local |
     | `Cart Service` | Redis | Consistencia Eventual |

2. **PROHIBIDO PÁRRAFOS EXPLICATIVOS DENTRO DE CELDAS DE TABLA**:
   - NUNCA redactes párrafos, justificaciones largas, configuraciones de timeouts o descripciones de 30 palabras dentro de una celda de tabla. Esto expande la columna a miles de píxeles y corrompe el renderizado en visores Markdown.
   - **Si una sección requiere análisis profundo (ej. Justificación de Circuit Breakers, Políticas de Resiliencia, Decisiones de Trade-Off), REDÁCTALA EN VIÑETAS (BULLET POINTS) Y SUB-SECCIONES MARKDOWN**, no dentro de una tabla.

3. **FILAS DE UNA SOLA LÍNEA DE CÓDIGO**:
   - Cada fila de tabla DEBE ser una sola línea física de código sin saltos de línea (`ENTER`) internos. Toda fila debe comenzar y terminar con el delimitador `|`.

4. **PROHIBIDO EL CARÁCTER PIPE '|' DENTRO DEL TEXTO**:
   - NUNCA uses `|` dentro del texto de una celda. Usa guiones `-`, barras `/` o la entidad HTML `&#124;`.

---

## 2. Reglas de Numeración y Estructura de Documento

1. **NUMERACIÓN DESDE LA SECCIÓN 1 (PROHIBIDO INICIAR EN 0)**:
   - Todo informe técnico formal debe comenzar en `1.` (e.g. `1. Contexto del Dominio y Descomposición Estratégica`).

2. **JERARQUÍA CLARA DE ENCABEZADOS**:
   - `# Título Principal del Informe`
   - `## 1. Sección de Nivel 1`
   - `### 1.1. Sub-sección de Nivel 2`
   - `#### 1.1.1. Detalle de Nivel 3`

3. **BLOQUES DE CÓDIGO LIMPIOS**:
   - Todo bloque de código o diagrama DEBE abrirse y cerrarse con triples comillas invertidas indicando el lenguaje:
     ```plantuml
     @startuml
     ...
     @enduml
     ```
