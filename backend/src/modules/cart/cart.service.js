//cart.service.js
class CartService {
    constructor(supabase) {
        this.supabase = supabase
    }

    // Get or create cart for user
    async getOrCreateCart(userId) {
        let { data: cart, error: cartError } = await this.supabase
            .from("carts")
            .select("*")
            .eq("user_id", userId)
            .maybeSingle()

        if (cartError && cartError.code !== "PGRST116") {
            throw cartError
        }

        if (!cart) {
            const { data: newCart, error: newCartError } = await this.supabase
                .from("carts")
                .insert([{
                    user_id: userId,
                    total_price: 0,
                    coupon: ""
                }])
                .select()
                .single()

            if (newCartError) throw newCartError
            cart = newCart
        }

        return cart
    }

    // Add item to cart
    async addItem(userId, productId, quantity, price, sellerId) {
        const cart = await this.getOrCreateCart(userId)

        // Check if item already exists
        let { data: existingItem } = await this.supabase
            .from("cart_items")
            .select("*")
            .eq("cart_id", cart.id)
            .eq("product_id", productId)
            .maybeSingle()

        if (existingItem) {
            // Update quantity
            const { data, error } = await this.supabase
                .from("cart_items")
                .update({
                    quantity: existingItem.quantity + quantity,
                    price: price
                })
                .eq("cart_id", cart.id)
                .eq("product_id", productId)
                .select()
                .single()

            if (error) throw error
            await this.updateCartTotal(cart.id)
            return data
        } else {
            // Insert new item
            const { data, error } = await this.supabase
                .from("cart_items")
                .insert([{
                    cart_id: cart.id,
                    product_id: productId,
                    seller_id: sellerId,
                    quantity: quantity,
                    price: price
                }])
                .select()
                .single()

            if (error) throw error
            await this.updateCartTotal(cart.id)
            return data
        }
    }

    // Get cart with items
    async getCart(userId) {
        const { data: cart, error } = await this.supabase
            .from("carts")
            .select(`
                *,
                cart_items (
                    *,
                    products:product_id (
                        id,
                        name,
                        img_url,
                        stock_quantity
                    ),
                    seller:seller_id (
                        seller_id,
                        stores:store_id (
                            store_name
                        )
                    )
                )
            `)
            .eq("user_id", userId)
            .maybeSingle()

        if (error) throw error
        return cart
    }

    // Remove item from cart
    async removeItem(userId, productId) {
        const cart = await this.getOrCreateCart(userId)

        const { error } = await this.supabase
            .from("cart_items")
            .delete()
            .eq("cart_id", cart.id)
            .eq("product_id", productId)

        if (error) throw error
        await this.updateCartTotal(cart.id)
        return { message: "Item removed successfully" }
    }

    // Update item quantity
    async updateItemQuantity(userId, productId, quantity) {
        const cart = await this.getOrCreateCart(userId)

        if (quantity <= 0) {
            return await this.removeItem(userId, productId)
        }

        const { data, error } = await this.supabase
            .from("cart_items")
            .update({ quantity })
            .eq("cart_id", cart.id)
            .eq("product_id", productId)
            .select()
            .single()

        if (error) throw error
        await this.updateCartTotal(cart.id)
        return data
    }

    // Update cart total price
    async updateCartTotal(cartId) {
        const { data: items, error: itemsError } = await this.supabase
            .from("cart_items")
            .select("quantity, price")
            .eq("cart_id", cartId)

        if (itemsError) throw itemsError

        const totalPrice = items.reduce((acc, item) =>
            acc + (item.price * item.quantity), 0
        )

        const { error: updateError } = await this.supabase
            .from("carts")
            .update({ total_price: totalPrice })
            .eq("id", cartId)

        if (updateError) throw updateError
        return totalPrice
    }

    // Clear cart
    async clearCart(userId) {
        const cart = await this.getOrCreateCart(userId)

        const { error } = await this.supabase
            .from("cart_items")
            .delete()
            .eq("cart_id", cart.id)

        if (error) throw error

        await this.supabase
            .from("carts")
            .update({ total_price: 0, coupon: "" })
            .eq("id", cart.id)

        return { message: "Cart cleared successfully" }
    }
    async applyCoupon(userId, couponCode) {
        const cart = await this.getOrCreateCart(userId)

        // TODO: Validate coupon from coupons table if exists
        const { data, error } = await this.supabase
            .from("carts")
            .update({ coupon: couponCode })
            .eq("id", cart.id)
            .select()
            .single()

        if (error) throw error
        return data
    }
}

export default CartService