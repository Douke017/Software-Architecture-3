# Guía Estándar de Ingeniería de Requerimientos (NASA & IBM Standards)

Esta guía sintetiza los estándares oficiales de la **NASA** (NASA Systems Engineering Handbook SP-2016-6105 Rev2 - *Appendix C: How to Write a Good Requirement*) y las directrices de **IBM DOORS** (*Get It Right The First Time*) para la formulación de requerimientos de software de nivel industrial y aeroespacial.

---

## 1. Características Obligatorias de un Buen Requerimiento

Todo requerimiento formulado para el sistema debe cumplir estrictamente con las 6 propiedades fundamentales:

1. **Necesario (Necessary)**: Define una capacidad, calidad o restricción esencial sin la cual el sistema no alcanzará sus objetivos de negocio o de servicio.
2. **Singular / Atómico (Singular/Atomic)**: Contiene **una sola afirmación o capacidad verificable**. Evita el uso de conjunciones complejas ("y", "o", "además de") que agrupen múltiples requisitos en una sola oración.
3. **Libre de Implementación (Implementation-Free)**: Especifica **QUÉ** debe lograr el sistema (capacidad o calidad), **NO CÓMO** implementarlo a nivel de código o tecnología específica.
4. **Claro y Sin Ambigüedades (Clear & Unambiguous)**: Expresado en lenguaje conciso con una única interpretación posible por parte de arquitectos, desarrolladores y evaluadores.
5. **Verificable (Verifiable)**: Debe existir un método empírico de verificación bien definido:
   - **Inspección (Inspection)**: Revisión de arquitectura o configuración.
   - **Análisis (Analysis)**: Modelado, simulación o cálculo teórico.
   - **Demostración (Demonstration)**: Verificación operacional cualitativa.
   - **Prueba (Test)**: Medición cuantitativa automatizada bajo condiciones controladas.
6. **Completo (Complete)**: Auto-contenido con todas las condiciones de contorno, factores desencadenantes y rangos cuantitativos.

---

## 2. Sintaxis y Reglas Gramaticales Estrictas (Regla del "SHALL")

### A. Estructura Sintáctica del Requerimiento
Cada requerimiento debe redactarse siguiendo la sintaxis estándar de la NASA:
$$\text{[Sujeto/Sistema]} + \text{\textbf{shall}} + \text{[Acción/Capacidad]} + \text{[Condición/Restricción Quantitative]}$$

- **`shall` (Deberá)**: Se utiliza **única y exclusivamente para requerimientos obligatorios y vinculantes**.
- **`will` (Será/Hará)**: Reservado para declaraciones de hecho, contexto operativo o comportamiento de sistemas externos.
- **`should` (Debería)**: Utilizado para objetivos no vinculantes o metas deseadas de diseño.

### B. Prohibición de Términos Ambiguos (Vague Terms Prohibited - IBM Standards)
Queda estrictamente prohibido utilizar palabras vagas o subjetivas en la redacción de requerimientos. Cada término ambiguo debe ser reemplazado por su métrica cuantitativa:

| Término Prohibido (Vago) | Métrica Cuantitativa Sustituta (Estándar NASA/IBM) |
| :--- | :--- |
| *"El sistema debe ser rápido"* | *"El sistema deberá procesar solicitudes HTTP con una latencia p95 < 200 ms."* |
| *"Debe ser altamente escalable"* | *"El sistema deberá escalar horizontalmente para soportar hasta 10,000 usuarios concurrentes simultáneos."* |
| *"Manejar adecuadamente los errores"* | *"El sistema deberá mantener una tasa de errores HTTP 5xx inferior al 0.1% durante picos de tráfico."* |
| *"Carga de datos eficiente"* | *"El sistema deberá consumir y enrutar eventos con un Throughput mínimo de 3,000 req/s."* |
| *"Interfaz amigable / robusta"* | *"El sistema deberá responder con estado HTTP 202 Accepted en menos de 500 ms ante intentos de compra."* |

---

## 3. Formato Estandarizado de Ficha de Requerimiento (REQ ID)

Cada requerimiento expresado en los informes debe contener la siguiente ficha estructurada:

- **ID Único**: `REQ-[COMPONENTE]-[NÚMERO]` (ej: `REQ-NOTIF-001`, `REQ-PERF-002`).
- **Declaración (Shall Statement)**: En sintaxis NASA.
- **Tipo de Requerimiento**: Funcional (FR), No Funcional / Rendimiento (NFR), Seguridad (SEC), Resiliencia (RES).
- **Criterio de Aceptación Cuantitativo**: Condición medible de éxito.
- **Método de Verificación**: Prueba (Test), Análisis (Analysis), Demostración (Demonstration), Inspección (Inspection).
