# Descripción del Problema: Assignment 7 - Patrones Avanzados, Desafíos de Database-per-Service y Diseño Táctico DDD (Week 7)

## Antecedentes
Una aplicación moderna de pedidos de comida típicamente no es una sola aplicación monolítica. En cambio, es un sistema distribuido de servicios débilmente acoplados que se comunican principalmente a través de la producción y consumo de eventos.

En esta arquitectura, un **"evento"** es un registro inmutable de algo que ha sucedido en el pasado—por ejemplo, *"un cliente realizó un pedido"*, *"la cocina comenzó a prepararlo"*, o *"se asignó un conductor"*. Cuando un servicio realiza una acción que otras partes del sistema podrían necesitar conocer, no llama directamente a otros servicios. En cambio, publica un evento a un bus central de eventos (como Apache Kafka o Amazon EventBridge). Otros servicios se suscriben a los tipos de eventos que les interesan y reaccionan a ellos independientemente.

---

## Flujo Central de Eventos de la Plataforma

1. **Evento `OrderPlaced`**: Publicado por el *Servicio de Pedidos* después de que se confirme el pago. Contiene todos los detalles del pedido.
   - El *Servicio de Restaurante* lo consume para enviar el pedido al sistema de cocina del restaurante.
   - El *Servicio de Notificaciones* lo consume para enviar un email/SMS de *"Pedido Confirmado"* al cliente.
   - El *Servicio de Fidelización* lo consume para bloquear temporalmente los puntos de fidelidad usados en el pedido.

2. **Evento `OrderAccepted`**: Publicado por el *Servicio de Restaurante* cuando la cocina reconoce el pedido.
   - El *Servicio de Entrega* lo consume para comenzar el proceso de encontrar un conductor.
   - El *Servicio de Notificaciones* lo consume para actualizar al cliente que su comida está siendo preparada.

3. **Evento `DriverAssigned`**: Publicado por el *Servicio de Entrega*.
   - El *Servicio de Notificaciones* lo consume para notificar al cliente y proporcionar detalles de seguimiento del conductor.

4. **Evento `OrderDelivered`**: Publicado por el *Servicio de Entrega al completar exitosamente la entrega.
   - El *Servicio de Fidelización* lo consume para agregar permanentemente nuevos puntos a la cuenta del cliente.
   - El *Servicio de Analítica* lo consume para actualizar reportes de negocio.
