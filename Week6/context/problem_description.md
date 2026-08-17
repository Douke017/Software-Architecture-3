# Descripción del Problema: Arquitectura de Microservicios para "QuickCart" (Week 6)

## Antecedentes y Contexto del Negocio
Los sistemas de software modernos están evolucionando de arquitecturas monolíticas a microservicios para satisfacer las demandas de escalabilidad, resistencia y desarrollo rápido. Una plataforma de comercio electrónico es un ejemplo clásico donde diferentes preocupaciones, como gestión de usuarios, catálogo de productos, procesamiento de pedidos e inventario, tienen ciclos de vida, necesidades de escalado y modelos de datos distintos.

Esta actividad sumerge al arquitecto en los principios fundamentales de diseño de la **Arquitectura de Microservicios (MSA)**. Actuando como Arquitecto Principal de Software, el objetivo es descomponer un dominio de negocio, diseñar servicios independientes, definir sus límites y contratos, y planificar la escalabilidad y gestión de datos para **QuickCart**.

---

## Alcance del Negocio QuickCart

1. **Registro y Autenticación de Usuarios**: Gestión de identidades, credenciales, perfiles y direcciones de envío/facturación.
2. **Navegación y Búsqueda en Catálogo de Productos**: Exploración, filtrado, búsqueda full-text y consulta de metadatos de productos.
3. **Gestión del Carrito de Compras**: Administración efímera de ítems seleccionados por el cliente antes del checkout.
4. **Realizar y Rastrear Pedidos**: Orquestación del proceso de compra, creación de órdenes y seguimiento del estado del pedido.
5. **Actualizaciones de Stock del Inventario**: Reserva transaccional, deducción y reposición de inventario de productos.
6. **Envío de Correos Electrónicos de Confirmación**: Notificaciones asíncronas de eventos del pedido (confirmación de compra, envío, factura).

---

## Conceptos Clave de Arquitectura (Week 6 MSA)

- **Introducción a MSA**: Definición de microservicios, comparación con monolito, beneficios y desafíos.
- **Características de MSA**:
  - Responsabilidad Única (SRP)
  - Desplegable de Forma Independiente
  - Bajo Acoplamiento (*Loose Coupling*)
  - Desarrollo y Despliegue Autónomos
  - Datos Descentralizados (*Database-per-Service*)
  - Comunicación entre Servicios (Síncrona REST/gRPC vs Asíncrona EDA)
  - Aislamiento de Fallos (FDIR / Bulkheads / Circuit Breakers)
  - Entrega y Despliegue Continuos (CI/CD)
  - Persistencia y Desarrollo Políglota
- **Diseño de Microservicios**:
  - Límites de servicio y descomposición por Bounded Contexts (DDD)
  - Separación de Responsabilidades (SoC)
  - Escalabilidad y Elasticidad
