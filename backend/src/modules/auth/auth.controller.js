import { AuthService } from "./auth.service.js"
import { catchAsyncError } from "../../utils/catchAsyncError.js"

/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 * @typedef {import("express").NextFunction} NextFunction
 * @typedef {import("@supabase/supabase-js").SupabaseClient} SupabaseClient
 * @typedef {import("../../types/auth").UserData} UserData
 */

export class AuthController {
    /**
     * @param {SupabaseClient} supabase
     */
    constructor(supabase) {
        this.supabase = supabase
        this.authService = new AuthService(supabase)

        const methods = [
            "signup",
            "login",
            "confirmEmail",
            "forgotPassword",
            "handleResetPassword",
            "getProfile",
            "logout",
        ]

        methods.forEach(method => {
            this[method] = catchAsyncError(this[method].bind(this))
        })
    }

    async signup(req, res) {
        /** @type {UserData} */
        const { email, password, confirmPassword, username, firstName, lastName } = req.body

        const result = await this.authService.signup({
            email, password, confirmPassword, username, firstName, lastName
        })

        res.status(201).json({
            status: "success",
            message: "User registered successfully",
            data: result,
        })
    }

    async login(req, res) {
        const { email, password } = req.body

        const result = await this.authService.login({ email, password })

        res.status(200).json({
            status: "success",
            message: "Login successful",
            data: result,
        })
    }

    async loginWithGoogle(req, res) {
        const result = await this.authService.loginWithGoogle()

        res.status(200).json({
            status: "success",
            message: "Login successful",
            data: result,
        })
    }

    async confirmEmail(req, res) {
        const result = await this.authService.emailConfirmation()
        res.status(200).json({
            status: "success",
            message: result.message || "Email confirmed successfully"
        })
    }

    async forgotPassword(req, res) {
        const { email } = req.body
        const result = await this.authService.forgotPassword(email)
        res.status(200).json({
            status: "success",
            message: result.message
        })
    }

    async handleResetPassword(req, res) {
        const { newPassword, accessToken } = req.body
        const result = await this.authService.handleResetPassword(newPassword, accessToken)
        res.status(200).json({
            status: "success",
            message: result.message
        })
    }

    async getProfile(req, res) {
        const user = await this.authService.getUserProfile()
        res.status(200).json({
            status: "success",
            message: "Profile retrieved successfully",
            data: { user },
        })
    }

    async logout(req, res) {
        await this.authService.logout()
        res.status(200).json({
            status: "success",
            message: "Logout successful",
        })
    }

    async callback(req, res) {
        const code = req.query.code
        const next = req.query.next ?? "/"
        if (code) {
            const supabase = createServerClient(
                process.env.SUPABASE_URL,
                process.env.SUPABASE_PUBLISHABLE_KEY, {
                cookies: {
                    getAll() {
                        return parseCookieHeader(context.req.headers.cookie ?? '')
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            context.res.appendHeader('Set-Cookie', serializeCookieHeader(name, value, options))
                        )
                    },
                },
            })
            await supabase.auth.exchangeCodeForSession(code)
        }
        res.redirect(303, `/${next.slice(1)}`)
    }
}
