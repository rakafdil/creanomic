import * as cartService from "./cart.service.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";

// Tambah item ke cart
export const addToCart = catchAsyncError(async (req, res) => {
    const { userId, product } = req.body;
    const cart = await cartService.addToCart(userId, product);
    res.status(201).json({ status: "success", data: cart });
});

// Ambil cart user
export const getCart = catchAsyncError(async (req, res) => {
    const userId = req.query.userId || req.body.userId;
    const cart = await cartService.getCart(userId);
    res.status(200).json({ status: "success", data: cart });
});

// Hapus item
export const removeFromCart = catchAsyncError(async (req, res) => {
    const userId = req.query.userId || req.body.userId;
    const productId = req.params.id;
    const cart = await cartService.removeFromCart(userId, productId);
    res.status(200).json({ status: "success", data: cart });
});

// Update item
export const updateCartItem = catchAsyncError(async (req, res) => {
    const userId = req.query.userId || req.body.userId;
    const productId = req.params.id;
    const { quantity } = req.body;
    const cart = await cartService.updateCartItem(userId, productId, quantity);
    res.status(200).json({ status: "success", data: cart });
});

// Apply coupon
export const applyCoupon = catchAsyncError(async (req, res) => {
    const { userId, couponCode } = req.body;
    const cart = await cartService.applyCoupon(userId, couponCode);
    res.status(200).json({ status: "success", data: cart });
});