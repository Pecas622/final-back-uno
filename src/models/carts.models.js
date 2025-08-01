// src/models/carts.model.js
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', // Referencia al modelo de Producto
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }]
});

const cartsModel = mongoose.model('Cart', cartSchema);

export { cartsModel };
