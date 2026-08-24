# Guía Maestra: The Twelve-Factor App para Microservicios Cloud-Native (Master 12-Factor Skill)

La metodología **The Twelve-Factor App** (12factor.net) establece los doce principios de ingeniería esenciales para construir aplicaciones modernas, escalables, portables y resilientes en la nube y arquitecturas de microservicios.

---

## Los 12 Factores de la Metodología

### 1. I. Base de Código (Codebase)
- **Principio**: *Una sola base de código rastreada en control de versiones (Git), muchos despliegues.*
- **En Microservicios**: Cada microservicio posee su propio repositorio independiente (o directorio aislado en monorepo) con su propio ciclo de vida. Si hay múltiples bases de código compartiendo lógica de negocio, se está ante un monolito distribuido.

### 2. II. Dependencias (Dependencies)
- **Principio**: *Declarar y aislar explícitamente las dependencias.*
- **En Microservicios**: Un microservicio nunca depende de la existencia implícita de paquetes o binarios a nivel del sistema operativo. Todas las dependencias se declaran en manifiestos explícitos (`package.json`, `pom.xml`, `go.mod`, `requirements.txt`) y se encapsulan dentro de contenedores (Docker / OCI).

### 3. III. Configuración (Config)
- **Principio**: *Guardar la configuración en el entorno.*
- **En Microservicios**: Separación estricta entre código ejecutable y configuración (credenciales de BD, URLs de endpoints, claves API, niveles de log). La configuración se inyecta mediante **Variables de Entorno** (`ENV`) o secretos en tiempo de ejecución (Kubernetes Secrets, HashiCorp Vault), permitiendo que la misma imagen binaria se despliegue en Dev, Staging y Producción sin re-compilar.

### 4. IV. Servicios de Respaldo (Backing Services)
- **Principio**: *Tratar los servicios de respaldo como recursos adjuntos conectables.*
- **En Microservicios**: Cualquier servicio externo que la app consume a través de la red (bases de datos PostgreSQL/MongoDB, brokers Kafka/RabbitMQ, servidores SMTP, sistemas de caché Redis) se trata como un recurso intercambiable. Si la base de datos de producción falla o migra a un proveedor gestionado en la nube, la app solo requiere cambiar la URL de conexión en su variable de entorno sin alterar una sola línea de código.

### 5. V. Construir, Publicar, Ejecutar (Build, Release, Run)
- **Principio**: *Separar estrictamente las etapas de compilación y ejecución.*
- **En Microservicios**:
  - **Build**: Transforma el código fuente en un artefacto ejecutable (imagen de contenedor inmutable).
  - **Release**: Combina el build inmutable con la configuración específica del entorno (`Release = Build + Config`). Cada release tiene un identificador único (tag/hash).
  - **Run**: Ejecuta la release en el entorno de destino. Los cambios en caliente en producción están prohibidos.

### 6. VI. Procesos (Processes)
- **Principio**: *Ejecutar la aplicación como uno o más procesos sin estado (stateless).*
- **En Microservicios**: Los microservicios son **stateless** y de **compartición nula (share-nothing)**. La memoria del proceso o el disco local solo se utilizan como búfer temporal efímero. Cualquier estado que deba persistir (sesión de usuario, carrito, transacciones) se almacena en un *Backing Service* con estado (Redis Cluster, PostgreSQL). Esto permite que cualquier instancia pueda morir o reiniciarse sin pérdida de datos.

### 7. VII. Asignación de Puertos (Port Binding)
- **Principio**: *Publicar servicios mediante asignación de puertos autónoma.*
- **En Microservicios**: El microservicio es totalmente autónomo y no depende de la inyección en un servidor de aplicaciones web externo (como Tomcat o IIS independiente). El servicio incluye su propio servidor web autocontenido (Kestrel, Netty, Express, FastAPI) y se enlaza directamente a un puerto HTTP/gRPC (`PORT=8080`) para recibir solicitudes.

### 8. VIII. Concurrencia (Concurrency)
- **Principio**: *Escalar horizontalmente mediante el modelo de procesos.*
- **En Microservicios**: La escalabilidad se logra multiplicando las instancias de procesos livianos e independientes en lugar de intentar hacer que un solo proceso crezca verticalmente consumiendo recursos masivos de CPU/RAM. Se diferencian tipos de procesos según su carga de trabajo (e.g., procesos web que atienden tráfico HTTP vs. workers de segundo plano que consumen eventos de Kafka).

### 9. IX. Desechabilidad (Disposability)
- **Principio**: *Maximizar la robustez con inicio rápido y apagado elegante (graceful shutdown).*
- **En Microservicios**: Las instancias de microservicios deben poder iniciarse en cuestión de segundos y apagarse limpiamente ante señales del sistema (`SIGTERM`). El apagado elegante implica dejar de aceptar nuevas conexiones, terminar de procesar las solicitudes en curso y cerrar ordenadamente los sockets de base de datos y canales de mensajería, facilitando el auto-escalado elástico y despliegues sin tiempo de inactividad (*Zero-Downtime Rolling Updates*).

### 10. X. Paridad en Desarrollo y Producción (Dev/Prod Parity)
- **Principio**: *Mantener el desarrollo, la pre-producción y la producción tan similares como sea posible.*
- **En Microservicios**: Minimizar las brechas temporales (despliegues continuos rápidos), brechas de personal (los desarrolladores observan y operan sus servicios) y brechas de herramientas (usar los mismos motores de bases de datos y brokers en desarrollo local mediante contenedores que los usados en producción).

### 11. XI. Registros (Logs)
- **Principio**: *Tratar los logs como flujos continuos de eventos hacia la salida estándar.*
- **En Microservicios**: La aplicación nunca gestiona ni escribe directamente en archivos de registro en el disco local del contenedor. El microservicio emite sus trazas y eventos directamente a `stdout` / `stderr`. Un agente de recolección de infraestructura (FluentBit, Promtail, CloudWatch) intercepta los flujos, los formatea (JSON estructurado) y los centraliza en plataformas de observabilidad (OpenTelemetry, Elasticsearch/Kibana, Datadog).

### 12. XII. Procesos de Administración (Admin Processes)
- **Principio**: *Ejecutar tareas de administración y mantenimiento como procesos únicos y efímeros.*
- **En Microservicios**: Tareas como migraciones de esquemas de bases de datos (Liquibase / Flyway) o scripts de inicialización de datos se ejecutan como procesos efímeros (*Jobs* de Kubernetes) que corren en el mismo entorno y con la misma configuración de la release, muriendo inmediatamente tras finalizar su cometido.
