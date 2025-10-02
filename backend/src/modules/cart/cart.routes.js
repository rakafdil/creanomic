// cart.routes.js
import { Router } from "express";
import * as cartController from "./cart.controller.js";

export default function cartRouter(supabase) {
    const router = Router();

    // kalau controller butuh supabase, bisa passing via closure
    router.post("/", (req, res, next) => cartController.addToCart(req, res, next, supabase));
    router.get("/", (req, res, next) => cartController.getCart(req, res, next, supabase));
    router.delete("/:id", (req, res, next) => cartController.removeFromCart(req, res, next, supabase));
    router.put("/:id", (req, res, next) => cartController.updateCartItem(req, res, next, supabase));
    router.post("/apply-coupon", (req, res, next) => cartController.applyCoupon(req, res, next, supabase));

    return router;
}