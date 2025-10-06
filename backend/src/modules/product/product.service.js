// product.service.js
class ProductService {
    constructor(supabase) {
        this.supabase = supabase
    }

    // Get all products with seller and store information
    async getAllProducts(filters = {}) {
        let query = this.supabase
            .from("products")
            .select(`
                *,
                seller:seller_id (
                    seller_id,
                    store_id,
                    stores:store_id (
                        id,
                        store_name,
                        description
                    )
                )
            `)

        // Apply filters if provided
        if (filters.minPrice) {
            query = query.gte('price', filters.minPrice)
        }
        if (filters.maxPrice) {
            query = query.lte('price', filters.maxPrice)
        }
        if (filters.sellerId) {
            query = query.eq('seller_id', filters.sellerId)
        }
        if (filters.inStock) {
            query = query.gt('stock_quantity', 0)
        }

        const { data, error } = await query

        if (error) throw error
        return data
    }

    // Get product by ID
    async getProductById(id) {
        const { data, error } = await this.supabase
            .from("products")
            .select(`
                *,
                seller:seller_id (
                    seller_id,
                    store_id,
                    stores:store_id (
                        id,
                        store_name,
                        description
                    )
                )
            `)
            .eq('id', id)
            .single()

        if (error) throw error
        return data
    }

    // Get products by store
    async getProductsByStore(storeId) {
        const { data, error } = await this.supabase
            .from("store_products")
            .select(`
                product_id,
                products:product_id (
                    *,
                    seller:seller_id (
                        seller_id
                    )
                )
            `)
            .eq('store_id', storeId)

        if (error) throw error
        return data.map(item => item.products)
    }

    // Search products
    async searchProducts(searchTerm) {
        const { data, error } = await this.supabase
            .from("products")
            .select(`
                *,
                seller:seller_id (
                    seller_id,
                    stores:store_id (
                        store_name
                    )
                )
            `)
            .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)

        if (error) throw error
        return data
    }
}

export default ProductService