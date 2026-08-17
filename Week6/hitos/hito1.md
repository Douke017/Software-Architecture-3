# Hito 1: Descomposición del dominio y límites de servicios (QuickCart - Week 6)

## Planteamiento y Objetivo
Vamos a identificar microservicios candidatos a partir del dominio de negocio de QuickCart y justificar sus límites.

A partir del dominio de QuickCart, tenemos que proponer entre 5 y 7 microservicios. Por cada uno queremos:
- Nombre del servicio
- Responsabilidad principal (1 oración clara)
- Qué NO hace (límite explícito)
- Justificar al menos una decisión discutible, por ejemplo: ¿Por qué “Envío de Correos” es o no un servicio independiente? ¿Por qué Carrito y Pedidos no son el mismo servicio?

Identificar un anti-patrón potencial si los límites se definen mal (God Service, Chatty Services, Distributed Monolith, etc…). Explicar brevemente qué problema generaría a futuro.

Se debe explicar detalladamente un límite de servicio.
