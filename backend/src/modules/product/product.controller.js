const slugify = require("slugify")
const { catchAsyncError } = require("../../utils/catchAsyncError.js")
const { AppError } = require("../../utils/AppError.js")
const { deleteOne } = require("../../handlers/factor.js")

// Get all products
const getAllProducts = (supabase) =>
    catchAsyncError(async (req, res, next) => {
        const { data, error } = await supabase.from("products").select("*")

        if (error) {
            return next(new AppError(error.message, 500))
        }

        res.json({ message: "success", data })
    })

module.exports = { getAllProducts }