# Marco Maestro de Arquitectura de Microservicios & Sistemas Distribuidos (Master Architecture Framework)

Este documento condensa los principios, patrones y directrices fundamentales para la transición de sistemas monolíticos hacia **Arquitecturas de Microservicios (MSA)** y **Arquitecturas Guiadas por Eventos (EDA)** de alta concurrencia y resiliencia.

---

## 1. Principios Fundamentales de Microservicios (MSA)

1. **Principio de Responsabilidad Única (SRP) y Bounded Contexts**: Cada microservicio modela un límite explícito de dominio según Domain-Driven Design (DDD). Encapsula una única capacidad de negocio y es dueño absoluto de sus reglas.
2. **Autonomía y Despliegue Independiente**: Cada microservicio puede compilarse, probarse y desplegarse en producción sin coordinar lanzamientos ("lockstep deployments") con otros servicios.
3. **Persistencia Descentralizada (*Database-per-Service*)**: Ningún servicio accede directamente a las tablas o base de datos de otro microservicio. Toda consulta o mutación se realiza a través de contratos de API versionados o mediante la publicación/consumo de eventos.
4. **Comunicación Híbrida**:
   - **Síncrona (gRPC / REST)**: Exclusiva para consultas de solo lectura en tiempo real o validaciones previas inmediatas. Siempre protegida con Timeouts y Circuit Breakers.
   - **Asíncrona (Event-Driven via Kafka / Message Broker)**: Obligatoria para mutaciones de estado, flujos transaccionales y desencadenamiento de efectos colaterales.
5. **Aislamiento de Fallas (Marco FDIR)**: Diseño para Detección (observabilidad/trazabilidad distribuida), Aislamiento (Bulkheads, Circuit Breakers, Rate Limiting) y Recuperación automática (reintentos exponenciales, colas DLQ, transacciones compensatorias).

---

## 2. Patrones de Consistencia y Resiliencia en Sistemas Distribuidos

1. **Patrón Saga (Transacciones Distribuidas sin 2PC)**:
   - Las transacciones entre servicios se gestionan mediante secuencias de transacciones locales coordinadas por eventos (*Choreography*) o por un orquestador central (*Orchestration*).
   - Ante fallas en un paso intermedio, se publican eventos de compensación que revierten semánticamente los cambios previos (ej. cancelar orden, liberar stock, desbloquear puntos).
2. **Patrón Transactional Outbox + Debezium CDC**:
   - Para evitar inconsistencias donde un servicio actualiza su base de datos pero falla al publicar en Kafka (o viceversa), el servicio persiste el agregado de negocio y el evento en la misma transacción ACID local dentro de una tabla `outbox_events`.
   - Un conector CDC (*Change Data Capture* como Debezium) lee el log de transacciones (WAL de PostgreSQL) y publica en Kafka de forma confiable con semántica *at-least-once*.
3. **Dead Letter Queue (DLQ)**:
   - Los mensajes que fallan repetidamente tras el límite de reintentos son desviados a un topic DLQ para inspección y reprocesamiento manual, evitando bloquear la partición principal de Kafka (*poison pills*).
4. **Estrategias de Contrapresión (Backpressure)**:
   - **En el borde (Edge/Gateway)**: Algoritmo Token Bucket / Leaky Bucket para Rate Limiting y Load Shedding durante picos de demanda.
   - **En el bus de eventos**: Control de Consumer Lag, sintonización de `max.poll.records` y `prefetch count` para que los consumidores pesados procesen mensajes a su ritmo sostenible sin saturar la memoria.

---

## 3. Identificación de Antipatrones Arquitectónicos

1. **Distributed Monolith**: Servicios separados físicamente pero acoplados por bases de datos compartidas o cadenas síncronas de llamadas HTTP. Combina la lentitud de red con la falta de independencia del monolito.
2. **God Service / Mega Service**: Un único servicio que asume múltiples Bounded Contexts (ej. un "Checkout Service" que maneja carrito, pedido, cobro, stock y emails), convirtiéndose en un cuello de botella organizacional y de despliegue.
3. **Chatty Services**: Servicios que requieren decenas de llamadas de red ida y vuelta (*round-trips*) para completar una operación elemental de usuario.
4. **Shared Database**: Múltiples servicios compartiendo el mismo esquema relacional, generando contención de bloqueos (*table locks*) y rompiendo el encapsulamiento.

---

## 4. Gobernanza de la Deuda Técnica (Technical Debt Governance)

1. **Titularidad Ineludible (*Ownership*)**: El arquitecto no puede excusarse en la presión comercial. Toda decisión de compromiso temporal debe catalogarse como deuda técnica en un **Architecture Decision Record (ADR)**.
2. **Cuantificación del Impacto**: Traducir la deuda técnica a riesgos de negocio: degradación de latencia p95, costos operativos de infraestructura y ralentización del *Time-to-Market*.
3. **Estrategia de Remediación Progresiva (*Strangler Fig Pattern*)**: Desacoplar gradualmente capacidades del monolito hacia microservicios autónomos sin exigir la congelación total del negocio para una reescritura desde cero.
4. **Salvaguardas Automatizadas (*Fitness Functions*)**: Pruebas de arquitectura automatizadas en CI/CD que impiden la introducción de nuevas dependencias circulares o accesos indebidos a datos.
