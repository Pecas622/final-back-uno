import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager('src/data/products.json');

router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.json(products);
});

router.get('/:pid', async (req, res) => {
    const product = await productManager.getProductById(req.params.pid);
    res.json(product || { error: 'Producto no encontrado' });
});

router.post('/', async (req, res) => {
    const nuevoProducto = await productManager.addProduct(req.body);
    res.status(201).json(nuevoProducto);
});

// PUT y DELETE también aquí...
export default router;
