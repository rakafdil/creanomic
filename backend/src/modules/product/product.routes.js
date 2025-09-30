const express = require('express')
const { getAllProducts } = require('./product.controller.js')

module.exports = (supabase) => {
    const router = express.Router()
    router.get('/', getAllProducts(supabase))
    return router
}