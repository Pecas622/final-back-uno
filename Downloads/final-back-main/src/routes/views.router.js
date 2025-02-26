import { Router } from 'express'
import { modelUser } from '../models/users.model.js'

const router = Router()

router.get('/', (req, res) => {
    res.render('home')
})

router.get('/users', async (req, res) => {

    const { limit = 10, numPage = 1 } = req.query

    const {
        docs,
        page,

        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage
    } = await modelUser.paginate({}, { limit, page: numPage, lean: true })
    res.render('users', {
        users: docs,
        hasNextPage,
        hasPrevPage,
        prevPage,
        nextPage,
        page
    })
})

export default router

