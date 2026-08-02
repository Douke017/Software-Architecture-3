# Escenario de Negocio y Arquitectura: GlobalNewsFeed - Análisis de Hashtags en Tendencia

## 1. Antecedentes del Problema
En los sistemas distribuidos modernos, las aplicaciones procesan continuamente grandes volúmenes de datos mediante **Procesos de Larga Duración** (*Long-Running Processes*). Ejemplos clave incluyen la transcodificación de video, la generación de informes complejos y el procesamiento en tiempo real de flujos de datos de alta velocidad.

Un desafío crítico que surge en estos escenarios es la **Contrapresión (Backpressure)**. La contrapresión es un mecanismo de control de flujo que asegura que una fuente de datos que produce información rápidamente no abrume a un procesador que consume a un ritmo más lento. Sin un manejo adecuado de la contrapresión, los sistemas experimentan agotamiento de memoria, rendimiento degradado, fallas en cascada y caídas catastróficas del servicio.

---

## 2. Descripción de la Plataforma: "GlobalNewsFeed"
**GlobalNewsFeed** es una plataforma global de redes sociales. La funcionalidad objeto de diseño es **"Análisis de Hashtags en Tendencia"** (*Trending Hashtags Analysis*), la cual implica procesar un flujo continuo y masivo de publicaciones en tiempo real para identificar, agregar y clasificar los hashtags más populares.

### El Desafío Técnico Central
- El servicio de ingesta de publicaciones (productores) puede generar cientos de miles de eventos por segundo, especialmente durante eventos globales de gran impacto (elecciones, finales deportivas, noticias de última hora).
- El servicio de análisis de hashtags (consumidores) realiza operaciones pesadas de parsing, conteo en ventanas temporales y ordenamiento, por lo que consume a un ritmo menor.
- Tu misión como **Principal Software Architect** es diseñar una arquitectura resiliente y escalable capaz de gestionar eficazmente la contrapresión sin pérdida de datos críticos ni caída de la plataforma.
