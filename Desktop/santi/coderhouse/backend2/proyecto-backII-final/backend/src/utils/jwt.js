import jwt from 'jsonwebtoken';

// Usar una clave secreta directamente
const secretKey = "Pecas622";

export const generateToken = (user) => {
    // Verificar que el usuario tenga los campos requeridos
    if (!user || !user._id || !user.first_name || !user.last_name || !user.email || !user.rol) {
        throw new Error('El usuario no tiene todos los campos necesarios');
    }

    const token = jwt.sign({
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        age: user.age,
        email: user.email,
        rol: user.rol
    }, secretKey, { expiresIn: '24h' });

    return token;
};

// Ejemplo de generación de token para un usuario admin
const adminUser = {
    _id: "67d43b99567d54211674d1cd",
    first_name: "Santiago",
    last_name: "Zorrilla",
    age: 19,
    email: "santiagozorrilla5@gmail.com",
    rol: "admin"
};

const token = generateToken(adminUser);
console.log("Token generado:", token);
