    import { connect } from "mongoose";
    // import { ProductsModel } from "../models/products.model.js";
    import "dotenv/config";

    export const connectDB = async () => {
        try {
            console.log("Conectando a la base de datos...");
            await connect(process.env.MONGO_URI);
            console.log("Base de datos conectada");

            // Insertar productos en la base de datos
            // const result = await ProductsModel.insertMany([
            //     { name: "Mate Imperial", size: "grande", price: 5000, quantity: 10, category: "Mates" },
            //     { name: "Mate Camionero", size: "mediano", price: 4500, quantity: 15, category: "Mates" },
            //     { name: "Mate Torpedo", size: "chico", price: 4000, quantity: 20, category: "Mates" },
            //     { name: "Mate de Algarrobo", size: "grande", price: 6000, quantity: 5, category: "Mates" },
            //     { name: "Mate de Vidrio", size: "mediano", price: 3500, quantity: 25, category: "Mates" }
            // ]);

            // console.log("Productos insertados en Atlas:");

        } catch (error) {
            console.error("Error al conectar la base de datos:", error);
        }
    };
