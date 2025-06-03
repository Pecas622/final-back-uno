import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const cartManager = new CartManager('src/data/carts.json');

router.post('/', async (req, res) => {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
});

router.get('/:cid', async (req, res) => {
    const cart = await cartManager.getCartById(req.params.cid);
    res.json(cart || { error: 'Carrito no encontrado' });
});

router.post('/:cid/product/:pid', async (req, res) => {
    const result = await cartManager.addProductToCart(req.params.cid, req.params.pid);
    res.status(200).json(result);
});

export default router;
