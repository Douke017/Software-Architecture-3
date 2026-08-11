# HITO 2: Rediseño Arquitectónico en Microservicios

Queremos pasar del diagnóstico al diseño, aplicando principios de MSA para proponer una arquitectura coherente, justificable y razonada.

## 2.1 Identificación de microservicios

Deconstruiremos el monolito en servicios alineados a capacidades de negocio.

Proponer al menos 5 microservicios. Para cada uno, indicar:
- Nombre del servicio
- Responsabilidad principal
- Ejemplos de endpoints de API

## 2.2 Diseño de datos y persistencia

Aplicaremos gestión de datos descentralizada y persistencia. Para cada microservicio:

- ¿Qué datos son de su propiedad?
- ¿Qué tipo de base de datos usaría?

Justificación breves. El mindset de trabajo es: Tabla servicio → datos → tipo de DB → justificación. Tener presentes los patrones que ya discutimos en clases: consistencia
eventual, database per service.


## 2.3 Comunicación y resiliencia entre servicios

Diseñaremos (conceptualmente) interacciones reales entre servicios. Acá nuestras interfaces van a quedar super definidas :)

Identificar/diseñar, al menos:

1 interacción síncrona (y explicar por qué)
1 interacción asíncrona (y explicar por qué)

Relacionar explícitamente con:

- Acoplamiento débil
- Aislamiento de fallas

Podés entregar una descripción textual o un pequeño diagrama conceptual con cuadros de texto. La idea es interiorizar que no todo es REST, no todo es async, tenemos criterios arquitectónicos que se ajustan a cada problema/solución.