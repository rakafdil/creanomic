// cart.router.js

import express from "express"
import {
    addToCart,
    getCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    applyCoupon
} from "./cart.controller.js"

export default (supabase) => {
    const router = express.Router()

    router.post("/", addToCart(supabase))
    router.get("/", getCart(supabase))
    router.delete("/:productId", removeFromCart(supabase))
    router.put("/:productId", updateCartItem(supabase))
    router.post("/clear", clearCart(supabase))
    router.post("/apply-coupon", applyCoupon(supabase))

    return router
}