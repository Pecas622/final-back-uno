import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true }  // Asegúrate de que 'category' esté marcado como requerido
});

export const ProductsModel = mongoose.model('Product', productSchema);
