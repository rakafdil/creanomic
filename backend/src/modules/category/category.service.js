// src/modules/category/category.service.js
class CategoryService {
    constructor(supabase) {
        this.supabase = supabase
    }

    async getAllCategories() {
        const { data, error } = await this.supabase
            .from("categories")
            .select("*")
            .order("id", { ascending: true })

        if (error) throw error
        return data
    }

    async getCategoryById(id) {
        const { data, error } = await this.supabase
            .from("categories")
            .select("*")
            .eq("id", id)
            .single()

        if (error) throw error
        return data
    }
}

export default CategoryService