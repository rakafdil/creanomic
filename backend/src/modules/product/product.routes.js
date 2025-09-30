import express from 'express'
import { getAllProducts } from './product.controller.js'

export default (supabase) => {
    const router = express.Router()
    router.get('/', getAllProducts(supabase))
    return router
}