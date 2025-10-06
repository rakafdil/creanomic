import express from "express"
import { ReviewController } from "./review.controller.js"

/**
 * Fungsi untuk membuat router review dengan Supabase yang di-inject dari index.js
 * @param {import("@supabase/supabase-js").SupabaseClient} supabase
 */
const reviewRoutes = (supabase) => {
    const router = express.Router()
    const reviewController = new ReviewController(supabase)

    router.post("/:productId", reviewController.addReview)
    router.get("/:productId", reviewController.getReviews)

    return router
}

export default reviewRoutes