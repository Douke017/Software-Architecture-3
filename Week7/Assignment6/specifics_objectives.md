# Objetivos Específicos: Assignment 6 (Validación C4, Plan de Elasticidad y Ensayo Prime Video)

1. **Validación de Límites de Servicio y SoC en Modelo C4**:
   - Evaluación crítica de las fronteras de los microservicios actuales (`Order`, `Restaurant`, `Delivery`, `Notification`, `Loyalty`, `Analytics`).
   - Propuesta de límites o divisiones alternativas justificadas (ej. separar `Delivery Dispatch` de `Delivery Tracking`, o desacoplar `Menu/Catalog Service` de `Restaurant Service`).
2. **Diagramas C4 Nivel 1 (Contexto) y Nivel 2 (Contenedores)**:
   - Diagramas nativos en C4-PlantUML Structurizr (`!include <C4/C4_Context>`, `!include <C4/C4_Container>`) con enrutamiento de flechas completo, identificando comunicaciones síncronas (REST/gRPC) y asíncronas (Kafka).
3. **Plan de Escalabilidad y Elasticidad por Perfiles de Carga**:
   - **Caso de Lectura Intensa (Read-heavy)**: Estrategia de escalabilidad para el *Servicio de Menú/Catálogo* (Caché distribuida multi-nivel Redis, CDN de borde, Read Replicas).
   - **Caso de Escritura Intensa (Write-heavy)**: Estrategia de escalabilidad para el *Servicio de Pedidos durante horas pico* (Ingesta asíncrona desacoplada en Kafka, particionado horizontal, Transactional Outbox y escalado horizontal de pods HPA).
   - **Caso de Cómputo/Proceso Intensivo (Compute-heavy)**: Estrategia para el *Servicio de Despacho de Entrega (Delivery Dispatch)* calculando optimización geoespacial y matching de repartidores (Workers de fondo escalados por CPU/lag de cola, clustering espacial con algoritmos heurísticos en memoria).
4. **Ensayo Arquitectónico sobre el Caso de Estudio de Prime Video (500 a 700 Palabras)**:
   - Análisis de la migración de microservicios/serverless distribuidos (AWS Step Functions + Lambda + S3) hacia un monolito/macroservicio consolidado en Amazon ECS/EC2.
   - Explicación de los cuellos de botella originales: costos masivos de transiciones de estado en Step Functions y límites de ancho de banda/transferencia de datos en S3.
   - Lecciones arquitectónicas fundamentales: por qué los microservicios no son una solución universal y cuándo la consolidación en memoria supera al desacoplamiento en red en cargas de procesamiento intensivo de datos.
