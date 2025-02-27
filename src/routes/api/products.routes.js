import express from 'express';
import { ProductsModel } from "../../models/products.model.js";

const router = express.Router();

// Ruta para crear un nuevo producto
router.post('/', async (req, res) => {
    try {
        const { title, price, stock, category } = req.body;

        if (!title || !price || !stock || !category) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }

        const newProduct = new ProductsModel({
            title,
            price,
            stock,
            category
        });

        await newProduct.save();
        res.status(201).json(newProduct); // Devuelve el producto creado

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el producto' });
    }
});

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const products = await ProductsModel.find();
        console.log(products); // Verifica los productos que estás enviando
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
});


// Ruta para obtener un producto por su ID
router.get('/:id', async (req, res) => {
    try {
        const product = await ProductsModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el producto' });
    }
});

// Ruta para eliminar un producto por su ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductsModel.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }
});

export default router;
