import express from "express"
import { SellerController } from "./seller.controller.js"

export default function sellerRouter(supabase) {
    const router = express.Router()
    const controller = new SellerController(supabase)

    router.get("/products:product_id", controller.getProduct)
    router.post("/products", controller.addProduct)
    router.patch("/products:product_id", controller.editProduct)
    router.delete("/products:product_id", controller.deletProduct)

    return router
}
