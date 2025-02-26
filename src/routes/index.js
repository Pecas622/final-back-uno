import { Router } from 'express'
import routerViews from './views.router.js'
import routerUsers from './api/users.router.js'
import routerCarts from './api/carts.routes.js'
import routerProducts from './api/products.routes.js'


const router = Router()

// conf
router.use('/', routerViews)
router.use('/api/users', routerUsers)
router.use('/api/carts', routerCarts)
router.use('/api/products',routerProducts)

export default router