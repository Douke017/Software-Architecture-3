# Guía Estándar de Formato Markdown y Presentación Visual (Week 4)

Esta guía establece las mejores prácticas de presentación para generar documentos técnicos limpios, legibles y bien estructurados.

---

## 1. Reglas de Presentación de Tablas Markdown

1. **Tablas Compactas y Directas**:
   - Cada celda debe ser concisa (frases cortas, sin párrafos dentro de celdas).
   - Formato estándar de tabla Markdown:
     ```markdown
     | Columna 1 | Columna 2 | Columna 3 |
     | :--- | :--- | :--- |
     | Dato 1 | Dato 2 | Dato 3 |
     ```
2. **Formato Alternativo cuando la información es extensa**:
   - Si una comparación requiere descripciones largas o múltiples líneas, utiliza secciones analíticas con viñetas en negrita en lugar de tablas anchas:
     ```markdown
     ### Nombre del Elemento
     - **Categoría**: Descripción concisa.
     - **Ventajas**: Punto clave 1, punto clave 2.
     - **Costo**: Modelo de precios.
     ```

---

## 2. Estructura General del Documento

1. **Jerarquía Clara de Encabezados**: Usa `#` para el título general, `##` para secciones principales y `###` para subsecciones.
2. **Espaciado Limpio**: Un solo salto de línea entre párrafos e ítems de lista. Sin espacios de relleno (*padding whitespace*).
