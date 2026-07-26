# Hito 1: Análisis de Rendimiento del Sistema

Buscaremos comprender las limitaciones de una arquitectura monolítica bajo alta carga y definir cómo medir y escalar el sistema.

Para ello vamos a identificar:

- Cuellos de botella típicos en una arquitectura monolítica (situándonos en el sistema de flash sales)
- Base de datos central
- Manejo sincrónico de pedidos
- Escalado vertical
- Dependencias fuertes entre módulos

Definir métricas clave de rendimiento, incluyendo al menos:

- Latencia (p95 / p99)
- Throughput (req/s)
- Uso de CPU y memoria
- Tasa de errores
- Backpressure

Diseñar una estrategia de escalado, indicando:

- Qué componentes escalan horizontalmente
- Qué componentes requieren particionado o replicación

Investigar frameworks y herramientas de monitoreo de performance (al menos 3), incluyendo Open-Source y Comerciales

Para cada herramienta indicar: Tipo (APM, métricas, logs, trazas), Ventajas principales, Costo (si está disponible)

Ayudo con ejemplos: Prometheus, Grafana, ELK, OpenSearch, Datadog, New Relic, Dynatrace

## Los entregables:

- Documento breve: empiecen el informe, esta parte con 2 o 3 planas.
- Lista de cuellos de botella
- Tabla de métricas clave
- Estrategia de escalado
- Tabla comparativa de herramientas de monitoreo