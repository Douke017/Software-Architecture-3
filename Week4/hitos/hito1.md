# Hito 1: Exploración y Aprendizaje - Contrapresión y Procesos de Larga Duración

Nos aseguraremos de comprender el problema, el contexto arquitectónico y las estrategias posibles antes de diseñar una solución.

---

## 1.1 Análisis del Escenario
Identificar y analizar:
- Qué partes del sistema actúan como productores y cuáles como consumidores.
- Por qué el análisis de hashtags es un proceso de larga duración.
- En qué situaciones concretas aparece o debería aparecer la contrapresión (picos de tráfico, eventos globales).
- Recomendar reformulaciones estratégicas, analogías y ejemplos comparativos en sistemas reales (ej. Twitter/X, Netflix, streaming de sensores).

---

## 1.2 Investigación de Conceptos Clave
Generar definiciones claras, intuitivas y rigurosas (usando analogías, comparaciones cotidianas y contraejemplos) para:
- **Procesos de Larga Duración** (*Long-Running Processes*)
- **Productores y Consumidores** (*Producers & Consumers*)
- **Contrapresión** (*Backpressure*)
- **Colas, Buffers y Desacoplamiento** (*Queues, Buffers & Decoupling*)
- **Procesamiento Síncrono vs. Asíncrono** (*Sync vs. Async Processing*)

---

## 1.3 Exploración de Estrategias Arquitectónicas para Manejo de Contrapresión
Investigar y comparar las alternativas arquitectónicas para manejar desequilibrios de carga:
- Uso de Colas de Mensajes / Event Streams (Buffers con capacidad finita/infinita).
- Escalado Horizontal de Consumidores (Auto-scaling & Consumer Groups).
- Limitación de la Tasa de Entrada (Rate Limiting, Load Shedding, Throttling).
- Degradación Controlada del Servicio (Graceful Degradation, Sampling, Lossy Processing).
- Señales de Contrapresión Reactiva (Reactive Streams, Pull-based Flow Control).

---

## Entregables Esperados:
- Documento técnico analítico (2-3 páginas) respondiendo los puntos 1.1, 1.2 y 1.3.
- Diagrama PlantUML del flujo de ingesta y contrapresión sin errores de sintaxis.
