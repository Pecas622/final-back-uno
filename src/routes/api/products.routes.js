import { Router } from 'express';
import { productModel } from '../../models/products.model.js';
import mongoose from 'mongoose';  // Importamos mongoose para validar ObjectId

const router = Router();

// ✅ Ruta para crear un nuevo producto
router.post('/', async (req, res) => {
    try {
        const { title, category, price, stock } = req.body;

        if (!title || !category || !price || !stock) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        if (price <= 0 || stock <= 0) {
            return res.status(400).json({ message: "El precio y el stock deben ser mayores a 0" });
        }

        const newProduct = await productModel.create({ title, category, price, stock });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error('❌ Error al crear producto:', error.stack);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        console.log('🔍 Query params recibidos:', req.query);

        let { category, price, page = '1', limit = '10' } = req.query;

        // Asegurar que los valores existan y no sean undefined
        category = category ? category.trim() : null;
        price = price ? price.trim() : null;

        const parsedPage = parseInt(page, 10);
        const parsedLimit = parseInt(limit, 10);

        if (isNaN(parsedPage) || parsedPage < 1 || isNaN(parsedLimit) || parsedLimit < 1) {
            return res.status(400).json({ message: "Los parámetros 'page' y 'limit' deben ser números mayores a 0" });
        }

        let filter = {};
        if (category) {
            const allowedCategories = ['Accesorios', 'Mates', 'Yerbas'];
            if (!allowedCategories.includes(category)) {
                return res.status(400).json({ message: 'Categoría no válida. Opciones: Accesorios, Mates, Yerbas' });
            }
            filter.category = category;
        }

        let sort = {};
        if (price === 'asc') sort.price = 1;
        if (price === 'desc') sort.price = -1;

        const totalProducts = await productModel.countDocuments(filter);
        const totalPages = Math.max(Math.ceil(totalProducts / parsedLimit), 1);

        if (parsedPage > totalPages) {
            return res.status(400).json({ message: 'Página fuera de rango' });
        }

        const products = await productModel.find(filter)
            .sort(sort)
            .skip((parsedPage - 1) * parsedLimit)
            .limit(parsedLimit);

        res.json({
            products,
            page: parsedPage,
            totalPages,
            hasPrevPage: parsedPage > 1,
            hasNextPage: parsedPage < totalPages,
            prevPage: parsedPage > 1 ? parsedPage - 1 : null,
            nextPage: parsedPage < totalPages ? parsedPage + 1 : null
        });
    } catch (error) {
        console.error('❌ Error al obtener productos:', error.stack);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
});



// ✅ Ruta para eliminar un producto por su ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID de producto no válido" });
        }

        const deletedProduct = await productModel.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json({ message: 'Producto eliminado exitosamente', product: deletedProduct });
    } catch (error) {
        console.error('❌ Error al eliminar producto:', error.stack);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
});

// ✅ Ruta para actualizar un producto por su ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, category, price, stock } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID de producto no válido" });
        }

        if (!title || !category || !price || !stock) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        if (price <= 0 || stock <= 0) {
            return res.status(400).json({ message: "El precio y el stock deben ser mayores a 0" });
        }

        const updatedProduct = await productModel.findByIdAndUpdate(id, { title, category, price, stock }, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json(updatedProduct);
    } catch (error) {
        console.error('❌ Error al actualizar producto:', error.stack);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
});

export default router;
