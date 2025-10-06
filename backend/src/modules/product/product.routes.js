//product.routes.js
import express from 'express'
import {
    getAllProducts,
    getProductById,
    getProductsByStore,
    searchProducts,
} from './product.controller.js'

export default (supabase) => {
    const router = express.Router()

    router.get('/search', searchProducts(supabase))
    router.get('/', getAllProducts(supabase))
    router.get('/store/:storeId', getProductsByStore(supabase))
    router.get('/:id', getProductById(supabase))

    return router
}