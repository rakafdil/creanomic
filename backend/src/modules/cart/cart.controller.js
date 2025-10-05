//cart.controller.js
import { catchAsyncError } from "../../utils/catchAsyncError.js"
import { AppError } from "../../utils/AppError.js"
import CartService from "./cart.service.js"

const addToCart = (supabase) =>
    catchAsyncError(async (req, res, next) => {
        const cartService = new CartService(supabase)
        const { userId, productId, quantity, price, sellerId } = req.body

        if (!userId || !productId || !quantity || !price || !sellerId) {
            return next(new AppError("Missing required fields", 400))
        }

        const data = await cartService.addItem(userId, productId, quantity, price, sellerId)
        res.status(201).json({
            message: "Item added to cart successfully",
            data
        })
    })

const getCart = (supabase) =>
    catchAsyncError(async (req, res, next) => {
        const cartService = new CartService(supabase)
        const { userId } = req.query

        if (!userId) {
            return next(new AppError("UserId is required", 400))
        }

        const data = await cartService.getCart(userId)
        res.json({ message: "success", data })
    })

const removeFromCart = (supabase) =>
    catchAsyncError(async (req, res, next) => {
        const cartService = new CartService(supabase)
        const { productId } = req.params
        const { userId } = req.body

        if (!userId) {
            return next(new AppError("UserId is required", 400))
        }

        const data = await cartService.removeItem(userId, productId)
        res.json({ message: "success", data })
    })

const updateCartItem = (supabase) =>
    catchAsyncError(async (req, res, next) => {
        const cartService = new CartService(supabase)
        const { productId } = req.params
        const { userId, quantity } = req.body

        if (!userId || quantity === undefined) {
            return next(new AppError("UserId and quantity are required", 400))
        }

        const data = await cartService.updateItemQuantity(userId, productId, quantity)
        res.json({ message: "Cart item updated successfully", data })
    })

const clearCart = (supabase) =>
    catchAsyncError(async (req, res, next) => {
        const cartService = new CartService(supabase)
        const { userId } = req.body

        if (!userId) {
            return next(new AppError("UserId is required", 400))
        }

        const data = await cartService.clearCart(userId)
        res.json({ message: "success", data })
    })

const applyCoupon = (supabase) =>
    catchAsyncError(async (req, res, next) => {
        const cartService = new CartService(supabase)
        const { userId, couponCode } = req.body

        if (!userId || !couponCode) {
            return next(new AppError("UserId and couponCode are required", 400))
        }

        const data = await cartService.applyCoupon(userId, couponCode)
        res.json({ message: "Coupon applied successfully", data })
    })

export {
    addToCart,
    getCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    applyCoupon
}