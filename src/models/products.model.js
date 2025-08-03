// products.model.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: String,
    category: String,
    price: Number,
    stock: Number
});

// Exportar el modelo con el nombre 'Product'
const productModel = mongoose.model('Product', productSchema);

export { productModel };