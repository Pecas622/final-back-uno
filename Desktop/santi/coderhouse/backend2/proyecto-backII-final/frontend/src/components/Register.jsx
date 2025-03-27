import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css'
const Register = () => {
    const formRef = useRef()
    const nav = useNavigate()
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const formData = new FormData(formRef.current)
            const userData = Object.fromEntries(formData)

            const response = await fetch('/api/sessions/register', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            })

            if (response.status == 201) {
                console.log("Usuario registrado")
                e.target.reset()
                nav("/login")
            } else {
                console.log(response);

            }

        } catch (e) {
            console.log(e)
        }
    }
    return (

        <div className="form-container">
            <h2 className="title-form">Registrar Usuario</h2>
            <form action="" ref={formRef} onSubmit={handleSubmit} className="form-session">
                <input type="text" placeholder="First Name" name="first_name" />
                <input type="text" placeholder="Last Name" name="last_name" />
                <input type="number" placeholder="Age" name="age" />
                <input type="email" placeholder="Email" name="email" />
                <input type="password" placeholder="Password" name="password" />
                <button type="submit">Registrar Usuario</button>
            </form>
        </div>


    );
};

export default Register;