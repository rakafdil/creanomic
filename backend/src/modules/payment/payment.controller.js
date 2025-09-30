const { catchAsyncError } = require("../../utils/catchAsyncError.js");
const { AppError } = require("../../utils/AppError.js");
const paymentService = require("./payment.service.js");

// POST /api/v1/payment/checkout
const checkout = (supabase) =>
    catchAsyncError(async (req, res, next) => {
        const { cartId, userId } = req.body;

        if (!cartId || !userId) {
            return next(new AppError("CartId dan UserId wajib diisi", 400));
        }

        const paymentUrl = await paymentService.createTransaction(cartId, userId);

        res.status(201).json({ message: "Checkout berhasil", paymentUrl });
    });

// GET /api/v1/payment/status/:orderId
const getStatus = (supabase) =>
    catchAsyncError(async (req, res, next) => {
        const { orderId } = req.params;

        if (!orderId) {
            return next(new AppError("OrderId wajib diisi", 400));
        }

        const status = await paymentService.getTransactionStatus(orderId);

        res.json({ message: "success", status });
    });

// GET /api/v1/payment/history/:userId
const getHistory = (supabase) =>
    catchAsyncError(async (req, res, next) => {
        const { userId } = req.params;

        if (!userId) {
            return next(new AppError("UserId wajib diisi", 400));
        }

        const history = await paymentService.getUserTransactions(userId);

        res.json({ message: "success", history });
    });

// POST /api/v1/payment/refund/:orderId
const refund = (supabase) =>
    catchAsyncError(async (req, res, next) => {
        const { orderId } = req.params;

        if (!orderId) {
            return next(new AppError("OrderId wajib diisi", 400));
        }

        const refundResult = await paymentService.refundTransaction(orderId);

        if (!refundResult) {
            return next(new AppError("Refund gagal", 400));
        }

        res.json({ message: "Refund berhasil", refund: refundResult });
    });

// POST /api/v1/payment/webhook
const webhook = (supabase) =>
    catchAsyncError(async (req, res, next) => {
        const payload = req.body;

        if (!payload) {
            return next(new AppError("Payload webhook kosong", 400));
        }

        const result = await paymentService.handleWebhook(payload);

        res.json({ message: "Webhook diterima", result });
    });

module.exports = {
    checkout,
    getStatus,
    getHistory,
    refund,
    webhook,
};