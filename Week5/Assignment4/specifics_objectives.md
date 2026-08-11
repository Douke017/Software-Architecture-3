# Objetivos Específicos de Análisis y Diseño Arquitectónico - Assignment 4

## Caso de Estudio: Control de Contrapresión y UI Mockups en PedidosYa EDA

El objetivo de este assignment es extender el **Modelo C4 (Niveles 1, 2 y 3)** agregando un **Componente de Contrapresión** dedicado y documentar escenarios operacionales críticos acompañados de bocetos de interfaz de usuario (**UI Mockups**).

---

## Entregables Requeridos

1. **Extensión del Modelo C4 con Componente de Contrapresión (Structurizr & C4-PlantUML)**:
   - **Nivel 1 (System Context)**: Mostrar la interacción de los usuarios y sistemas externos bajo control de flujo de carga.
   - **Nivel 2 (Container Diagram)**: Incorporar el **Backpressure Controller / Rate Limiter Service Container** gestionando el flujo entre la App Móvil, el API Gateway y el Bus de Eventos Kafka.
   - **Nivel 3 (Component Diagram del Order Service)**: Detallar los componentes internos del **Servicio de Pedidos (Order Service)** incluyendo el nuevo **Backpressure Flow Controller Component**, el **Queue Buffer Monitor**, el **Load Shedder** y el **Event Publisher**.

2. **Descripción Detallada de Escenarios de Contrapresión**:
   - **Escenario A: Pico Extremo de Ingesta (Black Friday / Super Bowl)**: Saturación de solicitudes HTTP en la puerta de entrada.
   - **Escenario B: Contrapresión en Cocina (Restaurant Capacity Saturation)**: El tiempo de preparación supera el umbral tolerable.
   - **Escenario C: Agotamiento de Flota de Repartidores (Driver Fleet Depletion)**: Alta demanda de pedidos sin conductores disponibles en la zona.

3. **Pantallas de Interfaz de Usuario (UI Mockups)**:
   - Presentar bocetos visuales de interfaz (utilizando alambres de diseño Markdown visuales o diagramas PlantUML Salt `@startsalt ... @endsalt`) mostrando la reacción UX ante contrapresión:
     - **Pantalla 1 (App Móvil Cliente)**: Banner de "Alta Demanda en tu Zona - Tiempo Estimado Ajustado" y desaceleración de checkout.
     - **Pantalla 2 (App Móvil Cliente)**: Pantalla de "Modo Pedido Programado / Pausa Temporal" ante saturación total.
     - **Pantalla 3 (Tablet Cocina Restaurante)**: Panel de control de ritmo de cocina con indicador de capacidad (ej. "Capacidad al 95% - Pausar nuevos pedidos").
