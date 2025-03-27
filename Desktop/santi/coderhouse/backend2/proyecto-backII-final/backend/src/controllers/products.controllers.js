import productModel from '../models/products.models.js'

// Obtener productos con paginación y filtros
export const getProducts = async (req, res) => {
    try {
        const { limit, page, metFilter, filter, metOrder, ord } = req.query;

        const pag = page ? parseInt(page) : 1;
        const limi = limit ? parseInt(limit) : 10; // Si no hay límite, por defecto 10

        // Filtros de búsqueda
        const filQuery = metFilter ? { [metFilter]: filter } : {};

        // Orden
        const ordQuery = metOrder ? { [metOrder]: ord === 'desc' ? -1 : 1 } : {};

        // Consulta con paginación y filtros
        const prods = await productModel.paginate(filQuery, { 
            limit: limi, 
            page: pag, 
            sort: ordQuery, 
            lean: true 
        });

        // Agregar números de páginas
        prods.pageNumbers = Array.from({ length: prods.totalPages }, (_, i) => ({
            number: i + 1,
            isCurrent: i + 1 === prods.page
        }));

        res.status(200).json(prods);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

// Obtener un solo producto
export const getProduct = async (req, res) => {
    try {
        const idProd = req.params.pid;
        const prod = await productModel.findById(idProd);
        if (prod) {
            res.status(200).json(prod);
        } else {
            res.status(404).json({ message: "Producto no existe" });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

// Crear un nuevo producto
export const createProduct = async (req, res) => {
    try {
        const { title, description, category, price, stock, code, thumbnail } = req.body;

        if (!title || !description || !category || !price || !stock || !code) {
            return res.status(400).json({ error: "Todos los campos obligatorios deben estar completos." });
        }

        if (isNaN(price) || isNaN(stock)) {
            return res.status(400).json({ error: "Stock y precio deben ser números válidos." });
        }

        const newProduct = await productModel.create({
            title, 
            description, 
            category, 
            price: parseFloat(price), 
            stock: parseInt(stock), 
            code, 
            thumbnail: thumbnail || []
        });

        res.status(201).json(newProduct);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

// Actualizar un producto existente
export const updateProduct = async (req, res) => {
    try {
        const idProd = req.params.pid;
        const updateProduct = req.body;

        const rta = await productModel.findByIdAndUpdate(idProd, updateProduct, { new: true });

        if (rta) {
            res.status(200).json({ message: "Producto actualizado correctamente", product: rta });
        } else {
            res.status(404).json({ message: "Producto no existe" });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

// Eliminar un producto
export const deleteProduct = async (req, res) => {
    try {
        const idProd = req.params.pid;
        const rta = await productModel.findByIdAndDelete(idProd);

        if (rta) {
            res.status(200).json({ message: "Producto eliminado correctamente" });
        } else {
            res.status(404).json({ message: "Producto no existe" });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
