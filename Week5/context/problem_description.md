# El Monolito: "BookSphere"

BookSphere es una aplicación monolítica de librería en línea. Sus funcionalidades centrales están todas contenidas dentro de una sola aplicación grande:

1. **Gestión de Usuarios**: Maneja el registro de usuarios, autenticación y gestión de perfiles.
2. **Servicio de Catálogo**: Gestiona libros (título, autor, descripción, precio, inventario).
3. **Carrito de Compras**: Permite a los usuarios agregar/remover libros y gestionar cantidades antes del pago.
4. **Gestión de Pedidos**: Procesa el pago, crea pedidos, gestiona el estado de pedidos (por ejemplo, confirmado, enviado).
5. **Procesamiento de Pagos**: Se integra con una pasarela de pago de terceros para manejar transacciones.
6. **Motor de Recomendaciones**: Sugiere libros a los usuarios basado en su historial de navegación y compras.
7. **Reseñas y Calificaciones**: Permite a los usuarios publicar reseñas y calificaciones para libros.

Este monolito usa una sola base de datos relacional grande (por ejemplo, PostgreSQL) para todas sus necesidades de datos.
