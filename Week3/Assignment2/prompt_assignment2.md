# Context Engineering Prompt - Assignment 2: Arquitectura del Ecosistema de Restaurante Moderno (Caso McDonald's)

## Contexto de Referencia
Asimila las directrices del rol en `../context/role.md`, las reglas visuales en `../context/markdown_guide.md`, la guía de diagramación en `../context/plantuml_guide.md`, el escenario de negocio en `./problem_description.md` y los objetivos específicos en `./specifics_objectives.md`.

---

## Directivas Arquitectónicas para el Modelo

Actúa como **Principal Software Architect** y elabora un informe técnico completo de arquitectura de software (extensión de 3-4 páginas) para el ecosistema tecnológico de **McDonald's**.

---

### Ejes de Análisis Requeridos

#### 1. Identificación y Caracterización de Sistemas Centrales
Analiza en detalle las responsabilidades, arquitectura interna y capacidades operativas de los siguientes sistemas clave:
- **POS (Point of Sale)**: Gestión de pedidos presenciales, sincronización de precios y cajas.
- **KDS (Kitchen Display System)**: Ruteo inteligente de órdenes a estaciones de preparación (Fryers, Grill, Assembly) según tiempo de preparación.
- **Canales Digitales Directos (App/Web & Kioscos)**: Ingesta de pedidos remotos con geolocalización.
- **Middleware de Integración de Terceros (Delivery Aggregators)**: Ingesta unificada de PedidosYa, UberEats, DoorDash, Rappi.
- **CRM & Motor de Lealtad (MyMcDonald's Rewards)**: Perfilado de cliente, personalización de ofertas en tiempo real y CDP.
- **ERP & Gestión de Inventario**: Descuento atómico de insumos por receta y orden procesada.

#### 2. Puntos de Integración entre Sistemas
Analiza los flujos de datos críticos y los contratos de interfaz entre componentes:
- **Integración App/Kiosco -> POS / KDS**: Ingesta de pedidos con validación de inventario local.
- **Integración Agregadores -> Middleware -> KDS**: Normalización de menús y estados de orden vía Webhooks y REST APIs.
- **Integración POS -> CRM / Loyalty**: Acreditación de puntos y redención de cupones durante la transacción.
- **Integración POS / KDS -> ERP / Inventario**: Actualización asíncrona de insumos.

#### 3. Propuestas de Mejora para Interoperabilidad y Migración de Datos
Propón soluciones arquitectónicas avanzadas para resolver desacoplamiento y migración:
- **Arquitectura Orientada a Eventos (EDA)**: Implementación de un Event Bus (ej. Apache Kafka / Cloud PubSub) para desacoplar el POS de los canales digitales y sistemas analíticos.
- **Estrategia de Migración de Datos Cero-Downtime**: Uso del patrón **Change Data Capture (CDC)** con Debezium/Kafka Connect para migrar datos de bases relacionales legadas de restaurantes hacia la nube sin interrumpir la operación 24/7.
- **Patrón API Gateway y Canales Unificados**: Abstracción de integraciones externas para evitar acoplamiento con plataformas cambiantes de delivery.

#### 4. Modelado Visual en PlantUML (Estricto sin Errores de Sintaxis)
Genera **dos diagramas profesionales en PlantUML** (` ```plantuml @startuml ... @enduml `) aplicando estrictamente las reglas de `plantuml_guide.md`:
- **Estereotipos**: En una sola palabra sin espacios (ej. `<<MobileClient>>`, `<<ExternalPartner>>`, `<<EdgeGateway>>`).
- **Flechas**: Únicamente sintaxis válida (`-->`, `->`, `<->`, `..>`). NUNCA uses `<-->`.
- **Clientes/Usuarios**: Representa clientes en el diagrama de componentes mediante `rectangle "Cliente / Usuario" as User`.

1. **Diagrama de Componentes de Integración del Ecosistema McDonald's**: Muestra los canales digitales, POS, KDS, Agregadores, API Gateway, Event Bus y sistemas de backend (CRM/ERP).
2. **Diagrama de Secuencia de Pedido Digital y Despacho**: Ilustra el ciclo de vida completo desde que un usuario realiza un pedido en un agregador (ej. PedidosYa) o App Móvil hasta la pantalla de cocina (KDS), notificación al conductor y descuento en inventario.

---

## Entregable
Guarda la respuesta técnica completa en `./assignment2_output.md`.
