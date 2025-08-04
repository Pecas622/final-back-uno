import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema({
    title: String,
    category: String,
    price: Number,
    stock: Number
});

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model('Product', productSchema);

export { productModel };
