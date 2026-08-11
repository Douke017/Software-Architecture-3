# Context Engineering Prompt - Assignment 3: Modelo C4 para Plataforma de Delivery EDA (Caso PedidosYa)

## Contexto de Referencia
Asimila las directrices del rol en `../context/role.md`, el marco de microservicios en `../context/architecture_framework.md`, las reglas visuales en `../context/markdown_guide.md`, el estándar de PlantUML en `../context/plantuml_guide.md`, la guía del Modelo C4 en `../context/structurizr_c4_guide.md`, el escenario en `./problem_description.md` y los objetivos específicos en `./specifics_objectives.md`.

---

## Directivas Arquitectónicas para el Modelo

Actúa como **Principal Software & Enterprise Architect** y elabora un informe técnico completo de arquitectura de software (extensión de 3-4 páginas) para la plataforma de pedidos de comida orientada a eventos (**PedidosYa / UberEats**).

---

### Ejes de Análisis y Diagramación C4 Requeridos

#### 1. Análisis de la Arquitectura Orientada a Eventos (EDA) y Ciclo de Vida del Pedido
Analiza en detalle el diseño de mensajería asíncrona para los 4 eventos clave:
- **`OrderPlaced`**: Publicado por *Servicio de Pedidos*. Ingesta y reacción por *Restaurante*, *Notificaciones* y *Fidelización*.
- **`OrderAccepted`**: Publicado por *Servicio de Restaurante*. Reacción por *Entrega* (búsqueda de repartidor) y *Notificaciones*.
- **`DriverAssigned`**: Publicado por *Servicio de Entrega*. Reacción por *Notificaciones* (datos del conductor y seguimiento GPS).
- **`OrderDelivered`**: Publicado por *Servicio de Entrega*. Reacción por *Fidelización* (acreditación permanente de puntos) y *Analítica*.

#### 2. Modelo C4 Completo (Structurizr & C4-PlantUML Standards)
Genera los **tres diagramas del Modelo C4** en bloques PlantUML parseables (` ```plantuml @startuml ... @enduml `) aplicando estrictamente las macros de `structurizr_c4_guide.md`:

1. **Modelo C4 - Nivel 1: Diagrama de Contexto de Sistema (System Context Diagram)**:
   - Macros: `!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml`
   - Elementos: `Person(cliente...)`, `Person(restaurante...)`, `Person(driver...)`, `System(pedidosYaSystem...)`, `System_Ext(paymentGateway...)`, `System_Ext(notificationGateway...)`.
2. **Modelo C4 - Nivel 2: Diagrama de Contenedores (Container Diagram)**:
   - Macros: `!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml`
   - Elementos: `Container(mobileApp...)`, `Container(apiGateway...)`, `Container(orderSvc...)`, `Container(restaurantSvc...)`, `Container(deliverySvc...)`, `Container(loyaltySvc...)`, `Container(notificationSvc...)`, `Container(analyticsSvc...)`, `ContainerQueue(eventBus...)`, `ContainerDb(orderDb...)`.
3. **Modelo C4 - Nivel 3: Diagrama de Componentes Internos del Servicio de Pedidos (Component Diagram)**:
   - Macros: `!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Component.puml`
   - Elementos internos de *Order Service*: `Component(orderController...)`, `Component(orderManager...)`, `Component(eventPublisher...)`, `Component(orderRepository...)`, mostrando la ingesta y publicación hacia `ContainerQueue(eventBus)`.

---

## Entregable
Guarda la respuesta técnica completa en `./assignment3_output.md`.
