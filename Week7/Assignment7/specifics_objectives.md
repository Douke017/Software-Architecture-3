# Objetivos Específicos: Assignment 7 (Patrones C4, Database-per-Service y Diseño Táctico/Estratégico DDD)

1. **Integración de Patrones Arquitectónicos en el Modelo C4**:
   - Escenarios de **BFF (Backend for Frontend)** para canales Web, Mobile Cliente y Tablet Restaurante.
   - Escenarios de **Circuit Breaker (Resilience4j / Envoy)** para pasarelas de pago y proveedores externos.
   - Escenarios de **SAGA Pattern (Orquestación / Coreografía)** para coordinar la transacción de compra y compensaciones.
2. **Análisis de Desafíos de Database-per-Service y Estrategias de Mitigación**:
   - Transacciones distribuidas y escrituras duales -> Mitigado con *Transactional Outbox + Debezium CDC*.
   - Consultas cruzadas y agregación de datos -> Mitigado con *CQRS / Vistas Materializadas en Read Replicas*.
   - Duplicación de datos y consistencia eventual -> Mitigado con *Event-Driven Data Propagation*.
3. **Diagramas C4 Nivel 1 (Contexto de Sistema)**:
   - Diagrama nativo C4-PlantUML Structurizr (`!include <C4/C4_Context>`) mostrando los 3 actores (`Cliente`, `Personal de Cocina`, `Repartidor`), el sistema central y los proveedores externos.
4. **Identificación de Bounded Contexts y Context Mapping Estratégico**:
   - Delimitación de contextos (`Pedidos`, `Entrega`, `Cocina/Restaurante`, `Facturación/Pagos`, `Fidelización`, `Clientes`).
   - Mapeo de relaciones estratégicas (Customer-Supplier, Partnership, Shared Kernel, OHS/PL, ACL).
5. **Diseño Táctico DDD: 3-4 Agregados Clave**:
   - Modelado formal de los agregados: `Agregado Pedido (Order)`, `Agregado Entrega (Delivery)`, `Agregado Cocina (Kitchen Ticket)` y `Agregado Facturación (Payment)`.
   - Definición de Aggregate Roots, Value Objects, entidades y límites estrictos de consistencia transaccional con invariantes.
6. **Perfilado de Carga y Estrategias de Escalado**:
   - Clasificación y estrategias para servicios de Lectura intensa (caché multi-nivel), Escritura intensa (sharding / particionado) y Cómputo intensivo (nivelación de carga basada en colas / workers).
