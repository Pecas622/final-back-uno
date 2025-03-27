import { Link } from "react-router-dom";
import '../App.css'

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/register">Registrarse</Link></li>
                <li><Link to="/login">Iniciar Sesión</Link></li>
                <li><Link to="/products">Ver Productos</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
