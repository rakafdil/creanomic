//product.routes.js
import express from 'express'
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsBySeller,
    getProductsByStore,
    searchProducts,
    updateStock
} from './product.controller.js'

export default (supabase) => {
    const router = express.Router()

    router.get('/search', searchProducts(supabase))
    router.get('/', getAllProducts(supabase))
    router.get('/seller/:sellerId', getProductsBySeller(supabase))
    router.get('/store/:storeId', getProductsByStore(supabase))
    router.get('/:id', getProductById(supabase))
    router.post('/', createProduct(supabase))
    router.put('/:id', updateProduct(supabase))
    router.patch('/:id/stock', updateStock(supabase))
    router.delete('/:id', deleteProduct(supabase))

    return router
}