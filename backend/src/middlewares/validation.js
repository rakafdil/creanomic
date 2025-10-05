import { AppError } from "../utils/AppError.js"

/**Validate required fields in request body*/
export const validateRequiredFields = (requiredFields) => {
    return (req, res, next) => {
        const missingFields = []

        for (const field of requiredFields) {
            if (!req.body[field] && req.body[field] !== 0) {
                missingFields.push(field)
            }
        }

        if (missingFields.length > 0) {
            return next(
                new AppError(
                    `Missing required fields: ${missingFields.join(', ')}`,
                    400
                )
            )
        }

        next()
    }
}

/**Validate UUID format*/
export const validateUUID = (paramName) => {
    return (req, res, next) => {
        const uuid = req.params[paramName] || req.body[paramName]
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

        if (uuid && !uuidRegex.test(uuid)) {
            return next(new AppError(`Invalid ${paramName} format`, 400))
        }

        next()
    }
}

/**Validate numeric value*/
export const validateNumeric = (fieldName, min = null, max = null) => {
    return (req, res, next) => {
        const value = req.body[fieldName]

        if (value !== undefined && value !== null) {
            const numValue = Number(value)

            if (isNaN(numValue)) {
                return next(new AppError(`${fieldName} must be a number`, 400))
            }

            if (min !== null && numValue < min) {
                return next(new AppError(`${fieldName} must be at least ${min}`, 400))
            }

            if (max !== null && numValue > max) {
                return next(new AppError(`${fieldName} must be at most ${max}`, 400))
            }
        }

        next()
    }
}