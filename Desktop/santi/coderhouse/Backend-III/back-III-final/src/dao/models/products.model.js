import { Schema, Types, model } from "mongoose";

const collection = "santiagoProducts"; 
const schema = new Schema(
    {
        title: { type: String, required: true, index: true },
        description: { type: String },
        category: {
            type: String,
            default: "Laptops",
            enum: [
                "Tablets", "Smartphones", "Laptops", "Smartwatches", "Headphones",
                "Speakers", "Desktops", "Streaming Devices", "Keyboards", "Accessories",
                "Virtual Reality", "Fitness", "Cameras", "Gaming", "Televisions", "Soundbars"
            ],
            index: true,
        },
        image: {
            type: String,
            default: "https://cdn-icons-png.flaticon.com/512/2748/2748558.png", // Imagen distinta
        },
        price: { type: Number, default: 10 },
        stock: { type: Number, default: 10 },
        onsale: { type: Boolean, default: false },
        owner_id: { type: Types.ObjectId, ref: "santiagoUsers", index: true }, // Referencia personalizada
    },
    { timestamps: true }
);

// Pre-populación de datos del dueño
schema.pre(/^find/, function () {
    this.populate("owner_id", "email avatar");
});

const SantiagoProduct = model(collection, schema);
export default SantiagoProduct;
