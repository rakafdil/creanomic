// src/modules/category/category.controller.js
import { catchAsyncError } from "../../utils/catchAsyncError.js"
import { AppError } from "../../utils/AppError.js"
import CategoryService from "./category.service.js"

export const getAllCategories = (supabase) =>
    catchAsyncError(async (req, res) => {
        const categoryService = new CategoryService(supabase)
        const data = await categoryService.getAllCategories()
        res.status(200).json({
            status: "success",
            message: "Categories retrieved successfully",
            data,
        })
    })

export const getCategoryById = (supabase) =>
    catchAsyncError(async (req, res, next) => {
        const categoryService = new CategoryService(supabase)
        const { id } = req.params

        if (!id) {
            return next(new AppError("Category ID is required", 400))
        }

        const data = await categoryService.getCategoryById(id)
        res.status(200).json({
            status: "success",
            message: "Category retrieved successfully",
            data,
        })
    })