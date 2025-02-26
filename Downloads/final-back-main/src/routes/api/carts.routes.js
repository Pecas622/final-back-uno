import { Router } from 'express';
import { cartsModel } from '../../models/carts.models.js';

const router = Router();

// 🔹 Obtener todos los carritos
router.get('/', async (req, res) => {
    try {
        const carts = await cartsModel.find();
        res.json({ success: true, carts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener los carritos', error });
    }
});

// 🔹 Obtener un carrito por ID
router.get('/:id', async (req, res) => {
    try {
        const cart = await cartsModel.findById(req.params.id);
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Carrito no encontrado' });
        }
        res.json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener el carrito', error });
    }
});

// 🔹 Crear un nuevo carrito
router.post('/', async (req, res) => {
    try {
        const newCart = await cartsModel.create({ products: [] });
        res.status(201).json({ success: true, message: 'Carrito creado', cart: newCart });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear el carrito', error });
    }
});

// 🔹 Agregar un producto a un carrito
router.post('/:id/products', async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await cartsModel.findById(req.params.id);
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Carrito no encontrado' });
        }

        const existingProduct = cart.products.find(p => p.product.toString() === productId);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();
        res.json({ success: true, message: 'Producto agregado al carrito', cart });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al agregar producto al carrito', error });
    }
});

// 🔹 Eliminar un carrito
router.delete('/:id', async (req, res) => {
    try {
        const deletedCart = await cartsModel.findByIdAndDelete(req.params.id);
        if (!deletedCart) {
            return res.status(404).json({ success: false, message: 'Carrito no encontrado' });
        }
        res.json({ success: true, message: 'Carrito eliminado', cart: deletedCart });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar el carrito', error });
    }
});

export default router;
