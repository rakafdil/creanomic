import midtransClient from "midtrans-client";
import { AppError } from "../../utils/AppError.js";
import { createClient } from "@supabase/supabase-js";

class PaymentService {
  constructor(supabase) {
    this.supabase = supabase;

    this.adminClient = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
    );

    this.snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER,
    });
  }

  async createTransaction(
    cartData,
    user,
    orderId,
    paymentMethod,
    userCoookieData,
  ) {
    let parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: cartData.total_price,
      },
      customer_details: {
        first_name: user?.first_name,
        last_name: user?.last_name,
        email: userCoookieData?.email,
      },
    };

    if (!userCoookieData || !cartData) {
      throw new AppError("Missing required fields", 400);
    }

    const validMethods = ["wallet", "bank_transfer", "cod", "ewallet"];
    if (!validMethods.includes(paymentMethod) && paymentMethod) {
      throw new AppError("Invalid payment method", 400);
    }

    const transaction = await this.snap.createTransaction(parameter);

    const itemsBySeller = cartData.cart_items.reduce((acc, item) => {
      const sellerId = item.products.seller_id;
      if (!acc[sellerId]) {
        acc[sellerId] = [];
      }
      acc[sellerId].push(item);
      return acc;
    }, {});

    const transactions = [];
    const transactionItems = [];

    for (const [sellerId, items] of Object.entries(itemsBySeller)) {
      const totalAmount = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      const { data: transactionData, error: transError } =
        await this.adminClient
          .from("transactions")
          .insert([
            {
              order_id: orderId.toString(),
              buyer_id: userCoookieData.id,
              seller_id: sellerId,
              total_amount: totalAmount,
              payment_method: paymentMethod,
              redirect_url: transaction.redirect_url,
              status: "pending",
            },
          ])
          .select()
          .single();

      if (transError) throw transError;
      transactions.push(transactionData);

      const itemsToInsert = items.map((item) => ({
        transaction_id: transactionData.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price_at_purchase: item.price,
      }));

      transactionItems.push(...itemsToInsert);
    }

    if (transactionItems.length > 0) {
      const { error: transItemError } = await this.adminClient
        .from("transaction_items")
        .insert(transactionItems);

      if (transItemError) throw transItemError;
    }

    const { error: clearCartError } = await this.adminClient
      .from("cart_items")
      .delete()
      .eq("cart_id", cartData.id);

    if (clearCartError) throw clearCartError;

    return { token: transaction.token, redirect_url: transaction.redirect_url };
  }

  // Get transaction status
  async getTransactionStatus(transactionId) {
    const { data, error } = await this.adminClient
      .from("transactions")
      .select("*")
      .eq("id", transactionId)
      .single();

    if (error) throw error;
    return data;
  }

  // Get user transaction history
  async getUserTransactions(userId, role = "buyer") {
    const column = role === "buyer" ? "buyer_id" : "seller_id";

    const { data, error } = await this.adminClient
      .from("transactions")
      .select(
        `
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
            `,
      )
      .eq(column, userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  // Update transaction status
  async updateTransactionStatus(transactionId, status) {
    const validStatuses = [
      "pending",
      "paid",
      "shipped",
      "completed",
      "cancelled",
    ];

    if (!validStatuses.includes(status)) {
      throw new Error("Invalid status");
    }

    const { data, error } = await this.adminClient
      .from("transactions")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", transactionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Process refund
  async refundTransaction(transactionId) {
    const transaction = await this.getTransactionStatus(transactionId);

    if (!["paid", "shipped"].includes(transaction.status)) {
      throw new Error("Transaction cannot be refunded");
    }

    const { data, error } = await this.adminClient
      .from("transactions")
      .update({
        status: "cancelled",
        updated_at: new Date().toISOString(),
      })
      .eq("id", transactionId)
      .select()
      .single();

    if (error) throw error;

    // TODO: Process actual refund to payment gateway
    // TODO: Update user balance if using wallet

    return data;
  }

  async updateDatabase(orderId, status) {
    const { data, error } = await this.adminClient
      .from("transactions")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("order_id", orderId)
      .select();

    if (error) throw error;
    return data;
  }

  async handleWebhook(orderId, transactionStatus, fraudStatus) {
    if (transactionStatus == "capture") {
      if (fraudStatus == "challenge") {
        await this.updateDatabase(orderId, "challenge");
      } else if (fraudStatus == "accept") {
        await this.updateDatabase(orderId, "paid");
      }
    } else if (transactionStatus == "settlement") {
      await this.updateDatabase(orderId, "paid");
    } else if (
      transactionStatus == "cancel" ||
      transactionStatus == "deny" ||
      transactionStatus == "expire"
    ) {
      await this.updateDatabase(orderId, "failed");
    } else if (transactionStatus == "pending") {
      await this.updateDatabase(orderId, "pending");
    }

    return { success: true };
  }
}

export default PaymentService;
