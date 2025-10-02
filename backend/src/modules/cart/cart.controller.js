import * as cartService from "./cart.service.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";

export const addToCart = catchAsyncError(async (req, res) => {
    const cart = await cartService.addToCart(req.user.id, req.body);
    res.status(201).json({ status: "success", data: cart });
});

export const getCart = catchAsyncError(async (req, res) => {
    const cart = await cartService.getCart(req.user.id);
    res.status(200).json({ status: "success", data: cart });
});

export const removeFromCart = catchAsyncError(async (req, res) => {
    const cart = await cartService.removeFromCart(req.user.id, req.params.id);
    res.status(200).json({ status: "success", data: cart });
});

export const updateCartItem = catchAsyncError(async (req, res) => {
    const cart = await cartService.updateCartItem(req.user.id, req.params.id, req.body.quantity);
    res.status(200).json({ status: "success", data: cart });
});

export const applyCoupon = catchAsyncError(async (req, res) => {
    const cart = await cartService.applyCoupon(req.user.id, req.body.coupon);
    res.status(200).json({ status: "success", data: cart });
});