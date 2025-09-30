import express, { Router } from "express"
import type { Request, Response } from "express"
import { AuthController } from './auth.controller.js'

import type { SupabaseClient } from "@supabase/supabase-js";

export default function paymentRoutes(supabase: SupabaseClient): Router {
    const router = express.Router()

    router.post('/signup', (req: Request, res: Response) => {
        AuthController.signup(req, res, supabase)
    })
    router.post('/login', (req: Request, res: Response) => {
        AuthController.login(req, res, supabase)
    })
    router.get('/profile', (req: Request, res: Response) => {
        AuthController.getProfile(req, res, supabase)
    })
    router.post('/logout', (req: Request, res: Response) => {
        AuthController.logout(req, res, supabase)
    })

    return router
}
