// Asegurate que esta variable se inyecte en la plantilla con Handlebars ({{cartId}})
const CART_ID = window.CART_ID || null;

async function addToCart(productId, quantity = 1) {
    if (!CART_ID) {
        alert('Carrito no encontrado. Por favor recarga la página.');
        return;
    }

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

// Hacemos la función global para poder llamarla desde HTML
window.addToCart = addToCart;
