import mongoose, { Types } from 'mongoose'


const ordersCollections = 'orders'

const ordersSchema = new mongoose.Schema({
    name: String,
    size: {
        type: String,
        enum: ["small", "medium", "large"],
        default: "medium" 
    },
    price: Number,
    quantity: Number,
    date: Date
    
})

export const ordersModel = mongoose.model(ordersCollections, ordersSchema)

// role 