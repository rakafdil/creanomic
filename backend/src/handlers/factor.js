import { catchAsyncError } from "../utils/catchAsyncError.js"
import { AppError } from "../utils/AppError.js"

/**Generic delete handler untuk semua module*/
export const deleteOne = (Model, tableName) =>
    catchAsyncError(async (req, res, next) => {
        const { id } = req.params

        const { data, error } = await Model
            .from(tableName)
            .delete()
            .eq('id', id)
            .select()

        if (error) {
            return next(new AppError(error.message, 400))
        }

        if (!data || data.length === 0) {
            return next(new AppError(`No ${tableName} found with that ID`, 404))
        }

        res.json({
            message: `${tableName} deleted successfully`,
            data: null
        })
    })

/**
 * Generic get all handler
 */
export const getAll = (Model, tableName, selectFields = "*") =>
    catchAsyncError(async (req, res, next) => {
        const { data, error } = await Model
            .from(tableName)
            .select(selectFields)

        if (error) {
            return next(new AppError(error.message, 500))
        }

        res.json({
            message: "success",
            results: data.length,
            data
        })
    })

/**
 * Generic get one handler
 */
export const getOne = (Model, tableName, selectFields = "*") =>
    catchAsyncError(async (req, res, next) => {
        const { id } = req.params

        const { data, error } = await Model
            .from(tableName)
            .select(selectFields)
            .eq('id', id)
            .single()

        if (error) {
            return next(new AppError(error.message, 404))
        }

        if (!data) {
            return next(new AppError(`No ${tableName} found with that ID`, 404))
        }

        res.json({
            message: "success",
            data
        })
    })

/**
 * Generic create handler
 */
export const createOne = (Model, tableName) =>
    catchAsyncError(async (req, res, next) => {
        const { data, error } = await Model
            .from(tableName)
            .insert([req.body])
            .select()
            .single()

        if (error) {
            return next(new AppError(error.message, 400))
        }

        res.status(201).json({
            message: `${tableName} created successfully`,
            data
        })
    })

/**
 * Generic update handler
 */
export const updateOne = (Model, tableName) =>
    catchAsyncError(async (req, res, next) => {
        const { id } = req.params

        // Remove fields that shouldn't be updated
        delete req.body.id
        delete req.body.created_at

        const { data, error } = await Model
            .from(tableName)
            .update(req.body)
            .eq('id', id)
            .select()
            .single()

        if (error) {
            return next(new AppError(error.message, 400))
        }

        if (!data) {
            return next(new AppError(`No ${tableName} found with that ID`, 404))
        }

        res.json({
            message: `${tableName} updated successfully`,
            data
        })
    })
