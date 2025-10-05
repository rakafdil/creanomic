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

const createProduct = (supabase) =>
    catchAsyncError(async (req, res, next) => {
        const productService = new ProductService(supabase)
        const { seller_id, price, name, description, discount, img_url, stock_quantity } = req.body

        if (!seller_id || !price || !name || !description || stock_quantity === undefined) {
            return next(new AppError("Missing required fields", 400))
        }

        const productData = {
            seller_id,
            price,
            name,
            description,
            discount: discount || null,
            img_url: img_url || null,
            stock_quantity
        }

        const data = await productService.createProduct(productData)
        res.status(201).json({ message: "Product created successfully", data })
    })

const updateProduct = (supabase) =>
    catchAsyncError(async (req, res, next) => {
        const productService = new ProductService(supabase)
        const { id } = req.params
        const updateData = req.body

        delete updateData.id
        delete updateData.created_at

        const data = await productService.updateProduct(id, updateData)
        
        if (!data) {
            return next(new AppError("Product not found", 404))
        }

        res.json({ message: "Product updated successfully", data })
    })

const deleteProduct = (supabase) =>
    catchAsyncError(async (req, res, next) => {
        const productService = new ProductService(supabase)
        const { id } = req.params

        await productService.deleteProduct(id)
        res.json({ message: "Product deleted successfully" })
    })

const getProductsBySeller = (supabase) =>
    catchAsyncError(async (req, res, next) => {
        const productService = new ProductService(supabase)
        const { sellerId } = req.params

        const data = await productService.getProductsBySeller(sellerId)
        res.json({ message: "success", results: data.length, data })
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

const updateStock = (supabase) =>
    catchAsyncError(async (req, res, next) => {
        const productService = new ProductService(supabase)
        const { id } = req.params
        const { stock_quantity } = req.body

        if (stock_quantity === undefined) {
            return next(new AppError("Stock quantity is required", 400))
        }

        const data = await productService.updateStock(id, stock_quantity)
        res.json({ message: "Stock updated successfully", data })
    })

export {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsBySeller,
    getProductsByStore,
    searchProducts,
    updateStock
}