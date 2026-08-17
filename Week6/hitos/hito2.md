# Hito 2: Diseño de APIs y comunicación entre servicios (QuickCart - Week 6)

## Planteamiento y Objetivos
Vamos a diseñar interacciones realistas entre servicios y razonar sobre acoplamiento. En este hito suma mucho incorporar conceptos ya vistos como backpressure o tipos de acoplamiento.

Elegir dos servicios críticos (por ej.: Pedidos e Inventario, o Stock e e-Mail) y definir:
- Qué eventos o solicitudes intercambian.
- Qué tipo de comunicación manejan: síncrona? Qué protocolos pondrías como requerimiento? (REST, gRPC, etc) asíncrona?
- Qué protocolos pondrías como requerimiento? (eventos/mensajería)
- Qué datos se transmiten (no pongan estructuras internas completas, en alto nivel nomás).

Importante 1: Investigar un vendor o tecnología real para alguna interacción que hayas diseñado. Explicar por qué ese vendor sería adecuado (precio, capacidad, soporte, conozco cómo funciona, etc.)

Importante 2: Qué pasaría si ese vendor falla? Reconoces algún efecto dominó que podría surgir de esa falla?
