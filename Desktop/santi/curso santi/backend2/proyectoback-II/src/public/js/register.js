document.addEventListener('DOMContentLoaded', () => {
    const formRegister = document.getElementById("registerForm");

    formRegister.addEventListener('submit', async (e) => {
        try {
            e.preventDefault();

            const formData = new FormData(formRegister); // Consulto el HTML y lo transformo en un objeto iterator
            const userData = Object.fromEntries(formData); // Transformo un objeto iterator en un objeto simple

            const response = await fetch('http://localhost:8080/api/sessions/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
                credentials: "include", // Permitir el trabajo vía cookies
            });

            const data = await response.json();

            if (data?.message === "Usuario registrado correctamente") {
                Toastify({
                    text: data.message,
                    duration: 3000,
                    close: true,
                    gravity: "top", // `top` o `bottom`
                    position: "right", // `left`, `center` o `right`
                    stopOnFocus: true, // Evita que el toast se cierre al hacer hover
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                }).showToast();

                setTimeout(() => {
                    window.location.href = "http://localhost:8080/api/sessions/viewlogin"; // Redirige después de 3 segundos
                }, 3000);

            } else {
                console.error("Error al registrar el usuario:", data);
            }
        } catch (e) {
            console.error("Error en el proceso de registro:", e); // Mejora el manejo de errores
        }
    });
});
