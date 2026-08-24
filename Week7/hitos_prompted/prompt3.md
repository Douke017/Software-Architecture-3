# Context Engineering Master Prompt - Hito 3: Síntesis, Operación y Defensa (ShopStream - Week 7)

## Contexto de Referencia
Asimila la descripción del problema de ShopStream en `../context/problem_description.md`, las directrices del rol en `../../shared_context/role.md`, el marco de microservicios en `../../shared_context/architecture_framework.md`, los principios de `../../shared_context/twelve_factor_app_guide.md`, los estándares C4 en `../../shared_context/structurizr_c4_guide.md`, las reglas de diagramación en `../../shared_context/plantuml_guide.md` y las reglas de formato en `../../shared_context/markdown_guide.md`.

---

## Directivas Metodológicas para el Arquitecto Principal

Actúa como **Principal Software & Enterprise Architect** y elabora el informe técnico de consolidación y defensa para el **Hito 3: Síntesis, Operación y Defensa de ShopStream**.

Tu objetivo es defender con solidez técnica las decisiones arquitectónicas del sistema, auditar posibles inconsistencias, analizar la operatividad del `Order Service` bajo la metodología The Twelve-Factor App y reflexionar críticamente sobre la interacción con IA y el rol de Context Engineering.

*RESTRICCIÓN DE ALCANCE: Céntrate exclusivamente en los entregables del Hito 3. No agregues secciones de "Próximos pasos" o "Roadmap futuro".*

---

### Ejes de Razonamiento Arquitectónico y Entregables del Hito 3 (Numeración Profesional desde la Sección 1)

#### 1. Arquitectura Final Consolidada de ShopStream (Modelo C4 Nivel 2 Refinado)
- **Síntesis del Ecosistema**: Describe brevemente la topología final de microservicios de ShopStream, destacando la separación de capas (Perímetro Edge Gateway, BFFs de canal, Microservicios de Dominio, Persistencia Políglota Database-per-Service y Event Bus Kafka).
- **Diagrama PlantUML 1 (Modelo C4 Nivel 2 - Diagrama de Contenedores Final)**:
  - Diagrama definitivo refinado utilizando la librería estándar nativa `!include <C4/C4_Container>`.
  - Debe ilustrar todos los Contenedores (`Container`), Bases de Datos dedicadas (`ContainerDb`), el Bus de Eventos (`ContainerQueue`), los Clientes (`Person`) y los Sistemas Externos (`System_Ext`).
  - *REGLAS CRÍTICAS DE DIAGRAMACIÓN C4*:
    1. Declara todos los contenedores dentro de `System_Boundary(c1, "Plataforma ShopStream EDA") { ... }`.
    2. **CIERRA EL BLOQUE CON `}` ANTES DE ESCRIBIR LAS RELACIONES `Rel(...)`** para garantizar el enrutamiento perfecto de todas las flechas.
    3. Todo contenedor debe tener sus conexiones explícitas: Cliente -> Gateway -> BFFs -> Microservicios -> BDs / Kafka.
    4. Toda llamada a macro en una sola línea continua con comillas dobles balanceadas `"..."` en cada argumento. Prohibidas las comas dentro de textos entre comillas.
    5. Solo usar nombres de macro oficiales (`System_Ext`, nunca `ExternalSystem`).

#### 2. Matriz y Registro de Decisiones Arquitectónicas (ADRs Consolidados)
- **Tabla Ejecutiva de Decisiones Clave (Celdas Breves de 8-10 Palabras)**:
  Presenta una tabla que sintetice las decisiones arquitectónicas estructurales tomadas para ShopStream:

  | Decisión Arquitectónica | Alternativas Evaluadas | Decisión Seleccionada | Trade-Off Principal Aceptado |
  | :--- | :--- | :--- | :--- |

- **Defensa Técnica y Justificación Detallada (Redactado en Viñetas Markdown)**:
  - *REGLA DE FORMATO*: Para cada decisión (ej. Modelo Híbrido Gateway+BFF, Subdivisión del Contexto de Pedidos, Patrón SAGA para transacciones distribuidas, Patrón Transactional Outbox + CDC, Persistencia Políglota Database-per-Service), redacta la justificación y los trade-offs en **sub-secciones con viñetas Markdown estructuradas**, NUNCA dentro de celdas de tabla.

#### 3. Impacto y Operación de The Twelve-Factor App en el Servicio de Pedidos (`Order Service`)
- Selecciona **dos principios fundamentales de The Twelve-Factor App** (basándote en `twelve_factor_app_guide.md`, ej. *Factor IV: Backing Services*, *Factor VI: Processes / Stateless*, *Factor IX: Disposability* o *Factor III: Config*).
- Desarrolla un análisis exhaustivo para cada uno de los dos principios elegidos, explicando:
  - **Diseño e Implementación Técnica**: Cómo se aplica ese factor específicamente en el diseño del `Order Service` (ej. gestión de conexiones a PostgreSQL y Kafka como recursos intercambiables vía variables de entorno, o cómo se estructura el servicio como proceso sin estado delegando transacciones al motor de persistencia).
  - **Operación y Resiliencia en Producción**: Cómo se comporta el servicio en escenarios operativos reales (ej. escalado horizontal elástico ante picos de demanda, apagado elegante ante `SIGTERM` cerrando de forma atómica transacciones locales de la tabla outbox sin perder eventos de pedidos).

#### 4. Auditoría y Resolución de Inconsistencias Arquitectónicas
- Realiza una revisión crítica y autoevaluación del diseño global de ShopStream:
  - **Identificación de Tensiones Arquitectónicas**: Analiza posibles inconsistencias o compromisos entre decisiones (ej. la latencia adicional introducida por el modelo de 2 capas Gateway + BFF frente a los SLAs de checkout; la consistencia eventual en la reserva de stock frente al riesgo de sobreventa durante flash sales; la sobrecarga operativa de un orquestador SAGA frente a la autonomía de microservicios).
  - **Estrategias de Mitigación y Resolución**: Justifica técnicamente cómo la arquitectura resuelve o mitiga estas tensiones (ej. uso de gRPC con HTTP/2 y multiplexación para enlaces internos, reservas temporales atómicas con TTL en Redis, idempotencia estricta en consumidores de Kafka).

#### 5. Evidencia, Metodología y Reflexión Crítica sobre el Uso de IA en Arquitectura
- **Evaluación de la Estrategia de Context Engineering**: Explica qué aportó realmente la ingeniería de contexto (skills compartidas, marcos de dominio DDD, estándares C4, linters sintácticos) frente a la formulación de prompts genéricos o sin restricciones.
- **Reflexión sobre Modelos, Capacidades y Límites**: Analiza las fortalezas, riesgos de alucinación (ej. invención de macros no estándar en PlantUML, generación de dependencias circulares) y la necesidad de supervisión y gobernanza humana por parte del Arquitecto Principal al utilizar modelos de lenguaje en el diseño de sistemas distribuidos.

---

## Formato del Entregable
Elabora el informe técnico de arquitectura estructurado y guárdalo en `../outputs/output3.md`.
