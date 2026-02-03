import { catchAsyncError } from "../../utils/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";
import PaymentService from "./payment.service.js";

const checkout = (supabase) =>
  catchAsyncError(async (req, res, next) => {
    const paymentService = new PaymentService(supabase);

    const { cartData, user, paymentMethod } = req.body;
    // console.log(cartData, user);
    const userCoookieData = req.user;
    console.log(userCoookieData);
    const orderId = new Date().getTime();

    const result = await paymentService.createTransaction(
      cartData,
      user,
      orderId,
      paymentMethod,
      userCoookieData,
    );
    res.status(201).json(result);
  });

const getStatus = (supabase) =>
  catchAsyncError(async (req, res, next) => {
    const paymentService = new PaymentService(supabase);
    const { transactionId } = req.params;

    if (!transactionId) {
      return next(new AppError("Transaction ID is required", 400));
    }

    const status = await paymentService.getTransactionStatus(transactionId);
    res.json({ message: "success", data: status });
  });

const getHistory = (supabase) =>
  catchAsyncError(async (req, res, next) => {
    const paymentService = new PaymentService(supabase);
    const userId = req.user.id;
    const { role } = req.query;
    console.log(userId);
    if (!userId) {
      return next(new AppError("User ID is required", 400));
    }

    const history = await paymentService.getUserTransactions(userId, role);
    res.json({ message: "success", results: history.length, data: history });
  });

const updateStatus = (supabase) =>
  catchAsyncError(async (req, res, next) => {
    const paymentService = new PaymentService(supabase);
    const { transactionId } = req.params;
    const { status } = req.body;

    if (!transactionId || !status) {
      return next(new AppError("Transaction ID and status are required", 400));
    }

    const data = await paymentService.updateTransactionStatus(
      transactionId,
      status,
    );
    res.json({ message: "Status updated successfully", data });
  });

const refund = (supabase) =>
  catchAsyncError(async (req, res, next) => {
    const paymentService = new PaymentService(supabase);
    const { transactionId } = req.params;

    if (!transactionId) {
      return next(new AppError("Transaction ID is required", 400));
    }

    const refundResult = await paymentService.refundTransaction(transactionId);
    res.json({ message: "Refund processed successfully", data: refundResult });
  });

const webhook = (supabase) =>
  catchAsyncError(async (req, res, next) => {
    const paymentService = new PaymentService(supabase);
    const payload = req.body;

    if (!payload) {
      return next(new AppError("Webhook payload is empty", 400));
    }

    let orderId = payload.order_id;
    let transactionStatus = payload.transaction_status;
    let fraudStatus = payload.fraud_status;

    console.log(
      `Transaction Notification: ${transactionStatus} for Order: ${orderId}`,
    );

    await paymentService.handleWebhook(orderId, transactionStatus, fraudStatus);

    res.status(200).send("OK");
  });

const finish = (supabase) =>
  catchAsyncError(async (req, res, next) => {
    const { order_id, transaction_status, status_code } = req.query;

    return res.redirect(
      `http://localhost:3000/products/cart/transaction?order_id=${order_id}&status_code=${status_code}&transaction_status=${transaction_status}`,
    );
  });

export {
  checkout,
  getStatus,
  getHistory,
  updateStatus,
  refund,
  webhook,
  finish,
};
