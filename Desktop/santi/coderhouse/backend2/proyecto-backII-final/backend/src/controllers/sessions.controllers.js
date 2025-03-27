import {generateToken} from '../utils/jwt.js'
export const login = async (req,res) => {
    try {
        if(!req.user) 
            return res.status(400).json({message: "Usuario o contraseña no validos"})
        
        //Sesion de BDD
        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name,
            rol: req.user.rol
        } 
        //Retornar un token de JWT
        return res.status(200).cookie('Pecas622', generateToken(req.user), {
            httpOnly: true,
            secure: false, //Evitar errores de https
            maxAge: 86400000 //Un dia en mls
        }).json({message: "Usuario logueado correctamente"})
    } catch (e) {
        return res.status(500).json({message: e})
    }
    
}

export const register = async (req,res) => {
    try {
        if(!req.user)
            return res.status(400).json({message: "Email y contraseña son obligatorios"})
        
        return res.status(201).json({message: "Usuario registrado correctamente"})
    } catch (e) {
        res.status(500).json({message: e})
    }
}

export const githubLogin = (req,res) => {
    try {
        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name,
            rol: req.user.rol
        } 
        res.status(200).cookie('Pecas622', generateToken(req.user), {
            httpOnly: true,
            secure: false, //Evitar errores de https
            maxAge: 86400000 //Un dia en mls
        }).redirect('/api/products')
    } catch (e) {
        res.status(500).json({message: e})
    }
}

export const viewRegister = (req,res) => {
    res.status(200).render('templates/register', {
        title: "Registro de Usuarios",
        url_js: "/js/register.js",
        url_css: "/css/main.css"
    })
}

export const viewLogin = (req,res) => {
    res.status(200).render('templates/login', {
        title: "Inicio de Sesion de Usuarios",
        url_js: "/js/login.js",
        url_css: "/css/main.css"
    })
}