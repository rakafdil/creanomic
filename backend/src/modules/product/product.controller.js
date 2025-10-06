//product.controller.js
import { catchAsyncError } from "../../utils/catchAsyncError.js"
import { AppError } from "../../utils/AppError.js"
import ProductService from "./product.service.js"

const getAllProducts = (supabase) =>
    catchAsyncError(async (req, res, next) => {
        const productService = new ProductService(supabase)
        
        const filters = {
            minPrice: req.query.minPrice,
            maxPrice: req.query.maxPrice,
            sellerId: req.query.sellerId,
            inStock: req.query.inStock === 'true'
        }

        const data = await productService.getAllProducts(filters)
        res.json({ message: "success", results: data.length, data })
    })

const getProductById = (supabase) =>
    catchAsyncError(async (req, res, next) => {
        const productService = new ProductService(supabase)
        const { id } = req.params

        const data = await productService.getProductById(id)
        
        if (!data) {
            return next(new AppError("Product not found", 404))
        }

        res.json({ message: "success", data })
    })

const getProductsByStore = (supabase) =>
    catchAsyncError(async (req, res, next) => {
        const productService = new ProductService(supabase)
        const { storeId } = req.params

        const data = await productService.getProductsByStore(storeId)
        res.json({ message: "success", results: data.length, data })
    })

const searchProducts = (supabase) =>
    catchAsyncError(async (req, res, next) => {
        const productService = new ProductService(supabase)
        const { q } = req.query

        if (!q) {
            return next(new AppError("Search query is required", 400))
        }

        const data = await productService.searchProducts(q)
        res.json({ message: "success", results: data.length, data })
    })

export {
    getAllProducts,
    getProductById,
    getProductsByStore,
    searchProducts
}