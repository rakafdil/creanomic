import { createClient } from "@supabase/supabase-js";

class CartService {
  constructor(supabase) {
    this.supabase = supabase;

    this.adminClient = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
    );
  }

  async getOrCreateCart(userId) {
    let { data: cart, error: cartError } = await this.adminClient
      .from("carts")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (cartError && cartError.code !== "PGRST116") {
      throw cartError;
    }

    if (!cart) {
      const { data: newCart, error: newCartError } = await this.adminClient
        .from("carts")
        .insert([
          {
            user_id: userId,
            total_price: 0,
            coupon: "",
          },
        ])
        .select()
        .single();

      if (newCartError) throw newCartError;
      cart = newCart;
    }

    return cart;
  }

  async addItem(userId, productId, quantity, price) {
    const cart = await this.getOrCreateCart(userId);

    let { data: existingItem } = await this.adminClient
      .from("cart_items")
      .select("*")
      .eq("cart_id", cart.id)
      .eq("product_id", productId)
      .maybeSingle();

    if (existingItem) {
      const { data, error } = await this.adminClient
        .from("cart_items")
        .update({
          quantity: existingItem.quantity + quantity,
          price: price,
        })
        .eq("cart_id", cart.id)
        .eq("product_id", productId)
        .select()
        .single();

      if (error) throw error;
      await this.updateCartTotal(cart.id);
      return data;
    } else {
      const { data, error } = await this.adminClient
        .from("cart_items")
        .insert([
          {
            cart_id: cart.id,
            product_id: productId,
            quantity: quantity,
            price: price,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      await this.updateCartTotal(cart.id);
      return data;
    }
  }

  async getCart(userId) {
    const { data: cart, error } = await this.adminClient
      .from("carts")
      .select(
        `
        *,
        cart_items (
            *,
            products:product_id (
                seller_id,
                name,
                img_url,
                unit_value,
                unit_label,
                price,
                seller:seller_id (
                    stores:store_id (
                    store_name
                    )
                )
            )
        )
       `,
      )
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw error;

    if (cart && cart.cart_items) {
      cart.cart_items.sort((a, b) => {
        const nameA = a.products?.name?.toLowerCase() || "";
        const nameB = b.products?.name?.toLowerCase() || "";
        return nameA.localeCompare(nameB);
      });
    }

    return cart;
  }

  async removeItem(userId, productId) {
    const cart = await this.getOrCreateCart(userId);

    const { error } = await this.adminClient
      .from("cart_items")
      .delete()
      .eq("cart_id", cart.id)
      .eq("product_id", productId);

    if (error) throw error;
    await this.updateCartTotal(cart.id);
    return { message: "Item removed successfully" };
  }

  async updateItemQuantity(userId, productId, quantity) {
    const cart = await this.getOrCreateCart(userId);

    if (quantity <= 0) {
      return await this.removeItem(userId, productId);
    }

    const { data, error } = await this.adminClient
      .from("cart_items")
      .update({ quantity })
      .eq("cart_id", cart.id)
      .eq("product_id", productId)
      .select()
      .single();

    if (error) throw error;
    await this.updateCartTotal(cart.id);
    return data;
  }

  async updateCartTotal(cartId) {
    const { data: items, error: itemsError } = await this.adminClient
      .from("cart_items")
      .select("quantity, price")
      .eq("cart_id", cartId);

    if (itemsError) throw itemsError;

    const totalPrice = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    const { error: updateError } = await this.adminClient
      .from("carts")
      .update({ total_price: totalPrice })
      .eq("id", cartId);

    if (updateError) throw updateError;
    return totalPrice;
  }

  async clearCart(userId) {
    const cart = await this.getOrCreateCart(userId);

    const { error } = await this.adminClient
      .from("cart_items")
      .delete()
      .eq("cart_id", cart.id);

    if (error) throw error;

    await this.adminClient
      .from("carts")
      .update({ total_price: 0, coupon: "" })
      .eq("id", cart.id);

    return { message: "Cart cleared successfully" };
  }
  async applyCoupon(userId, couponCode) {
    const cart = await this.getOrCreateCart(userId);

    const { data, error } = await this.adminClient
      .from("carts")
      .update({ coupon: couponCode })
      .eq("id", cart.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

export default CartService;
