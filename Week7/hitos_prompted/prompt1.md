# Context Engineering Master Prompt - Hito 1: Descomposición y Arquitectura Base (ShopStream - Week 7)

## Contexto de Referencia
Asimila la descripción del problema de ShopStream en `../context/problem_description.md`, las directrices del rol en `../../shared_context/role.md`, el marco de microservicios en `../../shared_context/architecture_framework.md`, los principios de `../../shared_context/twelve_factor_app_guide.md`, los estándares C4 en `../../shared_context/structurizr_c4_guide.md` y las reglas de formato en `../../shared_context/markdown_guide.md`.

---

## Directivas Metodológicas para el Arquitecto Principal

Actúa como **Principal Software & Enterprise Architect** y lidera el análisis arquitectónico inicial para la plataforma de comercio electrónico **ShopStream**.

Tu misión en este **Hito 1** es definir la arquitectura base y la descomposición del sistema a través de un razonamiento técnico riguroso e independiente, fundamentado en **Domain-Driven Design (DDD)**, **Microservicios Autónomos (MSA)** y la metodología **The Twelve-Factor App**.

---

### Ejes de Razonamiento Arquitectónico y Entregables del Hito 1

#### 1. Descomposición del Dominio y Bounded Contexts (ShopStream)
- **Análisis de Bounded Contexts (DDD)**: Evalúa los cuatro dominios de negocio planteados (`Catálogo`, `Pedidos`, `Clientes` y `CMS`). Define con precisión los límites de cada contexto delimitado y su justificación estratégica.
- **Alineación con The Twelve-Factor App**: Analiza cómo la arquitectura base de ShopStream incorpora los principios operacionales de la metodología 12-Factor (especialmente Factores III. Configuración en entorno, IV. Backing Services conectables, VI. Procesos sin estado / stateless y IX. Desechabilidad).

#### 2. Propuesta de Microservicios Candidatos y Matriz de Responsabilidades
- **Definición Autónoma de Microservicios**: A partir de tu análisis de dominio, propón la lista de microservicios que conformarán el ecosistema.
- **Matriz de Responsabilidades y Persistencia**: Elabora una tabla estructurada (con celdas concisas de máximo 10-12 palabras por fila) que detalle para cada microservicio propuesto:
  - `Nombre del Microservicio`
  - `Responsabilidad Principal (1 oración clara)`
  - `Límite Explícito (Qué NO hace)`
  - `Motor de Base de Datos Seleccionado (Database-per-Service)` y justificación de persistencia políglota.

#### 3. Análisis Crítico y Subdivisión del Contexto de Pedidos
- **Diagnóstico del Riesgo de "God Service"**: Evalúa los riesgos operacionales y arquitectónicos de mantener el ciclo de vida del pedido (sesión de carrito, validación de reglas, máquina de estados y cobros) en un único componente monolítico.
- **Propuesta de Subdivisión en Sub-dominios**: Determina cómo debe subdividirse el contexto de pedidos para maximizar la cohesión y la autonomía. Justifica tu propuesta evaluando:
  - Diferencias en el ciclo de vida de los datos (datos volátiles/efímeros de sesión vs. registros durables inmutables de compra).
  - Perfiles de escalabilidad y throughput de lectura/escritura.
  - Aislamiento de riesgos de seguridad e integración con pasarelas financieras (perímetro PCI-DSS).
- **Matriz Comparativa de Trade-Offs**: Presenta una tabla comparativa evaluando el enfoque unificado frente a tu propuesta de subdivisión.

#### 4. Decisión Arquitectónica: Estrategia de Entrada (BFF vs. API Gateway)
- **Evaluación de Alternativas de Entrada**: Plantea y analiza objetivamente al menos 3 alternativas arquitectónicas para gestionar el acceso de los diferentes clientes (Web enriquecida, Apps móviles, integraciones externas):
  - *Alternativa A: API Gateway Centralizado Único.*
  - *Alternativa B: Backend-For-Frontend (BFF) dedicados por canal sin capa perimetral.*
  - *Alternativa C: Arquitectura Combinada / Híbrida de 2 Capas (Perímetro Edge Gateway + BFFs especializados).*
- **Matriz de Trade-Offs**: Compara las alternativas en función de: latencia de red, blast radius / aislamiento de fallos, sobrecarga de mantenimiento, optimización de payloads para redes móviles y centralización de políticas de seguridad (WAF, Rate Limiting, autenticación).
- **Decisión y Justificación Arquitectónica**: Emite y defiende tu decisión técnica final, explicando cómo se distribuyen las responsabilidades entre la seguridad perimetral y la experiencia de usuario de cada canal.

#### 5. Identificación de Patrones y Protocolos de Comunicación
- **Mapeo de Interacciones entre Servicios**: Identifica los flujos de comunicación clave entre los clientes, la capa de entrada y los microservicios internos.
- **Criterio de Selección Síncrono vs. Asíncrono**: Clasifica y justifica qué interacciones deben ser síncronas (REST / gRPC) y cuáles asíncronas guiadas por eventos (EDA / Apache Kafka), detallando los protocolos requeridos y el propósito funcional de cada enlace.
- **Tabla Resumen de Comunicaciones**: Presenta una tabla concisa con el origen, destino, tipo de comunicación, protocolo y propósito.

#### 6. Diagrama Arquitectónico de Alto Nivel v1 (Modelo C4 Nivel 2: Contenedores)
- Sintetiza tu diseño arquitectónico en **UN ÚNICO Diagrama de Contenedores (C4 Nivel 2)** formal, aplicando la librería estándar nativa `!include <C4/C4_Container>` conforme a la guía `structurizr_c4_guide.md`.
- Representa los Clientes (`Person`), la capa de entrada (`Container`), los microservicios autónomos propuestos (`Container`), las bases de datos dedicadas (`ContainerDb`), el bus de eventos (`ContainerQueue`) y los sistemas externos (`System_Ext`).
- *REGLAS CRÍTICAS DE DIAGRAMACIÓN*:
  - **ÚNICO DIAGRAMA REQUERIDO**: En este Hito 1 se solicita exclusivamente el diagrama de alto nivel v1 (C4 Nivel 2). **PROHIBIDO generar diagramas de Nivel 3 (Componentes) o Nivel 4 (Código/Clases)**, ya que corresponden a etapas posteriores y sobrecargan el documento.
  - **TOPOLOGÍA COMPLETA DE FLECHAS**: Todos los contenedores deben conectarse explícitamente usando la sintaxis de 4 parámetros: `Rel(origen, destino, "Acción o Descripción", "Protocolo / Tecnología")`.
  - **CIERRE DE BOUNDARY**: Cierra el bloque `System_Boundary(...) { ... }` con `}` antes de escribir las sentencias `Rel(...)`.
  - **SINTAXIS LIMPIA**: Una sola línea por macro, comillas dobles balanceadas y cero comas dentro de textos entre comillas.

---

## Formato del Entregable
Elabora el informe técnico de arquitectura estructurado y guárdalo en `../outputs/output1.md`.
