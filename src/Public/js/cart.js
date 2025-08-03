// cart.js

async function addToCart(productId, quantity = 1) {
    try {
        const response = await fetch(`/api/carts/${CART_ID}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, quantity }),
        });

        const data = await response.json();

        if (data.success || response.status === 200) {
            alert('Producto agregado al carrito');
        } else {
            alert('Error: ' + (data.message || 'No se pudo agregar'));
        }
    } catch (error) {
        console.error(error);
        alert('Error en la conexión');
    }
}
