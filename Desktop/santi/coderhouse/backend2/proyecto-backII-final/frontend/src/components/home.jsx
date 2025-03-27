import { Link } from "react-router-dom";
import '../App.css'

const Home = () => {
    return (
        <div className="home-container">
            <h1>Bienvenido a la página principal</h1>
            <nav>
                <ul>
                    <li><Link to="/register">Registrarse</Link></li>
                    <li><Link to="/login">Iniciar Sesión</Link></li>
                    <li><Link to="/products">Ver Productos</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Home;
