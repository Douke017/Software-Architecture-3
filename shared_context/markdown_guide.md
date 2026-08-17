# Guía Estándar de Formato Markdown (Strict Compact Table & Clean Typography Standard)

Esta guía define las reglas de sintaxis imperativas para garantizar que todas las tablas y secciones de Markdown rendericen **100% parseables, limpias y sin roturas**.

---

## 1. Reglas Estrictas para Tablas Markdown (Celdas Concisas Ultra-Limpias)

1. **LONGITUD MÁXIMA DE CELDA (MÁXIMO 10 A 15 PALABRAS)**:
   - Toda celda de tabla DEBE ser breve y directa (1 oración concisa).
   - **INCORRECTO**: Párrafos largos de 4 oraciones dentro de una celda que expanden la columna horizontalmente y rompen la tabla.
   - **CORRECTO**: "Gestiona registro, autenticación y perfil del comprador."

2. **FILAS DE UNA SOLA LÍNEA DE CÓDIGO**: Toda fila de tabla DEBE ser una sola línea sin saltos de línea (`ENTER`) internos.

3. **DELIMITADORES DE COLUMNA**: Toda fila DEBE comenzar y terminar con `|`.

4. **PROHIBIDO EL CARÁCTER PIPE '|' DENTRO DEL TEXTO**: Usa la entidad HTML `&#124;` o refrasea.

5. **PROHIBIDO BLOQUES DE CÓDIGO O NOTAS INTERNAS**: Sin ` ``` ` ni citas `>` dentro de celdas.

---

## 2. Reglas de Numeración Estándar (Inicio en Sección 1)

1. **NUMERACIÓN DESDE 1. (PROHIBIDO EMPEZAR EN 0.)**:
   - `1. Contexto y Dominio del Negocio QuickCart`
   - `2. Microservicios Candidatos`
   - `3. Decisiones Discutibles y Justificación`
   - `4. Explicación en Profundidad de Límites de Servicio`
   - `5. Análisis de Anti-Patrones y Evaluación de Riesgos`
   - `6. Lista de Verificación (Checklist)`
