import { dbConnection } from "../../database/dbConnection.js";
import { AppError } from "../../utils/AppError.js";

let supabase;
async function getSupabase() {
    if (!supabase) {
        supabase = await dbConnection();
    }
    return supabase;
}

export const addToCart = async (userId, product) => {
    // cek apakah user sudah punya cart
    let { data: cart, error: cartError } = await supabase
        .from("carts")
        .select("*")
        .eq("user_id", userId)
        .single();

    if (cartError && cartError.code !== "PGRST116") { // bukan "No rows found"
        throw new AppError(cartError.message, 400);
    }

    if (!cart) {
        const { data: newCart, error: newCartError } = await supabase
            .from("carts")
            .insert([{ user_id: userId, total_price: product.price * product.quantity }])
            .select()
            .single();

        if (newCartError) throw new AppError(newCartError.message, 400);
        cart = newCart;
    }

    // cek apakah product sudah ada di cart_items
    let { data: existingItem } = await supabase
        .from("cart_items")
        .select("*")
        .eq("cart_id", cart.id)
        .eq("product_id", product.product_id)
        .eq("seller_id", product.seller_id)
        .single();

    if (existingItem) {
        // update quantity
        const { error: updateError } = await supabase
            .from("cart_items")
            .update({ quantity: existingItem.quantity + product.quantity })
            .eq("id", existingItem.id);
        if (updateError) throw new AppError(updateError.message, 400);
    } else {
        // insert item baru
        const { error: insertError } = await supabase.from("cart_items").insert([
            {
                cart_id: cart.id,
                product_id: product.product_id,
                quantity: product.quantity,
                price: product.price,
            },
        ]);
        if (insertError) throw new AppError(insertError.message, 400);
    }

    // update total_price
    const { data: allItems, error: itemsError } = await supabase
        .from("cart_items")
        .select("*")
        .eq("cart_id", cart.id);

    if (itemsError) throw new AppError(itemsError.message, 400);

    const totalPrice = allItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    await supabase.from("carts").update({ total_price: totalPrice }).eq("id", cart.id);

    return { ...cart, total_price: totalPrice, items: allItems };
};

// Ambil cart user
export const getCart = async (userId) => {
    const { data: cart, error } = await supabase
        .from("carts")
        .select(`
            *,
            cart_items (
                id,
                cart_id,
                quantity,
                price,
                product_id,
                seller_id,
                products:product_id (
                    product_id,
                    product_name,
                    price,
                    discount,
                    seller_id
                )
            )
        `)
        .eq("user_id", userId)
        .single();

    if (error) throw new AppError("Cart not found", 404);
    return cart;
};

// Hapus item
export const removeFromCart = async (userId, itemId) => {
    const { data: cart } = await supabase.from("carts").select("id").eq("user_id", userId).single();

    if (!cart) throw new AppError("Cart not found", 404);

    const { error: delError } = await supabase.from("cart_items").delete().eq("id", itemId);
    if (delError) throw new AppError(delError.message, 400);

    return await getCart(userId);
};

// Update quantity
export const updateCartItem = async (userId, itemId, quantity) => {
    const { error: updError } = await supabase
        .from("cart_items")
        .update({ quantity })
        .eq("id", itemId);
    if (updError) throw new AppError(updError.message, 400);

    return await getCart(userId);
};

// Apply coupon sederhana
export const applyCoupon = async (userId, couponCode) => {
    const { data: cart, error } = await supabase
        .from("carts")
        .select("*")
        .eq("user_id", userId)
        .single();
    if (error) throw new AppError("Cart not found", 404);

    let newTotal = cart.total_price;
    if (couponCode === "DISKON10") {
        newTotal = cart.total_price * 0.9;
    } else {
        throw new AppError("Invalid coupon", 400);
    }

    const { error: updError } = await supabase
        .from("carts")
        .update({ total_price: newTotal, coupon: couponCode })
        .eq("id", cart.id);
    if (updError) throw new AppError(updError.message, 400);

    return { ...cart, total_price: newTotal, coupon: couponCode };
};