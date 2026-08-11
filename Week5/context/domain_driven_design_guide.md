# Guía de Domain-Driven Design (DDD) & Context Mapping (Senior Reference)

Este documento define la referencia estratégica de DDD para descomponer monolitos en microservicios autónomos.

---

## 1. Diseño Estratégico & Bounded Contexts

- **Bounded Context (Contexto Delimitado)**: Límite explícito dentro del cual un modelo de dominio se aplica de forma unívoca. Define las fronteras de significado del lenguaje ubicuo (*Ubiquitous Language*).
- **Ejemplo**: El concepto de "Libro" en el `Catalog Context` contiene información editorial, género y autores; mientras que en el `Order Context` es simplemente un ítem de línea de factura con ID y precio de venta.

---

## 2. Mapa de Contextos (*Context Mapping Patterns*)

- **Shared Kernel**: Dos contextos comparten un subconjunto común del modelo (restringir al máximo para evitar acoplamiento).
- **Customer-Supplier**: El contexto proveedor (*Upstream*) debe adaptar entregas para satisfacer las necesidades del consumidor (*Downstream*).
- **Anti-Corruption Layer (ACL)**: Capa intermedia que traduce y aísla el modelo de un sistema externo o legado para evitar que contamine el dominio interno.
- **Open Host Service (OHS) / Published Language (PL)**: Interfaz de API pública estandarizada (OpenAPI/gRPC) y protocolo de intercambio (JSON/Protobuf) expuesto por un servicio proveedor para múltiples consumidores.

---

## 3. Diseño Táctico: Aggregates, Entities & Value Objects

- **Aggregate Root (Raíz del Agregado)**: Entidad principal que encapsula un grupo de entidades y objetos de valor asociados, garantizando la consistencia e invariantes de negocio como una unidad transaccional única (ej. `Order` es la raíz que contiene `OrderItems`).
- **Value Objects**: Objetos inmutables definidos exclusivamente por sus atributos, sin identidad propia (ej. `Address`, `Money`).
- **Domain Events**: Hechos inmutables ocurridos en el pasado dentro del dominio (ej. `OrderPlaced`, `PaymentReceived`).
