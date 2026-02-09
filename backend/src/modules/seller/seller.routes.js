import express from "express";
import { SellerController } from "./seller.controller.js";
import { supabaseAuth } from "../../middlewares/auth.js";

export default function sellerRouter(supabase) {
  const router = express.Router();
  const controller = new SellerController(supabase);

  router.use(supabaseAuth);

  router.post("/products/:sellerId", controller.addProduct);
  router.get("/products/:sellerId", controller.getProducts);
  router.patch("/products/:sellerId/:productId", controller.editProduct);
  router.delete("/products/:sellerId/:productId", controller.deleteProduct);
  router.post("/become-seller", controller.changeRole);

  return router;
}
