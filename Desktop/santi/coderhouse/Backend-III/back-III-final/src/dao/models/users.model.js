import { Schema, model } from "mongoose";

const collection = "santiagoUsers"; // Tu nombre personalizado
const schema = new Schema(
    {
        name: { type: String },
        date: { type: Date },
        email: { type: String, required: true, unique: true, index: true },
        password: { type: String, required: true },
        avatar: {
            type: String,
            default: "https://cdn-icons-png.flaticon.com/512/147/147142.png", // Avatar diferente
        },
        role: {
            type: String,
            default: "USER",
            enum: ["USER", "ADMIN", "PREM"],
            index: true,
        },
    },
    { timestamps: true }
);

const SantiagoUser = model(collection, schema);
export default SantiagoUser;
