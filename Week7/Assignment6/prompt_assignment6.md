# Context Engineering Master Prompt - Assignment 6: Validación C4, Elasticidad y Ensayo Prime Video (Week 7)

## Contexto de Referencia
Asimila las directrices del rol en `../../shared_context/role.md`, el marco de microservicios en `../../shared_context/architecture_framework.md`, los principios de `../../shared_context/twelve_factor_app_guide.md`, las guías de diagramación C4 en `../../shared_context/structurizr_c4_guide.md` y `../../shared_context/plantuml_guide.md`, las reglas de formato en `../../shared_context/markdown_guide.md`, la descripción del problema en `./problem_description.md` y los objetivos específicos en `./specifics_objectives.md`.

---

## Directivas Arquitectónicas Imperativas para el Modelo

Actúa como **Principal Software & Enterprise Architect** y elabora un informe técnico de arquitectura completo y riguroso (extensión de 3 a 4 páginas) para la plataforma de pedidos de comida, validando los límites de servicio del Modelo C4, diseñando un plan de elasticidad y desarrollando un ensayo arquitectónico sobre el caso de estudio de **Prime Video**.

---

### Ejes de Razonamiento Arquitectónico y Entregables de Assignment 6 (Numeración Profesional desde la Sección 1)

#### 1. Validación de Límites de Servicio y Separación de Responsabilidades (SoC)
- **Evaluación Crítica de los Límites Actuales**: Evalúa las fronteras de los microservicios actuales (`Order`, `Restaurant`, `Delivery`, `Notification`, `Loyalty`, `Analytics`). Analiza si existen acoplamientos ocultos o colisión de responsabilidades.
- **Propuesta de Límites y Divisiones Alternativas**:
  - Propón y justifica al menos **dos divisiones alternativas** para optimizar la cohesión del dominio:
    1. *Desacoplamiento del Servicio de Menú/Catálogo respecto al Servicio de Restaurante*: Separación del catálogo público de alta lectura frente a la gestión operativa de cocina en tiempo real.
    2. *Subdivisión del Servicio de Entrega en "Delivery Dispatch" vs. "Delivery Tracking"*: Aislamiento del algoritmo de asignación y optimización de rutas (cómputo pesado) respecto a la recepción de telemetría GPS del repartidor (ingesta ligera de alta frecuencia).

#### 2. Modelo C4: Diagramas de Contexto (Nivel 1) y Contenedores (Nivel 2) con Identidad Structurizr
- **Diagrama PlantUML 1 (Modelo C4 - Nivel 1: Contexto de Sistema)**:
  - Aplica `!include <C4/C4_Context>` mostrando los Actores (`Cliente`, `Restaurante/Cocina`, `Repartidor`), el Sistema Central y los Sistemas Externos (`Pasarela de Pagos`, `Servicio Push/SMS`).
- **Diagrama PlantUML 2 (Modelo C4 - Nivel 2: Contenedores de Microservicios y Datos)**:
  - Aplica `!include <C4/C4_Container>` mostrando el `API Gateway / BFF`, los microservicios autónomos (incluyendo las divisiones optimizadas `Menu Service`, `Order Service`, `Delivery Dispatch`, `Delivery Tracking`, etc.), las bases de datos dedicadas (`ContainerDb`) y el bus de eventos `Apache Kafka` (`ContainerQueue`).
  - **REGLAS VISUALES Y SINTÁCTICAS OBLIGATORIAS**:
    - Cierre del `System_Boundary` con `}` **ANTES** de escribir las relaciones `Rel(...)`.
    - Todas las conexiones de enrutamiento explícitas etiquetando si la comunicación es `Síncrona (REST/gRPC)` o `Asíncrona (Kafka Events)`.
    - Comillas balanceadas en cada argumento, una sola línea por macro y cero comas dentro de los textos entre comillas.

#### 3. Plan de Elasticidad y Escalabilidad por Perfiles de Carga
Desarrolla una estrategia de escalabilidad elástica abordando los tres cuellos de botella característicos del sistema:
- **3.1. Caso de Lectura Intensa (Read-Heavy) - Servicio de Menú y Catálogo**:
  - *Problema*: Tráfico masivo de usuarios explorando platos y restaurantes simultáneamente.
  - *Estrategia Arquitectónica*: Caché distribuida multi-nivel (Redis Cluster con TTLs adaptativos), Edge CDN para activos estáticos e imágenes, Read Replicas en base de datos documental (MongoDB) y patrón Cache-Aside.
