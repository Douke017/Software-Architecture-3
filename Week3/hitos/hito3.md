# Hito 3 (Parte 3): Integración de Procesamiento de Flujos

Nuestro objetivo ahora es diseñar el procesamiento en tiempo real de eventos críticos del sistema. Para ello tenemos que:

1) Identificar y formular en statements los requerimientos de procesamiento en tiempo real, como detección de fraude, actualización de inventario, recomendaciones personalizadas, alertas operativas.

Oración imperativa. NUNCA ES UNA SUGERENCIA. 

[Tal o cual cosa / responsable] DEBERÁ [tal o cual cosa] CON LAS CARACTERISTICAS [tal o cual caracteristica]

2) Diseñar pipelines de procesamiento para análisis en tiempo real. Identificar: Fuente de eventos, Procesadores de flujo, Salidas o sinks.

3) Definir garantías de consistencia y ordenamiento: At-least-once vs exactly-once, Manejo de eventos fuera de orden, Estado y ventanas temporales.

4) Investigar brevemente tecnologías PaaS o SaaS para procesamiento de flujos de datos, por ejemplo: Kafka Streams, Apache Flink, Spark Structured Streaming.