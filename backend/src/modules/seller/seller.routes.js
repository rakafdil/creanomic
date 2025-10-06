import express from "express"
import { SellerController } from "./seller.controller.js"

export default function sellerRouter(supabase) {
    const router = express.Router()
    const controller = new SellerController(supabase)

    // Create a product for a seller
    router.post("/products/:sellerId", controller.addProduct)

    // Get all products for a seller
    router.get("/products/:sellerId", controller.getProducts)

    // Edit a product for a seller
    router.patch("/products/:sellerId/:productId", controller.editProduct)

    // Delete a product for a seller
    router.delete("/products/:sellerId/:productId", controller.deleteProduct)

    // Change user role to seller
    router.post("/become-seller/:userId", controller.changeRole)

    return router
}