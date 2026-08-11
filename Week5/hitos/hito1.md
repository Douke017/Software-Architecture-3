# HITO 1: Comprensión Conceptual y Análisis del Monolito

Queremos entender los principios de la Arquitectura de Microservicios y ser capaces de diagnosticar problemas reales en una arquitectura monolítica, usando IA como apoyo conceptual (no como "respuesta automática", sean exigentes, críticos, estratégicos). Luego compartiremos las definiciones en clases!

## 1.1 Investigación de conceptos de Arq. MS:
- Principio de Responsabilidad Única (relacionar con principios S.O.L.I.D.)
- Acoplamiento Débil vs. Acoplamiento Fuerte: cuánto depende un componente de los detalles internos de otro. Ir pensando en cómo esto puede propagar fallas.
- ¿Qué significa decir "APIs como contratos estables"?
- Comunicación Síncrona vs. Asíncrona -> Específicamente en servicios
- Gestión de Datos Descentralizada: cómo se relaciona con la S de SOLID (primer ítem)
- Aislamiento de Fallas: buscar qué significa FDIR

## 1.2 Pequeño Análisis crítico del monolito BookSphere
Vamos a analizar el monolito como si fuera un sistema real en crecimiento.

Identificar y describir al menos 2 desafíos de escalabilidad o mantenimiento, por ejemplo: Dificultad para desplegar, Cuellos de botella, Riesgo de fallas globales, Riesgo de degradación de UX, Bloqueo tecnológico, etc.
