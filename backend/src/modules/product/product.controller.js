import slugify from "slugify"
import { catchAsyncError } from "../../utils/catchAsyncError.js"
import { AppError } from "../../utils/AppError.js"
import { deleteOne } from "../../handlers/factor.js"

// Get all products
const getAllProducts = (supabase) =>
    catchAsyncError(async (req, res, next) => {
        const { data, error } = await supabase.from("products").select("*")

        if (error) {
            return next(new AppError(error.message, 500))
        }

        res.json({ message: "success", data })
    })

export { getAllProducts }