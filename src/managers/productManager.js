import { productModel } from '../models/products.models.js';

class ProductManager {
    /**
     * Obtiene productos con filtros, paginación y ordenamiento
     * @param {Object} options - Opciones de consulta
     * @param {number} options.limit - Límite de productos por página
     * @param {number} options.page - Número de página
     * @param {string} options.sort - Ordenamiento ('asc' o 'desc')
     * @param {string} options.query - Filtro de categoría
     * @returns {Array} Lista de productos
     */
    async getProducts({ limit = 10, page = 1, sort, query }) {
        try {
            // Asegurar que limit y page sean números válidos
            limit = Number(limit);
            page = Number(page);
            if (isNaN(limit) || isNaN(page) || limit < 1 || page < 1) {
                throw new Error('Los parámetros "limit" y "page" deben ser números mayores a 0.');
            }

            const filters = query ? { category: query } : {};

            const sortOptions = {};
            if (sort === 'asc') {
                sortOptions.price = 1;
            } else if (sort === 'desc') {
                sortOptions.price = -1;
            }

            const products = await productModel.find(filters)
                .skip((page - 1) * limit)
                .limit(limit)
                .sort(sortOptions)
                .lean(); // Mejora rendimiento evitando conversiones innecesarias

            return products;
        } catch (error) {
            throw new Error('Error al obtener los productos: ' + error.message);
        }
    }

    /**
     * Cuenta la cantidad total de productos en base a un filtro de categoría
     * @param {string} query - Filtro de categoría
     * @returns {number} Número total de productos que coinciden
     */
    async countProducts(query) {
        try {
            const filters = query ? { category: query } : {};
            return await productModel.countDocuments(filters);
        } catch (error) {
            throw new Error('Error al contar los productos: ' + error.message);
        }
    }
}

export default new ProductManager();
