import { db } from "./firebase.js";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

let clientes = [];

// LOGIN
document.getElementById("btnLogin").addEventListener("click", login);

function login() {
    const pass = document.getElementById("password").value;

    if (pass === "1234") {
        document.getElementById("login").style.display = "none";
        document.getElementById("app").style.display = "block";
        obtenerClientes();
    } else {
        Swal.fire("Error", "Clave incorrecta", "error");
    }
}

// LOGOUT
document.getElementById("btnLogout").addEventListener("click", () => {
    document.getElementById("login").style.display = "block";
    document.getElementById("app").style.display = "none";
});

// CREAR CLIENTE
function crearCliente(nombre, monto, interes, plan) {
    const total = monto + (monto * interes / 100);

    return {
        nombre,
        monto,
        interes,
        total,
        plan,
        pagado: 0,
        restante: total,
        pagos: []
    };
}

// FIREBASE
async function guardarCliente(cliente) {
    await addDoc(collection(db, "clientes"), cliente);
}

async function obtenerClientes() {
    const snapshot = await getDocs(collection(db, "clientes"));

    clientes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    renderizar();
}

async function actualizar(cliente) {
    await updateDoc(doc(db, "clientes", cliente.id), cliente);
}

async function eliminarCliente(id) {
    await deleteDoc(doc(db, "clientes", id));
    obtenerClientes();
}

window.eliminarCliente = eliminarCliente;

// AGREGAR CLIENTE
document.getElementById("btnAgregar").addEventListener("click", async () => {
    const nombre = document.getElementById("nombre").value;
    const monto = parseFloat(document.getElementById("monto").value);
    const interes = parseFloat(document.getElementById("interes").value);
    const plan = document.getElementById("plan").value;

    if (!nombre || !monto || !interes) {
        Swal.fire("Error", "Completa los campos", "error");
        return;
    }

    const nuevo = crearCliente(nombre, monto, interes, plan);

    await guardarCliente(nuevo);
    obtenerClientes();

    document.getElementById("nombre").value = "";
    document.getElementById("monto").value = "";
    document.getElementById("interes").value = "";
});

// PAGOS
window.agregarPago = function (id) {
    const cliente = clientes.find(c => c.id === id);

    Swal.fire({
        title: "Registrar pago",
        input: "number"
    }).then(async res => {
        if (res.isConfirmed) {
            const monto = parseFloat(res.value);

            cliente.pagado += monto;
            cliente.restante = cliente.total - cliente.pagado;

            cliente.pagos.push({
                monto,
                fecha: new Date().toLocaleDateString()
            });

            await actualizar(cliente);
            obtenerClientes();
        }
    });
};

// RENDER
function renderizar(filtro = "") {
    const cont = document.getElementById("clientes");
    cont.innerHTML = "";

    clientes
        .filter(c => c.nombre.toLowerCase().includes(filtro.toLowerCase()))
        .forEach(c => {
            const div = document.createElement("div");
            div.className = "cliente";

            div.innerHTML = `
        <h3>${c.nombre}</h3>
        <p>Total: $${c.total}</p>
        <p class="pagado">Pagado: $${c.pagado}</p>
        <p class="restante">Restante: $${c.restante}</p>

        <button class="btn-pago" onclick="agregarPago('${c.id}')">Pago</button>
        <button class="btn-eliminar" onclick="eliminarCliente('${c.id}')">Eliminar</button>

        <div class="historial">
          ${c.pagos.map(p => `<div>${p.fecha} - $${p.monto}</div>`).join("")}
        </div>
      `;

            cont.appendChild(div);
        });
}

// BUSCADOR
document.getElementById("buscador").addEventListener("input", e => {
    renderizar(e.target.value);
});