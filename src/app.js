import express from 'express';
import handlebars from 'express-handlebars';
import routerApp from './routes/index.js';
import { connectDB } from './config/index.js';
import 'dotenv/config';
const app = express();
const PORT = process.env.PORT || 8080;

// 🔹 Conectar a MongoDB con manejo de errores
connectDB().catch(error => {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1);
});

// 🔹 Configuración de Handlebars
const hbs = handlebars.create({
    extname: '.hbs',
    helpers: {
        // Helper eq para comparar valores
        eq: function(a, b) {
            return a === b;
        }
    }
});

app.engine('hbs', hbs.engine);
app.set('views', './src/views');
app.set('view engine', 'hbs');

// 🔹 Middlewares
app.use(express.static('src/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔹 Rutas principales
app.use(routerApp);

// 🔹 Ruta para productos en tiempo real SIN WebSockets
app.get('/realtimeproducts', async (req, res) => {
    try {
        const response = await fetch('http://localhost:8080/api/products');
        const data = await response.json();
        res.render('realTimeProducts', { products: data.payload || [] });
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.render('realTimeProducts', { products: [] });
    }
});

// 🔹 Iniciar servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
});
