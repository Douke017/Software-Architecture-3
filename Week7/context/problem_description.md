# Descripción del Problema: ShopStream - Plataforma de E-Commerce basada en Microservicios, DDD y 12-Factor App (Week 7)

## Antecedentes
Las aplicaciones modernas están migrando de arquitecturas monolíticas a microservicios para lograr escalabilidad, capacidad de despliegue independiente y autonomía de equipos. Sin embargo, este cambio introduce complejidades en la coordinación de servicios, gestión de datos, resistencia de red y diseño de sistemas.

Este laboratorio explora patrones fundamentales de **Arquitectura de Microservicios (MSA)** y principios de **Diseño Dirigido por Dominio (Domain-Driven Design - DDD)** para abordar estos desafíos en una plataforma de comercio electrónico moderna llamada **"ShopStream"**. La plataforma debe manejar la navegación de productos, procesamiento de pedidos y gestión de usuarios de manera confiable y resiliente, guiada operacionalmente por los principios de la metodología **12-Factor App**.

---

## Contextos Delimitados Centrales (Análisis DDD Inicial)

1. **Contexto de Catálogo**:
   - Gestiona la información de productos, categorías, atributos, inventario/disponibilidad y motor de búsqueda.
2. **Contexto de Pedidos**:
   - Maneja la creación de pedidos, cálculo dinámico de precios, validación de reglas de negocio y ciclo de vida de la orden (Pendiente, Confirmado, Enviado, Cancelado).
3. **Contexto de Clientes**:
   - Gestiona perfiles de usuario, autenticación, autorización, libreta de direcciones y preferencias de los compradores.
4. **Contexto de CMS (Content Management System)**:
   - Administra banners promocionales, páginas de aterrizaje (landing pages), contenido estático enriquecido y campañas comerciales.
