import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    name: String,
    size: String,
    quantity: Number
});

const ordersModel = mongoose.model("Order", orderSchema);

export default ordersModel;