- **3.2. Caso de Escritura Intensa (Write-Heavy) - Servicio de Pedidos en Horas Pico**:
  - *Problema*: Avalancha masiva de transacciones de checkout concurrentes durante horarios de almuerzo/cena.
  - *Estrategia Arquitectónica*: Ingesta asíncrona desacoplada a través de Kafka Topics particionados por `userId`/`restaurantId`, patrón *Transactional Outbox*, escalado elástico horizontal de réplicas en Kubernetes (HPA basado en métricas de CPU y tasa de peticiones) y conexión mediante connection pooling (PgBouncer).
- **3.3. Caso de Cómputo/Proceso Intensivo (Compute-Heavy) - Servicio de Despacho de Entrega (Delivery Dispatch)**:
  - *Problema*: Algoritmos complejos de optimización combinatoria y búsqueda heurística para emparejar repartidores con múltiples pedidos y calcular rutas óptimas en tiempo real.
  - *Estrategia Arquitectónica*: Aislamiento de workers de cómputo dedicados (consumidores de Kafka sin estado), escalado automático basado en *Consumer Lag* (KEDA / Kubernetes Event-driven Autoscaling), clustering geoespacial en memoria con índices espaciales H3 / S2 y descarga asíncrona de resultados.

#### 4. Ensayo Arquitectónico: Análisis de Escalabilidad y Reducción de Costos del 90% en Amazon Prime Video (500 a 700 Palabras)
Elabora un ensayo formal de análisis técnico y lecciones de arquitectura sobre el caso de estudio publicado por el equipo de ingeniería de Amazon Prime Video (*Scaling up the Prime Video audio/video monitoring service and reducing costs by 90%*).

El ensayo debe estructurarse con rigor técnico abordando los siguientes puntos clave:
- **El Problema Original y la Arquitectura Serverless/Microservicios Inicial**:
  - Explicación de cómo el servicio de monitoreo de calidad de streams de audio/video fue diseñado inicialmente usando AWS Step Functions para orquestación de estado, AWS Lambda para ejecución sin servidor y Amazon S3 para almacenamiento intermedio de fotogramas de video.
- **El Cuello de Botella Operacional y la Explosión de Costos**:
  - Análisis de por qué la arquitectura inicial colapsó al escalar a miles de transmisiones en vivo: el costo prohibitivo de millones de transiciones de estado por segundo en Step Functions y las limitaciones de throughput y costos de transferencia de red/lectura-escritura masiva en S3 entre funciones Lambda independientes (*chattiness* y trasiego de datos pesados por red).
- **La Solución Arquitectónica: Consolidación en un Macroservicio en Contenedores (Amazon ECS)**:
  - Explicación de cómo el equipo rediseñó el sistema consolidando los componentes de análisis de video y audio en un único proceso monolítico/macroservicio desplegado en Amazon ECS/EC2.
  - Al procesar los fotogramas de video directamente en la memoria RAM compartida del mismo proceso (in-memory data transfer), se eliminaron por completo las llamadas a Step Functions y los intercambios de datos por red hacia S3.
- **Resultados Cuantitativos y Lecciones de Arquitectura para la Industria**:
  - Cómo esta decisión logró una **reducción del 90% en costos de infraestructura** y un aumento drástico en la capacidad de escalado.
  - *Lección Arquitectónica Fundamental*: Los microservicios y serverless no son una solución universal. Para cargas de trabajo continuas con procesamiento intensivo de datos en tiempo real, el costo de la latencia de red y la serialización/deserialización supera los beneficios del desacoplamiento, demostrando que la consolidación de procesos es una decisión arquitectónica legítima y altamente eficiente según el perfil de carga.

#### 5. Lista de Verificación (Checklist de Assignment 6)
- Casillas markdown `[x]` verificando todos los entregables.

---

## Formato del Entregable
Guarda el informe técnico completo en `./assignment6_output.md`.
