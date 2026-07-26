# Context Engineering Prompt - Hito 1: Análisis de Rendimiento del Sistema

## Contexto de Referencia
Asimila las directrices del rol en `../context/role.md` y la descripción del escenario en `../context/problem_description.md`.
La especificación del hito proviene de `../hitos/hito1.md`.

---

## Directivas Arquitectónicas para el Modelo

Realiza un análisis técnico de la arquitectura monolítica de **FlashSales Inc.** bajo alta carga. Elabora un informe técnico de arquitectura de alto nivel (extensión equivalente a 2-3 páginas).

---

### Ejes de Análisis Requeridos (Estrictos según Hito 1)

#### 1. Diagnóstico de Cuellos de Botella en la Arquitectura Monolítica
Analiza detalladamente las limitaciones del monolito bajo picos de tráfico en los siguientes puntos:
- **Base de Datos Centralizada**: Bloqueos de fila (row locking), contención en pool de conexiones e impacto de I/O de disco.
- **Manejo Sincrónico de Pedidos**: Acoplamiento temporal, encadenamiento de llamadas bloqueantes y agotamiento de hilos (thread pool starvation).
- **Escalado Vertical**: Límites físicos de hardware, costos exponenciales, retornos decrecientes y Punto Único de Falla (SPOF).
- **Dependencias Fuertes entre Módulos**: Falta de aislamiento de fallas y propagación de errores en cascada.

#### 2. Definición y Cuantificación de Métricas Clave de Rendimiento
Presenta una **Tabla de Métricas Clave de Rendimiento** (usando una tabla Markdown limpia con columnas: `| Métrica | Objetivo Cuantitativo | Propósito / Descripción |`) evaluando:
- **Latencia**: percentiles p95 y p99 (explicando por qué la latencia promedio no es suficiente).
- **Throughput**: solicitudes por segundo (req/s) y transacciones por segundo (tps).
- **Uso de CPU y Memoria**: umbrales de alerta y pausados de Garbage Collection.
- **Tasa de Errores**: porcentaje máximo tolerable de respuestas HTTP 5xx y timeouts.
- **Backpressure**: saturación de colas internas y buffers.

#### 3. Estrategia de Escalado
Define la estrategia de escalamiento del sistema indicando:
- **Componentes que escalan horizontalmente**: Capas lógicas sin estado (stateless).
- **Componentes que requieren particionado o replicación**: Estrategia de réplicas de lectura (Read Replicas), sharding o caché distribuido para la base de datos.

#### 4. Tabla Comparativa de Herramientas de Monitoreo de Performance
Investiga al menos 4 herramientas de monitoreo (mezclando Open-Source y Comerciales, ej. Prometheus + Grafana, ELK/OpenSearch, Datadog, Dynatrace/New Relic).
Presenta una **Tabla Comparativa de Herramientas** (columnas: `| Herramienta | Tipo (APM/Logs/Metrics) | Ventajas Principales | Modelo de Costos |`) indicando los datos correspondientes.

#### 5. Modelado Visual en PlantUML (Estricto sin ASCII Art)
Genera **dos diagramas en PlantUML** (` ```plantuml @startuml ... @enduml `):
1. **Diagrama de Estado Actual**: Arquitectura monolítica colapsando bajo carga con sus cuellos de botella.
2. **Diagrama Objetivo del Hito 1**: Estrategia de escalado con capas horizontales, caché y replicación.

---

## Entregable
Guarda la respuesta en `../outputs/output1.md`.
