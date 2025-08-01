import { Router } from 'express'
import { productModel } from '../models/products.model.js'

const router = Router()

// Middleware para pasar cartId a todas las vistas
router.use((req, res, next) => {
    res.locals.cartId = req.session?.cartId || null
    next()
})

// Vista paginada de productos
router.get('/products', async (req, res) => {
    const { page = 1, limit = 10, query, sort } = req.query

    // Filtro por categoría si se envía query
    let filter = {}
    if (query) filter.category = query

    // Opciones para paginación
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        lean: true,
        sort: {}
    }

    // Ordenamiento por precio
    if (sort === 'asc') options.sort.price = 1
    if (sort === 'desc') options.sort.price = -1

    try {
        const result = await productModel.paginate(filter, options)

        res.render('products/index', {
            products: result.docs,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            totalPages: result.totalPages,
            query,
            sort,
            limit: options.limit
        })
    } catch (error) {
        console.error('Error paginando productos:', error)
        res.status(500).send('Error al cargar productos')
    }
})

// Vista de detalle de producto
router.get('/products/:id', async (req, res) => {
    const { id } = req.params

    try {
        const product = await productModel.findById(id).lean()

        if (!product) {
            return res.status(404).send('Producto no encontrado')
        }

        res.render('products/detail', {
            product // `cartId` disponible por `res.locals.cartId`
        })
    } catch (error) {
        console.error('Error obteniendo el producto:', error)
        res.status(500).send('Error al cargar el producto')
    }
})

export default router
