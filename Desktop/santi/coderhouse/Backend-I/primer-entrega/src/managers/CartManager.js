import fs from 'fs/promises';
import path from 'path';

export default class CartManager {
    constructor(filename) {
        this.path = path.resolve(filename);
    }

    async #readFile() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch {
            return [];
        }
    }

    async #writeFile(data) {
        await fs.writeFile(this.path, JSON.stringify(data, null, 2));
    }

    async createCart() {
        const carts = await this.#readFile();
        const newId = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;

        const newCart = {
            id: newId,
            products: []
        };

        carts.push(newCart);
        await this.#writeFile(carts);

        return newCart;
    }

    async getCartById(cid) {
        const carts = await this.#readFile();
        return carts.find((c) => c.id == cid);
    }

    async addProductToCart(cid, pid) {
        const carts = await this.#readFile();
        const cart = carts.find((c) => c.id == cid);

        if (!cart) return null;

        const prodIndex = cart.products.findIndex((p) => p.product == pid);

        if (prodIndex >= 0) {
            cart.products[prodIndex].quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        await this.#writeFile(carts);
        return cart;
    }
}
