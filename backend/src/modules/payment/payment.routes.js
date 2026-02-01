import express from "express";
import {
  checkout,
  getStatus,
  getHistory,
  updateStatus,
  refund,
  webhook,
  finish,
} from "./payment.controller.js";
import { supabaseAuth } from "../../middlewares/auth.js";

export default (supabase) => {
  const router = express.Router();

  router.post("/checkout", supabaseAuth, checkout(supabase));
  router.get("/status/:transactionId", getStatus(supabase));
  router.get("/history/:userId", getHistory(supabase));
  router.patch("/status/:transactionId", updateStatus(supabase));
  router.post("/refund/:transactionId", refund(supabase));
  router.post("/webhook", webhook(supabase));
  router.get("/finish", finish(supabase));

  return router;
};
