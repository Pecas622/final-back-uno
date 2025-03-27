import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Products from "./components/Products";
import Register from "./components/Register";
import Login from"./components/Login"
import Navbar from "./components/Navbar"; // Importa el Navbar

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar siempre visible */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
