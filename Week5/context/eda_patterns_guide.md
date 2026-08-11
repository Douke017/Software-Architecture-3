# Guía Avanzada de Patrones de Arquitectura Guiada por Eventos (EDA - Senior Reference)

Este documento sirve como referencia técnica de arquitectura senior para guiar la generación de respuestas en sistemas distribuidos desacoplados y guiados por eventos.

---

## 1. Patrones de Publicación Confiable y Consistencia (Dual Writing Mitigation)

### 1.1. Transactional Outbox Pattern + Change Data Capture (CDC)
- **Problema de la Doble Escritura (*Dual Write Problem*)**: Intentar escribir en la base de datos relacional y enviar un mensaje al Message Broker en la misma llamada de código expone al sistema a inconsistencias si la red o el broker fallan tras la escritura en BD.
- **Solución Arquitectónica**:
  1. El servicio realiza la transacción local de negocio en su BD (ej. inserta en la tabla `orders`) y en la **misma transacción relacional ACID** inserta un registro con el evento de dominio en una tabla auxiliar `outbox`.
  2. Un conector de **Change Data Capture (CDC)** como **Debezium** monitorea el Write-Ahead Log (WAL en PostgreSQL o Binlog en MySQL) de la base de datos.
  3. Debezium captura de forma asíncrona pero garantizada (*At-Least-Once Delivery*) las inserciones en la tabla `outbox` y las publica en los topics de **Apache Kafka** sin sobrecargar la aplicación.

---

## 2. Transacciones Distribuidas (Saga Pattern)

### 2.1. Saga por Coreografía (*Choreography*) vs. Orquestación (*Orchestration*)
- **Coreografía**: Los microservicios escuchan eventos de dominio de otros servicios y ejecutan sus acciones locales autónomamente sin un coordinador central (ideal para flujos simples y acoplamiento mínimo).
  - Ejemplo: `OrderCreated` -> Payment consume y emite `PaymentProcessed` -> Catalog consume y emite `InventoryDeducted`.
- **Orquestación**: Un servicio dedicado (*Saga Orchestrator*) gestiona centralidamente la máquina de estados de la transacción distribuida, enviando comandos a los servicios participantes.

### 2.2. Transacciones Compensatorias
- Cada paso local de una Saga que modifica datos debe tener una **Transacción Compensatoria explícita** para revertir los cambios de estado si un paso posterior falla (ej. si el pago falla, la transacción compensatoria cancela la orden y libera la reserva de stock).

---

## 3. CQRS (Command Query Responsibility Segregation)

- **Separación de Responsabilidades**: Separa las operaciones de modificación de estado (**Commands** - escrituras ACID) de las operaciones de lectura (**Queries** - vistas optimizadas/denormalizadas).
- **Proyecciones de Lectura**: Los eventos de dominio emitidos por los servicios de escritura alimentan proyecciones de lectura en bases de datos NoSQL (ej. MongoDB, Elasticsearch) diseñadas para consultas rápidas sin uniones (*JOINs*).

---

## 4. Gestión de Fallos en Mensajería: Dead Letter Queues (DLQ) & Retry Topics

- **Reintentos con Backoff y Jitter**: Ante fallas temporales de consumo, se reintenta el procesamiento incrementando exponencialmente el tiempo de espera con una componente aleatoria (*Jitter*) para evitar la tormenta de peticiones (*Thundering Herd*).
- **Dead Letter Queue (DLQ)**: Si un evento no puede ser procesado tras $N$ reintentos (ej. mensaje malformado o error irrecuperable), se enruta a una cola DLQ aislada para inspección manual y alertas, sin bloquear el consumo del stream principal.
