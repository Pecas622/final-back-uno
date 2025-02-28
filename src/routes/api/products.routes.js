import { Router } from 'express';
import { productModel } from '../../models/products.model.js';  // Asegúrate de que la ruta sea correcta

const router = Router();

// Ruta para crear un nuevo producto
router.post('/', async (req, res) => {
    try {
        // Extraer los datos del cuerpo de la solicitud
        const { title, category, price, stock } = req.body;

        // Validación de datos
        if (!title || !category || !price || !stock) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        if (price <= 0 || stock <= 0) {
            return res.status(400).json({ message: "El precio y el stock deben ser mayores a 0" });
        }

        // Crear nuevo producto con los datos enviados desde el frontend
        const newProduct = await productModel.create({
            title,
            category,
            price,
            stock
        });

        // Enviar el producto creado como respuesta
        res.status(201).json(newProduct);  // Usar json para respuestas con datos
    } catch (error) {
        console.error('❌ Error en el servidor:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
});

/// Ruta para obtener productos con paginación
router.get('/', async (req, res) => {
    try {
        const { category, price, page = 1, limit = 10 } = req.query; // Obtener la página y el límite desde los parámetros de consulta, con valores predeterminados

        console.log('Parametros de consulta:', { category, price, page, limit }); // Esto muestra los parámetros correctamente

        let filter = {};
        if (category) {
            const allowedCategories = ['Accesorios', 'Mates', 'Yerbas'];
            if (!allowedCategories.includes(category)) {
                return res.status(400).json({ message: 'Categoría no válida. Las opciones son: Accesorios, Mates, Yerbas' });
            }
            filter.category = category;
        }

        let sort = {};
        if (price === 'asc') {
            sort.price = 1;
        } else if (price === 'desc') {
            sort.price = -1;
        } else if (price) {
            return res.status(400).json({ message: 'El parámetro "price" debe ser "asc" o "desc"' });
        }

        // Obtener la cantidad total de productos que coinciden con el filtro
        const totalProducts = await productModel.countDocuments(filter);

        // Calcular el número total de páginas
        const totalPages = Math.ceil(totalProducts / limit);

        // Validar si la página solicitada es válida
        if (page < 1 || page > totalPages) {
            return res.status(400).json({ message: 'Página no válida' });
        }

        // Obtener los productos para la página actual
        const products = await productModel.find(filter)
            .sort(sort)
            .skip((page - 1) * limit) // Saltar los productos de las páginas anteriores
            .limit(parseInt(limit)); // Limitar el número de productos por página

        // Verificar si hay productos
        if (products.length === 0) {
            return res.status(404).json({ message: 'No se encontraron productos' });
        }

        // Preparar los datos de paginación
        const hasPrevPage = page > 1;
        const hasNextPage = page < totalPages;
        const prevPage = hasPrevPage ? page - 1 : null;
        const nextPage = hasNextPage ? page + 1 : null;

        // Responder con los productos y la información de paginación
        res.json({
            products,
            page,
            totalPages,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage
        });
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
});

// Ruta para eliminar un producto por su ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar y eliminar el producto
        const deletedProduct = await productModel.findByIdAndDelete(id);
        
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Enviar respuesta con el producto eliminado
        res.json({ message: 'Producto eliminado exitosamente', product: deletedProduct });
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
});

// Ruta para actualizar un producto por su ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;  // Obtenemos el ID del producto a actualizar
        const { title, category, price, stock } = req.body;  // Extraemos los campos a actualizar

        // Validación de datos
        if (!title || !category || !price || !stock) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        if (price <= 0 || stock <= 0) {
            return res.status(400).json({ message: "El precio y el stock deben ser mayores a 0" });
        }

        // Actualizamos el producto
        const updatedProduct = await productModel.findByIdAndUpdate(id, { title, category, price, stock }, { new: true });

        // Verificamos si el producto fue encontrado
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Respondemos con el producto actualizado
        res.json(updatedProduct);
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
});

export default router;
