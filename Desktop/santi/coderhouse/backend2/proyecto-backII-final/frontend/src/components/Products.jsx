import { useState, useEffect } from "react";

const Products = () => {
    const [prods, setProds] = useState(null);

    useEffect(() => {
        const fetchProds = async () => {
            try {
                const response = await fetch("/api/products", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });

                if (response.status === 200) {
                    const data = await response.json();
                    console.log("Respuesta del backend:", data);
                    setProds(data);
                } else {
                    console.log("Error en la respuesta:", response);
                }
            } catch (e) {
                console.log("Error en fetch:", e);
            }
        };

        fetchProds();
    }, []);

    useEffect(() => {
        console.log("Estado actualizado:", prods);
    }, [prods]);

    return (
        <div>
            <h1>Products Component</h1>
            {prods && prods.docs && prods.docs.length > 0 ? (
                <ul>
                    {prods.docs.map((product) => (
                        <li key={product._id || product.id}>
                            <h2>{product.title || product.name}</h2>
                            <p>{product.description || "Sin descripción"}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Cargando productos...</p>
            )}
        </div>
    );
};

export default Products;
