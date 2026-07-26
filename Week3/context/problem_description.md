# Contexto del Problema: Sistema de Notificaciones y Eventos para FlashSales Inc.

## 1. Antecedentes y Contexto General

En los sistemas distribuidos modernos, los patrones arquitectónicos que permiten escalabilidad, resiliencia y alto rendimiento son fundamentales. Este proyecto de laboratorio aborda cuatro pilares conceptuales e interconectados:

1. **Optimización del Rendimiento del Sistema**: Identificación de cuellos de botella, métricas clave (latencia, throughput, backpressure) y estrategias de escalado.
2. **Brokers de Mensajes y Colas**: Comunicación asíncrona, desacoplamiento y absorción de picos de carga (*buffer/smoothing*).
3. **Arquitectura Orientada a Eventos (EDA)**: Publicación/Suscripción, eventos de dominio y acoplamiento débil entre módulos.
4. **Procesadores de Flujos (Stream Processing)**: Procesamiento y análisis de datos en tiempo real sobre flujos continuos de eventos.

---

## 2. Escenario de Negocio: FlashSales Inc.

**FlashSales Inc.** es una plataforma de comercio electrónico de alto volumen que organiza eventos de ventas relámpago con descuentos agresivos por tiempo limitado.

### La Problemática Actual
- **Infraestructura Monolítica**: La plataforma opera sobre un sistema monolítico tradicional donde el procesamiento de pedidos, inventario, pagos y notificaciones ocurre de forma síncrona en un mismo proceso o sobre una base de datos centralizada.
- **Colapso en Ventas Flash**: Durante los eventos relámpago, la plataforma experimenta picos masivos de tráfico que superan los **10,000 usuarios concurrentes simultáneos**, provocando:
  - Tiempos de respuesta extremadamente altos (latencias > 15-30 segundos).
  - Caídas completas del sistema (*downtime*) por agotamiento de conexiones a base de datos y memoria.
  - Pérdida de ventas, notificaciones no entregadas e insatisfacción de los clientes.

---

## 3. Objetivo de la Transformación Arquitectónica

Diseñar e iterar la arquitectura del sistema de notificaciones y procesamiento en tiempo real para **FlashSales Inc.**, transformando la arquitectura monolítica en una **Arquitectura Orientada a Eventos (EDA)** altamente escalable, capaz de soportar picos superiores a 10,000 usuarios concurrentes sin degradación de servicio.

---

## 4. Estructura de Trabajo por Hitos

El proyecto se aborda mediante una secuencia iterativa de entregables (hitos):
- **Hito 1**: Análisis de Rendimiento del Sistema (Monolito, Métricas, Escalamiento, Monitoreo).
- **Hitos Posteriores**: Brokers de Mensajes, Diseño EDA, Procesamiento de Flujos y Resiliencia.
