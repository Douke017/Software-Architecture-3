# Objetivos Específicos de Análisis Arquitectónico y Modelo C4 - Assignment 3

## Caso de Estudio: Plataforma de Delivery Orientada a Eventos (PedidosYa)

El objetivo de este assignment es diseñar el **Modelo C4 completo** (Niveles 1, 2 y 3) para la plataforma de pedidos de comida orientada a eventos, enfocándose en los patrones de mensajería asíncrona y la resiliencia del ciclo de vida del pedido.

---

## Entregables Requeridos

1. **Análisis Arquitectónico de la Arquitectura EDA**:
   - Descripción detallada del desacoplamiento asíncrono y los beneficios de la arquitectura orientada a eventos.
   - Especificación del ciclo de vida de los 4 eventos clave: `OrderPlaced`, `OrderAccepted`, `DriverAssigned`, `OrderDelivered`.

2. **Modelo C4 Completo (Structurizr & PlantUML C4 Standards)**:
   - **Nivel 1: Diagrama de Contexto de Sistema (System Context Diagram)**: Mostrando los principales usuarios (Cliente, Restaurante, Repartidor) y sistemas externos (Pasarela de Pagos, Notificaciones Push).
   - **Nivel 2: Diagrama de Contenedores (Container Diagram)**: Mostrando los microservicios clave (*Order Service*, *Restaurant Service*, *Delivery Service*, *Loyalty Service*, *Notification Service*, *Analytics Service*), sus bases de datos dedicadas y las interacciones vía el Bus de Eventos (*Event Bus Apache Kafka*).
   - **Nivel 3: Diagrama de Componentes de un Servicio Crítico (Component Diagram)**: Detallando los componentes internos del **Servicio de Pedidos (Order Service)** (Order Controller, Order Domain Manager, Event Publisher Component, Order Repository) y cómo producen/consumen eventos del bus.
