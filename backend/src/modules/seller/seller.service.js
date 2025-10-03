import { AppError } from "../../utils/AppError.js"
import { createClient } from "@supabase/supabase-js"

/**
 * @typedef {import('@supabase/supabase-js').SupabaseClient} SupabaseClient
 * @typedef {import('@supabase/supabase-js').Session} Session
 * @typedef {import('@supabase/supabase-js').User} User
 * @typedef {import('@supabase/supabase-js').AuthError} AuthError
 * @typedef {import('@supabase/supabase-js').PostgrestError} PostgrestError
 */

class SellerService {
    /**
     * @param {SupabaseClient} supabase
     */
    constructor(supabase) {
        /** @type {SupabaseClient} */
        this.supabase = supabase

        /** @type {SupabaseClient} */
        this.adminClient = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY
        )
    }

    async accessDatabaseWithSellerId(sellerId) {
        const { data: { session }, error: errorSession } = await this.supabase.auth.getSession()
        if (errorSession) throw new AppError(errorSession.message, errorSession?.status || 401)

        if (!session) throw new AppError('No active session found', 401)

        if (sellerId !== session?.user?.id) throw new AppError('Sorry, you don\'t have access', 403)

        return session
    }

    async changeRoleToSeller(userId, reqData) {
        const { ktp_url, nik } = reqData

        const { data: dataUser, error: errorGet } = await this.supabase
            .from('users')
            .select('email_verified, phone_verified')
            .eq('id', userId)
            .single()

        if (errorGet) throw new AppError('Failed to fetch user data: ' + errorGet.message, 500)

        if (!dataUser) throw new AppError('User not found', 404)

        if (!dataUser.email_verified && !dataUser.phone_verified) {
            throw new AppError('Email and phone number must be verified!', 400)
        }

        const { data: updatedUser, error } = await this.adminClient
            .from('users')
            .update({
                role: 'seller'
            })
            .eq('id', userId)
            .select('*')
            .single()

        if (error) throw new AppError('Failed to update user role: ' + error.message, 500)

        const { data: newSeller, error: updateError } = await this.adminClient
            .from('seller')
            .insert({
                seller_id: userId,
                ktp_url: ktp_url,
                nik: nik,
                created_at: new Date().toISOString()
            })
            .select('*')
            .single()

        if (updateError) throw new AppError('Failed to create seller profile: ' + updateError.message, 500)

        return {
            message: 'Successfully became a seller',
            user: updatedUser,
            seller: newSeller
        }
    }

    async getProducts(sellerId) {
        await this.accessDatabaseWithSellerId(sellerId)

        const { data: products, error: productsError } = await this.supabase
            .from("products")
            .select("*")
            .eq("seller_id", sellerId)
            .order('created_at', { ascending: false })

        if (productsError) throw new AppError(productsError.message, productsError?.status || 500)

        return products?.map(product => ({
            product_id: product.product_id,
            created_at: product.created_at,
            seller_id: product.seller_id,
            price: product.price,
            product_name: product.product_name,
            product_description: product.product_description,
            discount: product.discount,
            img_url: product.img_url,
            stock_quantity: product.stock_quantity,
            category: product.category
        })) || []
    }

    async addProduct(productData, sellerId) {
        const { name, description, price, stock_quantity, category, img_url } = productData

        if (!name || !description || !price || !stock_quantity || !category || !img_url) {
            throw new AppError('All required fields must be provided', 400)
        }

        await this.accessDatabaseWithSellerId(sellerId)

        const { data: newProduct, error: insertError } = await this.adminClient
            .from('products')
            .insert({
                product_name: name,
                product_description: description,
                price: parseInt(price),
                stock_quantity: parseInt(stock_quantity),
                category,
                img_url: img_url || null,
                seller_id: sellerId,
                created_at: new Date().toISOString()
            })
            .select('product_id, product_name, product_description, price, stock_quantity, category, img_url, created_at')
            .single()

        if (insertError) {
            throw new AppError('Failed to create product: ' + insertError.message, insertError?.status || 500)
        }

        return {
            message: "Product has been added succesfully",
            newProduct: newProduct
        }
    }

    async editProduct(sellerId, productId, changedData) {
        const { name, description, price, stock_quantity, category, img_url } = changedData

        if (!name && !description && !price && !stock_quantity && !category && !img_url) {
            throw new AppError('Change at least one attribute!', 400)
        }

        await this.accessDatabaseWithSellerId(sellerId)

        const updateData = {}
        if (name) updateData.product_name = name
        if (description) updateData.product_description = description
        if (price) updateData.price = parseInt(price)
        if (stock_quantity) updateData.stock_quantity = parseInt(stock_quantity)
        if (category) updateData.category = category
        if (img_url) updateData.img_url = img_url
        updateData.updated_at = new Date().toISOString()

        const { data, error } = await this.adminClient
            .from('products')
            .update(updateData)
            .eq('seller_id', sellerId)
            .eq('product_id', productId)
            .select('*')
            .single()

        if (error) throw new AppError(error.message, error?.status || 500)

        return {
            message: "Product has been updated successfully",
            newData: data
        }
    }

    async deleteProduct(sellerId, productId) {
        await this.accessDatabaseWithSellerId(sellerId)

        const { data: existingProduct, error: checkError } = await this.adminClient
            .from('products')
            .select('id, product_name')
            .eq('seller_id', sellerId)
            .eq('product_id', productId)
            .single()

        if (checkError || !existingProduct) {
            throw new AppError('Product not found', 404)
        }

        const { error } = await this.adminClient
            .from('products')
            .delete()
            .eq('seller_id', sellerId)
            .eq('id', productId)

        if (error) throw new AppError(error.message, error?.status || 500)

        return {
            message: 'Product deleted successfully',
            deletedProduct: existingProduct
        }
    }
}

export default SellerService