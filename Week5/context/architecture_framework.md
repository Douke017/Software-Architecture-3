# Estándar General de Análisis y Diseño de Arquitectura de Microservicios Distribuidos (Week 5 Framework)

Este marco metodológico define el procedimiento general que debe aplicar el **Principal Software Architect** para guiar a los modelos de lenguaje en la deconstrucción y rediseño de aplicaciones monolíticas hacia microservicios.

---

## 1. Descomposición Estratégica en Microservicios (Domain-Driven Design - DDD)

1. **Aislamiento de Bounded Contexts**:
   - Cada microservicio se alinea a una capacidad de negocio unívoca.
2. **Gestión de Datos Descentralizada (Database-per-Service)**:
   - Extensión directa del principio SRP (Responsabilidad Única) a la persistencia: ningún servicio puede acceder directamente a la base de datos de otro servicio.
   - Selección de persistencia políglota (RDBMS PostgreSQL, Documentos MongoDB, In-Memory Redis, Grafos Neo4j).

---

## 2. Estrategia Dual de Comunicación (Síncrona vs. Asíncrona - EDA)

1. **Comunicación Sincrónica (HTTP/REST o gRPC)**:
   - Reservada para consultas de lectura en tiempo real (*Queries*) o verificaciones de identidad donde el cliente requiere respuesta inmediata.
   - Proteger siempre mediante patrones de **Circuit Breaker** (Resilience4j), **Timeouts** y **Bulkheads**.
2. **Comunicación Asíncrona Guiada por Eventos (Event-Driven Architecture - EDA & Message Broker)**:
   - Obligatoria para modificaciones de estado, flujos transaccionales y procesos pesados (ej. checkout de pedidos, pagos, recomendaciones).
   - Uso de un **Message Broker / Event Bus distribuido** (Apache Kafka / RabbitMQ) para lograr desacoplamiento temporal, amortiguación de picos de carga (*Load Smoothing*) e ingesta streaming.
3. **Patrón Saga y Consistencia Eventual**:
   - Reemplazar transacciones ACID monolíticas por Sagas (Coreografía u Orquestación) con eventos de dominio (`OrderCreated`, `PaymentProcessed`, `PaymentFailed`) y transacciones compensatorias.
4. **Transactional Outbox & Change Data Capture (CDC)**:
   - Garantizar escrituras atómicas en base de datos local y publicación confiable de eventos sin problemas de doble escritura usando CDC (Debezium).

---

## 3. Aislamiento de Fallas y Marco FDIR (*Fault Detection, Isolation, and Recovery*)

1. **Fault Detection (Detección)**: Probes de salud (Liveness/Readiness), métricas de observabilidad (Golden Signals: Latencia, Throughput, Errores, Saturación) y Tracing distribuido.
2. **Fault Isolation (Aislamiento)**: Mamparas (*Bulkheads*), deslastre de carga (*Load Shedding*), limitación de tasa (*Rate Limiting*) y Circuit Breakers.
3. **Fault Recovery (Recuperación)**: Autorrecuperación (Auto-healing K8s), reintentos con Exponential Backoff & Jitter, y Sagas compensatorias.
