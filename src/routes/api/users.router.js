import { Router } from 'express';
import { modelUser } from '../../models/users.model.js';

const router = Router();

// Obtener usuarios con paginación
router.get('/', async (req, res) => {
    try {
        const { limit = 10, numPage = 1 } = req.query;

        const {
            docs,
            page,
            totalPages,
            hasPrevPage,
            hasNextPage
        } = await modelUser.paginate({}, { limit, page: numPage, lean: true });

        res.json({
            status: 'success',
            data: docs,
            page,
            totalPages,
            hasPrevPage,
            hasNextPage
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Error al obtener los usuarios' });
    }
});

// Crear un nuevo usuario
router.post('/api/products', async (req, res) => {
    try {
        console.log('➡️ Recibiendo datos del frontend:', req.body);

        const { title, price, description, stock, category } = req.body;

        // Validación de datos
        if (!title || !price || !description || !stock || !category) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        // Crear nuevo producto
        const newProduct = new ProductsModel({
            title,
            price,
            description,
            stock,
            category
        });

        await newProduct.save();
        res.status(201).json(newProduct);

    } catch (error) {
        console.error('❌ Error en el servidor:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Obtener usuario por ID
router.get('/:uid', async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await modelUser.findById(uid).lean();

        if (!user) {
            return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
        }

        res.json({ status: 'success', data: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Error al obtener el usuario' });
    }
});

// Actualizar usuario por ID
router.put('/:uid', async (req, res) => {
    try {
        const { uid } = req.params;
        const updateData = req.body;

        const updatedUser = await modelUser.findByIdAndUpdate(uid, updateData, { new: true }).lean();

        if (!updatedUser) {
            return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
        }

        res.json({ status: 'success', data: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Error al actualizar el usuario' });
    }
});

// Eliminar usuario por ID
router.delete('/:uid', async (req, res) => {
    try {
        const { uid } = req.params;

        const deletedUser = await modelUser.findByIdAndDelete(uid).lean();

        if (!deletedUser) {
            return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
        }

        res.json({ status: 'success', message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Error al eliminar el usuario' });
    }
});

export default router;