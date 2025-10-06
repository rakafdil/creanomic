// src/modules/category/category.routes.js
import express from "express"
import * as categoryController from "./category.controller.js"

const categoryRoutes = (supabase) => {
    const router = express.Router()
    
    router.get("/", categoryController.getAllCategories(supabase))
    router.get("/:id", categoryController.getCategoryById(supabase))

    return router
}

export default categoryRoutes