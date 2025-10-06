import SellerService from "./seller.service.js"
import { catchAsyncError } from "../../utils/catchAsyncError.js"
import { AppError } from "../../utils/AppError.js"

/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 * @typedef {import("express").NextFunction} NextFunction
 * @typedef {import("@supabase/supabase-js").SupabaseClient} SupabaseClient
 */

export class SellerController {
    /**
     * @param {SupabaseClient} supabase
     */
    constructor(supabase) {
        this.supabase = supabase
        this.sellerService = new SellerService(supabase)

        this.getProducts = catchAsyncError(this.getProducts.bind(this))
        this.addProduct = catchAsyncError(this.addProduct.bind(this))
        this.editProduct = catchAsyncError(this.editProduct.bind(this))
        this.deleteProduct = catchAsyncError(this.deleteProduct.bind(this))
        this.changeRole = catchAsyncError(this.changeRole.bind(this))
    }

    /**
     * Get all products for a seller
     * @param {Request} req
     * @param {Response} res
     */
    async getProducts(req, res) {
        const { sellerId } = req.params

        if (!sellerId) {
            throw new AppError('Seller ID is required', 400)
        }

        const products = await this.sellerService.getProducts(sellerId)

        res.status(200).json({
            status: 'success',
            message: 'Products retrieved successfully',
            data: { products }
        })
    }

    /**
     * Add new product
     * @param {Request} req
     * @param {Response} res
     */
    async addProduct(req, res) {
        const { sellerId } = req.params
        const productData = req.body

        if (!sellerId) {
            throw new AppError('Seller ID is required', 400)
        }

        const result = await this.sellerService.addProduct(productData, sellerId)

        res.status(201).json({
            status: 'success',
            message: result.message || 'Product added successfully',
            data: { product: result.newProduct }
        })
    }

    /**
     * Edit existing product
     * @param {Request} req
     * @param {Response} res
     */
    async editProduct(req, res) {
        const { sellerId, productId } = req.params
        const changedData = req.body

        if (!sellerId || !productId) {
            throw new AppError('Seller ID and Product ID are required', 400)
        }

        const result = await this.sellerService.editProduct(sellerId, productId, changedData)

        res.status(200).json({
            status: 'success',
            message: result.message || 'Product updated successfully',
            data: { product: result.newData }
        })
    }

    /**
     * Delete product
     * @param {Request} req
     * @param {Response} res
     */
    async deleteProduct(req, res) {
        const { sellerId, productId } = req.params

        if (!sellerId || !productId) {
            throw new AppError('Seller ID and Product ID are required', 400)
        }

        const result = await this.sellerService.deleteProduct(sellerId, productId)

        res.status(200).json({
            status: 'success',
            message: result.message,
            data: { deletedProduct: result.deletedProduct }
        })
    }

    /**
     * Change user role to seller
     * @param {Request} req
     * @param {Response} res
     */
    async changeRole(req, res) {
        const { userId } = req.params
        const reqData = req.body

        if (!userId) {
            throw new AppError('User ID is required', 400)
        }

        const result = await this.sellerService.changeRoleToSeller(userId, reqData)

        res.status(200).json({
            status: 'success',
            message: result.message,
            data: {
                user: result.user,
                seller: result.seller
            }
        })
    }
}