# Escenario de Negocio: Aplicación de Pedidos de Comida Orientada a Eventos (Caso PedidosYa / UberEats)

## 1. Antecedentes
Una aplicación moderna de pedidos de comida no es una aplicación monolítica, sino un sistema distribuido de microservicios débilmente acoplados que se comunican principalmente mediante la producción y consumo de eventos inmutables a través de un Bus de Eventos centralizado (ej. Apache Kafka o Amazon EventBridge).

Un **evento** es un registro inmutable de un hecho que ha sucedido en el pasado (ej. *"un cliente realizó un pedido"*, *"la cocina comenzó a prepararlo"*, *"se asignó un conductor"*). Los microservicios no se invocan directamente de forma síncrona, sino que publican eventos y se suscriben de forma autónoma.

---

## 2. Flujo Central de Eventos del Ciclo de Vida del Pedido

1. **Evento `OrderPlaced`**: Publicado por el *Servicio de Pedidos* tras confirmar el pago.
   - Consumido por *Servicio de Restaurante* (enviar pedido a la pantalla de cocina).
   - Consumido por *Servicio de Notificaciones* (enviar Email/SMS "Pedido Confirmado").
   - Consumido por *Servicio de Fidelización* (bloquear temporalmente puntos usados).

2. **Evento `OrderAccepted`**: Publicado por el *Servicio de Restaurante* cuando la cocina reconoce el pedido.
   - Consumido por *Servicio de Entrega* (iniciar búsqueda de repartidor).
   - Consumido por *Servicio de Notificaciones* (actualizar estado al cliente "Comida en preparación").

3. **Evento `DriverAssigned`**: Publicado por el *Servicio de Entrega*.
   - Consumido por *Servicio de Notificaciones* (notificar al cliente con datos del conductor y GPS).

4. **Evento `OrderDelivered`**: Publicado por el *Servicio de Entrega* tras completar exitosamente la entrega.
   - Consumido por *Servicio de Fidelización* (sumar puntos permanentemente).
   - Consumido por *Servicio de Analítica* (actualizar reportes de negocio en tiempo real).
