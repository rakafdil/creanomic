import { AuthService } from "./auth.service.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";

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
        this.supabase = supabase;
        this.authService = new AuthService(supabase);

        this.signup = catchAsyncError(this.signup.bind(this));
        this.login = catchAsyncError(this.login.bind(this));
        this.getProfile = catchAsyncError(this.getProfile.bind(this));
        this.logout = catchAsyncError(this.logout.bind(this));
    }

    /**
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    async signup(req, res, next) {
        /** @type {UserData} */
        const { email, password, confirmPassword, username, firstName, lastName } = req.body;

        const result = await this.authService.signup({
            email, password, confirmPassword, username, firstName, lastName
        });

        res.status(201).json({
            status: "success",
            message: "User registered successfully",
            data: result,
        });
    }

    /**
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    async login(req, res, next) {
        const { email, password } = req.body;

        const result = await this.authService.login({ email, password });

        res.status(200).json({
            status: "success",
            message: "Login successful",
            data: result,
        });
    }

    /**
     * @param {Request & { user: { id: string } }} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    async getProfile(req, res, next) {
        const userId = this.supabase.auth.getUser.id;

        const user = await this.authService.getUserProfile(userId);

        res.status(200).json({
            status: "success",
            message: "Profile retrieved successfully",
            data: { user },
        });
    }

    /**
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    async logout(req, res, next) {
        await this.authService.logout();
        res.status(200).json({
            status: "success",
            message: "Logout successful",
        });
    }
}
