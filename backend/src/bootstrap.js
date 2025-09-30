const productRouter = require("./modules/product/product.routes.js")
const { AppError } = require("./utils/AppError.js")
const { globalErrorHandling } = require("./middlewares/GlobalErrorHandling.js")

function bootstrap(app, supabase) {
    app.use("/api/v1/products", productRouter(supabase))

    app.use((req, res, next) => {
        next(new AppError("Endpoint was not found", 404))
    })

    app.use(globalErrorHandling)
}

module.exports = { bootstrap }