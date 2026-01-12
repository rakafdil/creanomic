// cart.router.js

import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem,
  clearCart,
  applyCoupon,
} from "./cart.controller.js";
import { supabaseAuth, verifyUser } from "../../middlewares/auth.js";

export default (supabase) => {
  const router = express.Router();
  router.use(supabaseAuth, verifyUser);

  router.post("/", addToCart(supabase));
  router.get("/", getCart(supabase));
  router.delete("/", removeFromCart(supabase));
  router.put("/", updateCartItem(supabase));
  router.post("/clear", clearCart(supabase));
  router.post("/apply-coupon", applyCoupon(supabase));

  return router;
};
