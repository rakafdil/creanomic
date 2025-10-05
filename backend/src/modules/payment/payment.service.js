//payment.service.js
class PaymentService {
    constructor(supabase) {
        this.supabase = supabase
    }

    // Create transaction from cart
    async createTransaction(userId, cartId, paymentMethod) {
        // Get cart with items
        const { data: cart, error: cartError } = await this.supabase
            .from("carts")
            .select(`
                *,
                cart_items (
                    *,
                    seller:seller_id (
                        seller_id
                    )
                )
            `)
            .eq("id", cartId)
            .eq("user_id", userId)
            .single()

        if (cartError) throw cartError
        if (!cart || !cart.cart_items || cart.cart_items.length === 0) {
            throw new Error("Cart is empty")
        }

        // Group items by seller
        const itemsBySeller = cart.cart_items.reduce((acc, item) => {
            const sellerId = item.seller_id
            if (!acc[sellerId]) {
                acc[sellerId] = []
            }
            acc[sellerId].push(item)
            return acc
        }, {})

        // Create transaction for each seller
        const transactions = []
        for (const [sellerId, items] of Object.entries(itemsBySeller)) {
            const totalAmount = items.reduce((sum, item) => 
                sum + (item.price * item.quantity), 0
            )

            const { data: transaction, error: transError } = await this.supabase
                .from("transactions")
                .insert([{
                    buyer_id: userId,
                    seller_id: sellerId,
                    total_amount: totalAmount,
                    payment_method: paymentMethod,
                    status: 'pending'
                }])
                .select()
                .single()

            if (transError) throw transError
            transactions.push(transaction)
        }

        return transactions
    }

    // Get transaction status
    async getTransactionStatus(transactionId) {
        const { data, error } = await this.supabase
            .from("transactions")
            .select("*")
            .eq("id", transactionId)
            .single()

        if (error) throw error
        return data
    }

    // Get user transaction history
    async getUserTransactions(userId, role = 'buyer') {
        const column = role === 'buyer' ? 'buyer_id' : 'seller_id'
        
        const { data, error } = await this.supabase
            .from("transactions")
            .select(`
                *,
                buyer:buyer_id (
                    id,
                    username,
                    first_name,
                    last_name
                ),
                seller:seller_id (
                    seller_id,
                    stores:store_id (
                        store_name
                    )
                )
            `)
            .eq(column, userId)
            .order('created_at', { ascending: false })

        if (error) throw error
        return data
    }

    // Update transaction status
    async updateTransactionStatus(transactionId, status) {
        const validStatuses = ['pending', 'paid', 'shipped', 'completed', 'cancelled']
        
        if (!validStatuses.includes(status)) {
            throw new Error('Invalid status')
        }

        const { data, error } = await this.supabase
            .from("transactions")
            .update({ 
                status,
                updated_at: new Date().toISOString()
            })
            .eq("id", transactionId)
            .select()
            .single()

        if (error) throw error
        return data
    }

    // Process refund
    async refundTransaction(transactionId) {
        const transaction = await this.getTransactionStatus(transactionId)

        if (!['paid', 'shipped'].includes(transaction.status)) {
            throw new Error('Transaction cannot be refunded')
        }

        const { data, error } = await this.supabase
            .from("transactions")
            .update({ 
                status: 'cancelled',
                updated_at: new Date().toISOString()
            })
            .eq("id", transactionId)
            .select()
            .single()

        if (error) throw error

        // TODO: Process actual refund to payment gateway
        // TODO: Update user balance if using wallet
        
        return data
    }

    // Handle webhook from payment gateway
    async handleWebhook(payload) {
        // TODO: Validate webhook signature
        const { orderId, status, paymentMethod } = payload

        const { data, error } = await this.supabase
            .from("transactions")
            .update({ 
                status,
                updated_at: new Date().toISOString()
            })
            .eq("id", orderId)
            .select()
            .single()

        if (error) throw error
        return data
    }
}

export default PaymentService