# Hito 2: Síntesis y Creación de Entregables - Arquitectura de Contrapresión para GlobalNewsFeed

Integrar los aprendizajes del Hito 1 y producir una propuesta arquitectónica coherente, justificada y sometida a análisis crítico.

---

## 2.1 Selección y Justificación de la Estrategia
- Elegir la estrategia principal (o patrón híbrido) para manejar la contrapresión en GlobalNewsFeed.
- Justificar por qué es adecuada para el análisis de hashtags en tendencia en tiempo real.
- Explicar detalladamente qué problemas resuelve y qué problemas NO resuelve.
- **Análisis de Feedback Crítico e Impugnación**: Evaluar fortalezas, debilidades ocultas y escenarios límite (ej. ¿Qué ocurre si el tráfico se triplica inesperadamente o falla el Event Bus?).

---

## 2.2 Diseño de la Arquitectura Objetivo
- Descripción estructurada de los componentes principales (API Ingestion Gateway, Event Bus, Hashtag Processor Workers, Sliding Window State Store, Redis Trend Cache, Dead Letter Queue).
- Flujo de datos completo desde la ingesta de publicaciones hasta la actualización de tendencias.
- **Punto(s) exacto(s) donde se gestiona la contrapresión** (Puntos de control de flujo, desacoplamiento y descarte).
- **Diagramas PlantUML**: Diagrama de Componentes y Diagrama de Secuencia aplicando el estándar estricto sin errores de sintaxis.

---

## 2.3 Entregables Finales y Reflexión sobre el Uso de la IA
- Elaborar una reflexión metodológica sobre la IA como copiloto en el diseño de arquitectura distribuida (exploración de compromisos, pruebas de estrés conceptuales y retención del control técnico).

---

## 2.4 Prompt Reutilizable de Redacción y Estilo (Sin Delegación Técnica)
- Diseñar un **Prompt Maestro Reutilizable** enfocado en mejorar la redacción, claridad, sintaxis y estructura del documento, asegurando que la IA NO modifique el contenido técnico ni sustituya las decisiones del arquitecto.
