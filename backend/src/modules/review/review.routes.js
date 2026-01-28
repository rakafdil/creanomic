import express from "express";
import { ReviewController } from "./review.controller.js";
import { supabaseAuth } from "../../middlewares/auth.js";

/**
 * @param {import("@supabase/supabase-js").SupabaseClient} supabase
 */
const reviewRoutes = (supabase) => {
  const router = express.Router();
  const reviewController = new ReviewController(supabase);

  router.post("/:productId", supabaseAuth, reviewController.addReview);
  router.get("/:productId", reviewController.getReviews);

  return router;
};

export default reviewRoutes;
