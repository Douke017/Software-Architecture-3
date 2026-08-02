# Estándar General de Análisis y Diseño de Arquitectura de Microservicios Distribuidos (Week 4 Framework)

Este marco metodológico define el procedimiento general que debe aplicar el **Principal Software Architect** para descomponer, analizar y resolver problemas de arquitectura de software a gran escala.

---

## 1. Descomposición Estratégica en Microservicios (Domain-Driven Design - DDD)

Todo análisis arquitectónico debe abordar el problema descomponiendo el dominio en **Microservicios Autónomos por Bounded Context**:

1. **Aislamiento de Dominios**: Identificación clara de contextos delimitados.
2. **Patrón Database-per-Service**: Cada microservicio es dueño exclusivo de su almacén de datos (RDBMS o NoSQL). Queda estrictamente prohibido el acceso directo a bases de datos compartidas entre servicios para eliminar contención de bloqueos y Puntos Únicos de Falla (SPOF).

---

## 2. Estrategia Dual de Comunicación (Sincrónico vs. Asincrónico)

1. **Comunicación Sincrónica Estricta (gRPC / REST + Circuit Breaker)**:
   - Reservada exclusivamente para consultas de lectura de baja latencia o validaciones externas inmediatas.
   - Debe protegerse obligatoriamente mediante patrones de **Circuit Breaker** (ej. Resilience4j), **Timeouts** y **Bulkheads**.
2. **Comunicación Asincrónica Guiada por Eventos (EDA & Event Bus)**:
   - Obligatoria para todas las operaciones que modifiquen el estado del negocio.
   - Utiliza un **Event Bus distribuido** (ej. Apache Kafka, Cloud Pub/Sub) para lograr **desacoplamiento temporal** y amortiguación de picos de carga (*Load Smoothing*).

---

## 3. Patrones de Consistencia Distribuida y Resiliencia

1. **Transacciones Distribuidas (Saga Pattern)**:
   - Reemplaza transacciones ACID monolíticas por Sagas (Coreografía u Orquestación) garantizando **Consistencia Eventual** y definiendo transacciones compensatorias explícitas ante fallos.
2. **Transactional Outbox & Change Data Capture (CDC)**:
   - Uso del patrón Outbox con CDC (Debezium / Kafka Connect) para garantizar escrituras atómicas en base de datos y publicación confiable de eventos sin doble escritura.
3. **Resiliencia Operativa**:
   - Implementación de **Dead Letter Queues (DLQ)** para eventos fallidos, reintentos con **Exponential Backoff y Jitter**, y desacoplamiento de consumidores.

---

## 4. Ingesta de Borde, Caché y Escalamiento de Datos

1. **Capa de Borde (API Gateway & BFF)**:
   - Punto de entrada unificado que gestiona autenticación (JWT/OAuth2), Rate Limiting, terminación TLS y enrutamiento dinámico por cliente (Backend For Frontend).
2. **Estrategia de Caché Distribuido (Redis Cluster)**:
   - Capa de almacenamiento en memoria para absorber >90% de las lecturas repetitivas liberando la capa de datos relacional.
3. **Particionado y Réplicas de Lectura**:
   - Replicación de lectura asíncrona para consultas de alto Throughput y Sharding por región/usuario para escrituras transaccionales.

---

## 5. Observabilidad Integral (Golden Signals)

1. **Métricas Clave**: Monitoreo cuantitativo continuo de Latencia (percentiles p95 y p99), Throughput (req/s, tps), Tasa de Errores (HTTP 5xx) y Saturación (CPU, Memoria, Lag de colas).
2. **Trazabilidad Distribuida**: Rastreo de solicitudes de extremo a extremo mediante OpenTelemetry / Jaeger inyectando Trace-IDs únicos a lo largo de todos los microservicios.
