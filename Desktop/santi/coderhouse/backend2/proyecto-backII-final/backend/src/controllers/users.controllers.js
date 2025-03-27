import userModel from "../models/users.models.js"

export const getUsers = async (req,res) => {
    try {
        const users = await userModel.find()
        res.status(200).send(users)
    } catch (e) {
        res.status(500).send(e)
    }
}

export const getUser = async (req,res) => {
    try {
        const userId = req.params.uid
        console.log(userId);
        
        const user = await userModel.findById(userId)
        if(user) {
            res.status(200).send(user)
        } else {
            res.status(404).send("Usuario no encontrado")
        }
            
    } catch (e) {
        res.status(500).send(e)
    }
}

export const createUser = async (req,res) => {
    try {
        const {first_name, last_name, email, password, age} = req.body
        let mensaje = await userModel.create({first_name, last_name, email, password, age})
        res.status(201).send(`Usuario creado con el id: ${mensaje?._id}`)
    } catch (e) {
        res.status(500).send(e)
    }
}

export const updateUser = async (req,res) => {
    try {
        const {first_name, last_name, email, password, age} = req.body
        const userID = req.params.uid
        let mensaje = await userModel.findByIdAndUpdate(userID, {first_name, last_name, email, password, age})
        if(mensaje)
            res.status(200).send(`Usuario actualizado con el id: ${mensaje?._id}`)
        else
            res.status(404).send("Usuario no existe")
    } catch (e) {
        res.status(500).send(e)
    }
}

export const deleteUser = async (req,res) => {
    try {
        const userID = req.params.uid
        let mensaje = await userModel.findByIdAndDelete(userID)
        if(mensaje)
            res.status(200).send(`Usuario eliminado con el id: ${mensaje?._id}`)
        else
            res.status(404).send("Usuario no existe")
    } catch (e) {
        if(e?.message.includes("Cast to ObjectId failed for value"))
            res.status(400).send("Error al eliminar usuario debido a que el id enviado no contiene la estructura correcta")
        else
            res.status(500).send(e)
    }
}