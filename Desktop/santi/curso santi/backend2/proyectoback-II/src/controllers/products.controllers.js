import productModel from '../models/products.models.js'

export const getProducts = async(req,res) => {
    try {
        const {limit, page, metFilter, filter, metOrder, ord} = req.query

        const pag = page !== undefined ? page : 1
        const limi = limit !== undefined || limit !== null ? limit : 10 //Si me ingresan el limite lo tomo, sino por defecto es 10

                                                    //[category] : "bebidas"
        const filQuery = metFilter !== undefined ? {[metFilter] : filter} : {}
                                                //price: asc
        const ordQuery = metOrder !== undefined ? {metOrder: ord} : {}

        const prods = await productModel.paginate(filQuery,{limit: limi, page: pag, ordQuery, lean: true})

        //Poder trabajar con el array de paginas para visualizar
        prods.pageNumbers = Array.from({length: prods.totalPages}, (_, i) => ({
            number: i + 1,
            isCurrent: i + 1 === prods.page //La pagina actual es igual a la pagina de prods
        }))
        
        res.status(200).send(prods)

    } catch (e) {
        res.status(500).send(e)
    }
}

export const getProduct = async(req,res) => {
    try {
        const idProd = req.params.pid
        const prod = await productModel.findById(idProd)
        if(prod)
            res.status(200).send(prod)
        else
            res.status(404).send({message:"Producto no existe"})
    } catch (e) {
        res.status(500).send(e)
    }
}

export const createProduct = async(req,res) => {
    try {
        const {title, description, category, code, price, stock} = req.body
        const newProduct = await productModel.create({
            title, description, category, code, price, stock
        })
        res.status(201).send(newProduct)
    } catch (e) {
        res.status(500).send(e)
    }
}

export const updateProduct = async(req,res) => {
    try {
        const idProd = req.params.pid
        const updateProduct = req.body
        const rta = await productModel.findByIdAndUpdate(idProd, updateProduct)
        if(rta)
            res.status(200).send({message: "Producto actualizado correctamente"})
        else
            res.status(404).send({message: "Producto no existe"})
    } catch (e) {
        res.status(500).send(e)
    }
}

export const deleteProduct = async(req,res) => {
    try {
        try {
            const idProd = req.params.pid
            const rta = await productModel.findByIdAndDelete(idProd)
            if(rta)
                res.status(200).send({message: "Producto eliminado correctamenete"})
            else
                res.status(404).send({message: "Producto no existe"})
        } catch (e) {
            res.status(500).send(e)
        }
    } catch (e) {
        res.status(500).send(e)
    }
}