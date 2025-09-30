import type { Request, Response, NextFunction } from "express";
import { SupabaseClient } from "@supabase/supabase-js";

import { AuthService } from "./auth.service.js";

// @ts-ignore
import { catchAsyncError } from "../../utils/catchAsyncError.js";
import type { UserData } from "../../types/auth.js";

export class AuthController {
    static signup = catchAsyncError(
        async (req: Request, res: Response, next: NextFunction, supabase: SupabaseClient) => {
            const authService = new AuthService(supabase);

            const { email, password, confirmPassword, username, firstName, lastName }: UserData = req.body;

            const result = await authService.signup({
                email, password, confirmPassword, username, firstName, lastName
            });

            res.status(201).json({
                status: "success",
                message: "User registered successfully",
                data: result,
            });
        }
    );

    static login = catchAsyncError(
        async (req: Request, res: Response, next: NextFunction, supabase: SupabaseClient) => {
            const authService = new AuthService(supabase);

            const { email, password } = req.body;

            const result = await authService.login({ email, password });

            res.status(200).json({
                status: "success",
                message: "Login successful",
                data: result,
            });
        }
    );

    static getProfile = catchAsyncError(
        async (req: Request & { user: { id: string } }, res: Response, next: NextFunction, supabase: SupabaseClient) => {
            const authService = new AuthService(supabase);

            const userId = req.user.id;

            const user = await authService.getUserProfile(userId);

            res.status(200).json({
                status: "success",
                message: "Profile retrieved successfully",
                data: { user },
            });
        }
    );

    static logout = catchAsyncError(
        async (req: Request, res: Response, next: NextFunction, supabase: SupabaseClient) => {
            const authService = new AuthService(supabase);
            await authService.logout();
            res.status(200).json({
                status: "success",
                message: "Logout successful",
            });
        }
    );
}
