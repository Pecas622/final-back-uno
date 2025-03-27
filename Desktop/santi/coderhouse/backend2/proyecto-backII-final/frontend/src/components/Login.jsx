import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css'
const Login = () => {
    const formRef = useRef()
    const nav = useNavigate()
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const formData = new FormData(formRef.current)
            const userData = Object.fromEntries(formData)

            const response = await fetch('/api/sessions/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
                credentials: "include" //Permito el envio de cookies entre mi server y mi frontend
            })

            if (response.status == 200) {
                console.log("Usuario Logueado")
                e.target.reset()
                nav("/products")
            } else {
                console.log(response);
            }

        } catch (e) {
            console.log(e)
        }
    }
    return (

        <div className="form-container">
            <h2 className="title-form">Login</h2>
            <form action="" ref={formRef} onSubmit={handleSubmit} className="form-session">
                <input type="email" placeholder="Email" name="email" />
                <input type="password" placeholder="Password" name="password" />
                <button type="submit">Loguear Usuario</button>
            </form>
        </div>


    );
};

export default Login;