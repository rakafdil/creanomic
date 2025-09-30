import express from "express";
import paymentController from "./payment.controller.js";

const {
    checkout,
    getStatus,
    getHistory,
    refund,
    webhook
} = paymentController;

export default (supabase) => {
    const router = express.Router();
    router.post("/checkout", (req, res) => {
        console.log("Checkout route hit!");
        res.json({ message: "Checkout working" });
    });
    router.get("/status/:orderId", getStatus(supabase));
    router.get("/history/:userId", getHistory(supabase));
    router.post("/refund/:orderId", refund(supabase));
    router.post("/webhook", webhook(supabase));

    return router;
};