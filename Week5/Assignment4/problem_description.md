# Escenario de Negocio: Aplicación de Pedidos de Comida con Control de Contrapresión (Caso PedidosYa EDA - Assignment 4)

## 1. Antecedentes
En una arquitectura distribuida orientada a eventos (EDA) para una plataforma de delivery de comida tipo **PedidosYa**, el ciclo de vida del pedido se gestiona mediante la publicación y consumo de eventos inmutables a través de un Bus de Eventos centralizado (Apache Kafka):

1. **`OrderPlaced`**: Publicado por el *Servicio de Pedidos* tras la confirmación del pago.
2. **`OrderAccepted`**: Publicado por el *Servicio de Restaurante* al reconocer el pedido en cocina.
3. **`DriverAssigned`**: Publicado por el *Servicio de Entrega* al asignar un repartidor.
4. **`OrderDelivered`**: Publicado por el *Servicio de Entrega* al completar la entrega.

---

## 2. El Desafío de la Contrapresión en PedidosYa
Durante eventos de alta demanda masiva (lluvias intensas, finales deportivas como el Super Bowl, o promociones relámpago de viernes por la noche), la tasa de generación de pedidos (*productores*) supera drásticamente la capacidad de procesamiento de la cocina de los restaurantes o la disponibilidad de la flota de repartidores (*consumidores*).

Sin un componente dedicado de contrapresión, el sistema sufre:
- Saturación de colas y buffers de memoria.
- Tiempos de espera desmedidos y pedidos cancelados por timeout.
- Degradación de la experiencia de usuario (UX) sin comunicación transparente.

---

## 3. Objetivo de Assignment 4
Evolucionar el **Modelo C4 creado en la Semana 4 (Assignment 3)** para incorporar explícitamente un **Componente de Contrapresión (Backpressure Component)** en la arquitectura C4 y definir la experiencia visual del usuario (**UI Mockups**) cuando se activan los mecanismos de control de flujo y degradación controlada.
