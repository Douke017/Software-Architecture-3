# Context Engineering Prompt - Documento de Diseño ASM de BookSphere (report.md - Week 5)

## Contexto de Referencia
Asimila las directrices del rol en `../context/role.md`, el marco de microservicios en `../context/architecture_framework.md`, las guías de DDD y resiliencia en `../context/`, la descripción del monolito en `../context/problem_description.md` y los estándares de formato y diagramación en `../context/plantuml_guide.md`.
Consolida las respuestas acumuladas de los hitos anteriores (`output1.md`, `output2.md`, `output3.md`).

---

## Directivas Arquitectónicas para el Modelo

Actúa como **Principal Software & Enterprise Architect** y elabora el **Documento de Diseño ASM de BookSphere** (guardado como `report.md` en la raíz de `Week5` y en `outputs/report.md`).

---

### Estructura Requerida del Informe Consolidado

#### 1. Parte 1: Diagnóstico de Arquitectura y Principios de Microservicios (Resumen Ejecutivo Breve)
- **1.1. Principios Clave de Microservicios**: Síntesis de SRP, Acoplamiento Débil, APIs como Contratos Estables, Comunicación Síncrona vs. Asíncrona, Persistencia Descentralizada y Aislamiento de Fallas (FDIR).
- **1.2. Diagnóstico del Monolito BookSphere**: Análisis sintético de los cuellos de botella de la base de datos PostgreSQL única (contención de bloqueos entre catálogo/pedidos/reseñas) y el riesgo de fallas globales en cascada (*Blast Radius*).

#### 2. Parte 2: Diseño de Arquitectura de Microservicios para BookSphere (Detallado y Completo)
- **2.1. Deconstrucción de Dominios y Tabla de Microservicios**:
  - Tabla completa con los 7 Microservicios Autónomos (`User and Identity`, `Catalog and Inventory`, `Cart Service`, `Order Management`, `Payment Processing`, `Recommendation Engine`, `Reviews and Ratings`), indicando Bounded Context, Responsabilidad Principal y Dominio de Datos exclusivo.
- **2.2. Definición Estructurada de Interfaces y Endpoints de API**:
  - Tabla o especificación detallada con al menos 2 a 3 endpoints representativos por microservicio (Método HTTP, Ruta URL orientada a recursos, Descripción y Parámetros clave).
- **2.3. Topología de Persistencia Descentralizada (*Database-per-Service*)**:
  - Tabla de Estrategia de Datos indicando para cada microservicio: Motor de almacenamiento seleccionado (ej. PostgreSQL, MongoDB, Redis, Neo4j/Elasticsearch), Justificación técnica de la carga de trabajo y Patrón de Consistencia (ACID local vs. Consistencia Eventual).
- **2.4. Representación Visual de la Arquitectura Objetivo en PlantUML (ESTRICTO ANTI-ERRORES SEGÚN PLANTUML REFERENCE GUIDE)**:
  - **Diagrama de Componentes Completo**: Ilustra la topología objetivo (Clientes Móvil/Web, API Gateway / BFF, Microservicios, Event Bus Kafka, Bases de Datos Aisladas por Servicio).
  - **Diagrama de Secuencia de Procesamiento de Pedidos**: Ilustra el flujo asíncrono desde que el usuario realiza el checkout hasta la actualización de inventario, procesamiento de pago y disparo de recomendaciones.

*REGLAS ANTI-ERRORES PLANTUML OBLIGATORIAS PARA EL MODELO (SEGÚN PLANTUML REFERENCE GUIDE)*:
1. **FLECHAS VÁLIDAS EN DIAGRAMAS DE SECUENCIA (`->`, `-->`, `->>`)**: Usar únicamente `->` (síncrona/estándar), `->>` (publicación de evento asíncrono) o `-->` (respuesta). Queda ESTRICTAMENTE PROHIBIDO usar la flecha punteada de componentes `..>` en diagramas de secuencia. Usar `..>` rompe el preprocesador de secuencia y provoca `syntax error (assumed diagram type: sequence)` en la línea 21.
2. **NUNCA COLOCAR ESTEREOTIPOS `<< ... >>` EN PARTICIPANTES DE DIAGRAMAS DE SECUENCIA**: Usar la sintaxis limpia `participant "Nombre del Servicio" as Alias` (ej: `participant "API Gateway" as APIGW`).
3. **NUNCA usar la palabra clave `queue` dentro de diagramas de secuencia**. Usar `participant "Event Bus Kafka" as EventBus`.
4. **NUNCA usar el símbolo '&'** (reemplazar siempre por `and`, ej. `Catalog and Inventory Service`).
5. **NUNCA usar corchetes '[' ']' dentro de etiquetas de flechas** (ej. `Publish OrderCreated`, NUNCA `Publish [OrderCreated]`).
6. **NUNCA usar apóstrofes `'` ni paréntesis `(` `)` en mensajes de secuencia** (ej. `3b. Guardar Order en OrderDB PENDING_PAYMENT`, NUNCA `3'. Guardar (PENDING)`).
7. **NUNCA usar etiquetas HTML `<b>`, `<br>`, `<i>` dentro de notas o componentes**. Usar `**texto**` o notas multilínea `note right \n ... \n end note`.

---

## Entregables
Guarda la respuesta técnica consolidada en `../report.md` (y `../outputs/report.md`).
