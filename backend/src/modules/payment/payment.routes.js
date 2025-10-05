import express from "express"
import {
    checkout,
    getStatus,
    getHistory,
    updateStatus,
    refund,
    webhook
} from "./payment.controller.js"

export default (supabase) => {
    const router = express.Router()

    router.post("/checkout", checkout(supabase))
    router.get("/status/:transactionId", getStatus(supabase))
    router.get("/history/:userId", getHistory(supabase))
    router.patch("/status/:transactionId", updateStatus(supabase))
    router.post("/refund/:transactionId", refund(supabase))
    router.post("/webhook", webhook(supabase))

    return router
}