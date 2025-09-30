const express = require("express");
const {
    checkout,
    getStatus,
    getHistory,
    refund,
    webhook
} = require("./payment.controller.js");

module.exports = (supabase) => {
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