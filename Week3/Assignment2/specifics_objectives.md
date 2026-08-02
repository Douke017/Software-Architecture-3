# Objetivos Específicos de Análisis Arquitectónico - Assignment 2

## Caso de Estudio Seleccionado: McDonald's Corporation

El objetivo de esta asignación es realizar un análisis profundo de ingeniería y arquitectura de software del ecosistema tecnológico global de **McDonald's**, identificando sus sistemas centrales, puntos de integración y proponiendo estrategias modernas de interoperabilidad y migración de datos.

---

## Entregables y Secciones Requeridas

1. **Identificación y Análisis de Sistemas Centrales**:
   - Detalle de los componentes fundamentales: POS (Point of Sale), KDS (Kitchen Display System), Motor de Inventario/ERP, CRM & Loyalty (MyMcDonald's Rewards), API Gateway de Agregadores y Sistema de Despacho.
   - Definición del rol operativo y patrón de responsabilidad de cada sistema.

2. **Mapeo de Puntos de Integración entre Sistemas**:
   - Identificación de los flujos de comunicación entre canales digitales (App/Web/PedidosYa), POS, KDS y sistemas analíticos.
   - Evaluación de protocolos de integración (REST APIs, Webhooks, gRPC, Event Brokers).

3. **Mejoras Potenciales para la Interoperabilidad y Migración de Datos**:
   - Propuesta de transformación de integraciones síncronas a una **Arquitectura Orientada a Eventos (EDA)** mediante un Bus de Eventos (Event Broker).
   - Estrategia de **Migración de Datos en Tiempo Real** usando Change Data Capture (CDC) para evitar indisponibilidad durante actualización de sistemas legados.
   - Patrón de Middleware de Agregadores para unificar plataformas de terceros (PedidosYa, UberEats, DoorDash).

4. **Diagramación Visual en PlantUML (Estricto sin ASCII Art)**:
   - **Diagrama de Arquitectura de Componentes de Integración (Component Diagram)**: Muestra la topología completa de los sistemas centrales, capas de API Gateway, Event Bus y plataformas externas.
   - **Diagrama de Secuencia de Pedido Multi-Canal (Sequence Diagram)**: Ilustra el ciclo de vida completo de un pedido desde un agregador (ej. PedidosYa) o App Móvil hasta la pantalla de cocina (KDS) y actualización de inventario.
