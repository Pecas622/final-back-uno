import fs from 'fs/promises';
import path from 'path';

export default class ProductManager {
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

    async getProducts() {
        return await this.#readFile();
    }

    async getProductById(id) {
        const products = await this.#readFile();
        return products.find((p) => p.id == id);
    }

    async addProduct(product) {
        const products = await this.#readFile();

        const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
        const newProduct = { id: newId, ...product };

        products.push(newProduct);
        await this.#writeFile(products);

        return newProduct;
    }

    async updateProduct(id, updates) {
        const products = await this.#readFile();
        const index = products.findIndex((p) => p.id == id);

        if (index === -1) return null;

        products[index] = { ...products[index], ...updates, id: products[index].id };

        await this.#writeFile(products);
        return products[index];
    }

    async deleteProduct(id) {
        const products = await this.#readFile();
        const updated = products.filter((p) => p.id != id);
        await this.#writeFile(updated);
        return { success: true };
    }
}
