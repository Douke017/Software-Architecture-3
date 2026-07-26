# Hito 2 (Parte 2): Diseño de Brokers de Mensajes y EDA

Queremos diseñar una arquitectura orientada a eventos usando brokers de mensajes y seleccionar tecnologías adecuadas. Bien, para ello tenemos que proponer una arquitectura EDA de alto nivel:

1) identificar:

- Productores de eventos
- Brokers de mensajes
- Consumidores

2) Mapear los eventos clave del flash sale, al menos: user_joined, item_viewed, purchase_attempt, purchase_successful, inventory_updated

3) Seleccionar el tipo de cola adecuado para cada evento: Punto a punto, Pub/Sub, justificación (breve!) de cada elección

4) Investigar servicios de brokers de mensajes (mínimo 3): Al menos uno open-source, al menos uno gestionado en la nube. Para cada broker indicar: Tipo (cola, streaming, híbrido), Principales capacidades, Modelo de precios (alto nivel, si está disponible, si no está disponible poner "no está disponible").

Ayudo con ejemplos: Apache Kafka, Confluent, RabbitMQ, HiveMQ, AWS SQS/SNS, Google Pub/Sub, Azure Service Bus