import express from "express"
import { AuthController } from "./auth.controller.js"

export default function authRouter(supabase) {
    const router = express.Router()
    const controller = new AuthController(supabase)

    router.post("/signup", controller.signup)
    router.post("/login", controller.login)
    router.post("/confirm-email", controller.confirmEmail)
    router.get("/profile", controller.getProfile)
    router.post("/logout", controller.logout)
    router.post("/forgot-password", controller.forgotPassword)
    router.post("/forgot-password/reset", controller.handleResetPassword)
    router.get("/callback", controller.callback)
    router.get("/google-signin", controller.loginWithGoogle)

    return router
}
