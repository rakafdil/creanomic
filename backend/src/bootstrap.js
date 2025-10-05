import productRouter from "./modules/product/product.routes.js"
import { AppError } from "./utils/AppError.js"
import { globalErrorHandling } from "./middlewares/GlobalErrorHandling.js"
import paymentRouter from "./modules/payment/payment.routes.js"
import authRouter from "./modules/auth/auth.routes.js"
import cartRouter from "./modules/cart/cart.routes.js"

function bootstrap(app, supabase) {
    app.use("/api/v1/products", productRouter(supabase))
    app.use("/api/v1/payment", paymentRouter(supabase))
    app.use("/api/v1/auth", authRouter(supabase))
    app.use("/api/v1/cart", cartRouter(supabase))

    app.use((req, res, next) => {
        next(new AppError("Endpoint was not found", 404))
    })

    app.use(globalErrorHandling)
}

export { bootstrap }