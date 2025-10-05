//payment.controller.js
import { catchAsyncError } from "../../utils/catchAsyncError.js"
import { AppError } from "../../utils/AppError.js"
import PaymentService from "./payment.service.js"

const checkout = (supabase) =>
    catchAsyncError(async (req, res, next) => {
        const paymentService = new PaymentService(supabase)
        const { userId, cartId, paymentMethod } = req.body

        if (!userId || !cartId || !paymentMethod) {
            return next(new AppError("Missing required fields", 400))
        }

        const validMethods = ['wallet', 'bank_transfer', 'cod', 'ewallet']
        if (!validMethods.includes(paymentMethod)) {
            return next(new AppError("Invalid payment method", 400))
        }

        const transactions = await paymentService.createTransaction(
            userId, 
            cartId, 
            paymentMethod
        )

        // TODO: Generate payment URL from payment gateway
        const paymentUrl = `https://payment-gateway.com/pay/${transactions[0].id}`

        res.status(201).json({ 
            message: "Checkout successful", 
            transactions,
            paymentUrl 
        })
    })

const getStatus = (supabase) =>
    catchAsyncError(async (req, res, next) => {
        const paymentService = new PaymentService(supabase)
        const { transactionId } = req.params

        if (!transactionId) {
            return next(new AppError("Transaction ID is required", 400))
        }

        const status = await paymentService.getTransactionStatus(transactionId)
        res.json({ message: "success", data: status })
    })

const getHistory = (supabase) =>
    catchAsyncError(async (req, res, next) => {
        const paymentService = new PaymentService(supabase)
        const { userId } = req.params
        const { role } = req.query

        if (!userId) {
            return next(new AppError("User ID is required", 400))
        }

        const history = await paymentService.getUserTransactions(userId, role)
        res.json({ message: "success", results: history.length, data: history })
    })

const updateStatus = (supabase) =>
    catchAsyncError(async (req, res, next) => {
        const paymentService = new PaymentService(supabase)
        const { transactionId } = req.params
        const { status } = req.body

        if (!transactionId || !status) {
            return next(new AppError("Transaction ID and status are required", 400))
        }

        const data = await paymentService.updateTransactionStatus(transactionId, status)
        res.json({ message: "Status updated successfully", data })
    })

const refund = (supabase) =>
    catchAsyncError(async (req, res, next) => {
        const paymentService = new PaymentService(supabase)
        const { transactionId } = req.params

        if (!transactionId) {
            return next(new AppError("Transaction ID is required", 400))
        }

        const refundResult = await paymentService.refundTransaction(transactionId)
        res.json({ message: "Refund processed successfully", data: refundResult })
    })

const webhook = (supabase) =>
    catchAsyncError(async (req, res, next) => {
        const paymentService = new PaymentService(supabase)
        const payload = req.body

        if (!payload) {
            return next(new AppError("Webhook payload is empty", 400))
        }

        const result = await paymentService.handleWebhook(payload)
        res.json({ message: "Webhook received", data: result })
    })

export {
    checkout,
    getStatus,
    getHistory,
    updateStatus,
    refund,
    webhook
}