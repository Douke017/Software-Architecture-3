# Guía de Patrones de Resiliencia & Tolerancia a Fallas (Senior Reference)

Referencia técnica de diseño para garantizar la alta disponibilidad, contención de fallas y autorrecuperación en microservicios distribuidos.

---

## 1. Patrón Circuit Breaker (Cortacircuitos)

El **Circuit Breaker** (ej. Resilience4j) monitorea la tasa de fallas y latencia en las llamadas salientes entre microservicios o hacia servicios externos:
- **Estado CERRADO (Normal)**: Las peticiones fluyen libremente. Se contabiliza la tasa de errores sobre una ventana deslizante de peticiones.
- **Estado ABIERTO (Circuit Open)**: Si la tasa de error o latencia supera el umbral (ej. >50% de errores o latencia >2s), el circuito se abre inmediatamente. **Todas las llamadas fallan rápido (Fast-Fail)** o retornan respuestas de fallback sin intentar la conexión remota, protegiendo al llamante y al servicio degradado.
- **Estado MITAD-ABIERTO (Half-Open)**: Tras un período de espera (*Wait Duration*, ej. 10s), se permite el paso de un número limitado de peticiones de prueba. Si responden con éxito, el circuito vuelve a CERRADO; de lo contrario, regresa a ABIERTO.

---

## 2. Patrón Bulkhead (Mamparas de Aislamiento)

- **Principio**: Inspirado en los compartimentos estancos de los barcos que evitan que el agua hunda toda la nave si el casco se perfora.
- **Implementación**: Aísla los pools de hilos de ejecución (*Thread Pool Isolation*) o semáforos asignados a cada dependencia remota. Si el servicio de pagos de terceros se congela, solo agota el pool de hilos asignado a la pasarela de pagos, manteniendo intacto el pool de hilos del catálogo y usuarios.

---

## 3. Rate Limiting, Load Shedding & Throttling

- **Rate Limiting (Limitación de Tasa)**: Algoritmos como *Token Bucket* o *Leaky Bucket* (implementados en el API Gateway o Redis) restringen el número máximo de solicitudes por cliente/segundo (ej. 100 req/s por IP/usuario) devolviendo `HTTP 429 Too Many Requests`.
- **Load Shedding (Deslastre de Carga)**: Ante picos extremos de saturación del sistema, el API Gateway descarta proactivamente tráfico de baja prioridad (ej. analítica o reseñas) para priorizar el tráfico de alta prioridad (ej. checkout y pagos).
