# Guía Estándar de Diagramación en PlantUML (Week 6 High-Contrast Visual Standard)

1. **ASIGNACIÓN OBLIGATORIA DE COLORES DE ALTO CONTRASANTE EN CADA ELEMENTO**:
   - Todo elemento DEBE llevar un color de fondo claro explícito para garantizar legibilidad en Modo Oscuro:
     - Microservicios: `#DBEAFE`
     - API Gateway: `#DCFCE7`
     - Event Bus: `#FEF08A`
     - Bases de Datos: `#DDD6FE`
     - Sistemas Externos: `#FFEDD5`
     - Clientes: `#F1F5F9`

2. **PROHIBIDO ÓVALOS / CASOS DE USO**: Usar únicamente `component`, `rectangle`, `database`, `queue`, `participant`.
3. **PROHIBIDO `skinparam handwritten`**: NUNCA usar la opción obsoleta handwritten.
4. **PROHIBIDO ESTEREOTIPOS EN PARTICIPANTES DE SECUENCIA**: Usar `participant "Nombre" as Alias`.
5. **PROHIBIDO `queue` EN DIAGRAMAS DE SECUENCIA**.
6. **PROHIBIDO `&`, APÓSTROFES `'`, PARÉNTESIS Y CORCHETES DENTRO DE STRINGS DE MENSARIOS**.
