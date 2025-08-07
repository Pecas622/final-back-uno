    # Final‑Back‑Uno

## Descripción
API desarrollada con Node.js, Express y Handlebars para gestionar [lo que haga tu proyecto: e.g., usuarios, productos, órdenes].

## Tecnologías usadas
- Node.js
- Express
- Handlebars
- (otras dependencias desde `package.json`)
## Endpoints principales

### 🛒 Carrito
- `GET /cart/:id` → Renderiza la vista del carrito con productos y total.

### 📦 Productos
- `GET /products` → Lista paginada de productos. Soporta filtros por categoría y orden de precios.
- `GET /products/:id` → Muestra el detalle de un producto específico.

### Parámetros opcionales en /products
- `?page=1&limit=10&query=accesorios&sort=asc`

## Instalación
```bash
git clone https://github.com/Pecas622/final-back-uno.git
cd final-back-uno
npm install
npm run dev