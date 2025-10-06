import { AppError } from "../../utils/AppError.js"
import { catchAsyncError } from "../../utils/catchAsyncError.js"
import ReviewService from "./review.service.js"

export class ReviewController {
    /**
     * @param {import("@supabase/supabase-js").SupabaseClient} supabase
     */
    constructor(supabase) {
        this.supabase = supabase
        this.reviewService = new ReviewService(supabase)

        // Pastikan binding ke instance ini agar "this" tetap benar di Express
        this.addReview = catchAsyncError(this.addReview.bind(this))
        this.getReviews = catchAsyncError(this.getReviews.bind(this))
    }

    async addReview(req, res) {
        const { productId } = req.params
        const reviewData = req.body

        if (!productId) {
            throw new AppError("Product ID is required", 400)
        }

        const newReview = await this.reviewService.addReview(productId, reviewData)

        res.status(201).json({
            status: "success",
            message: "Review added successfully",
            data: { review: newReview },
        })
    }

    async getReviews(req, res) {
        const { productId } = req.params

        if (!productId) {
            throw new AppError("Product ID is required", 400)
        }

        const reviews = await this.reviewService.getReviews(productId)

        res.status(200).json({
            status: "success",
            message: "Reviews retrieved successfully",
            data: { reviews },
        })
    }
}
