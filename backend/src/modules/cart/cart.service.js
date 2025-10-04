import { dbConnection } from "../../database/dbConnection.js";
import { AppError } from "../../utils/AppError.js";

let supabase;
async function getSupabase() {
    if (!supabase) {
        supabase = await dbConnection();
    }
    return supabase;
}

// Tambah item ke cart
export const addToCart = async (userId, product) => {
    const supabase = await getSupabase();

    // cek apakah user sudah punya cart
    let { data: cart, error: cartError } = await supabase
        .from("carts")
        .select("*")
        .eq("user_id", userId)
        .single();

    if (cartError && cartError.code !== "PGRST116")
        throw new AppError(cartError.message, 400);

    if (!cart) {
        const { data: newCart, error: newCartError } = await supabase
            .from("carts")
            .insert([{ user_id: userId, total_price: product.price * product.quantity, coupon: "" }])
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
        .maybeSingle();

    if (existingItem) {
        const { error: updateError } = await supabase
            .from("cart_items")
            .update({ quantity: existingItem.quantity + product.quantity })
            .eq("cart_id", cart.id)
            .eq("product_id", product.product_id)
            .eq("seller_id", product.seller_id);
        if (updateError) throw new AppError(updateError.message, 400);
    } else {
        const { error: insertError } = await supabase.from("cart_items").insert([{
            cart_id: cart.id,
            product_id: product.product_id,
            seller_id: product.seller_id,
            quantity: product.quantity,
            price: product.price,
        }]);
        if (insertError) throw new AppError(insertError.message, 400);
    }

    // hitung ulang total
    const { data: allItems, error: itemsError } = await supabase
        .from("cart_items")
        .select("*")
        .eq("cart_id", cart.id);

    if (itemsError) throw new AppError(itemsError.message, 400);

    const totalPrice = allItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    await supabase.from("carts").update({ total_price: totalPrice }).eq("id", cart.id);

    return { ...cart, total_price: totalPrice, items: allItems };
};

export const getCart = async (userId) => {
    const supabase = await getSupabase();

    const { data: cart, error } = await supabase
        .from("carts")
        .select("*, cart_items(*)")
        .eq("user_id", userId)
        .single();

    if (error) throw new AppError(error.message, 400);

    return cart;
};

export const removeFromCart = async (userId, productId) => {
    const supabase = await getSupabase();

    // cari cart user
    const { data: cart, error: cartError } = await supabase
        .from("carts")
        .select("id")
        .eq("user_id", userId)
        .single();

    if (cartError) throw new AppError(cartError.message, 400);

    // hapus item
    const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("cart_id", cart.id)
        .eq("product_id", productId);

    if (error) throw new AppError(error.message, 400);

    return { message: "Item removed" };
};

export const updateCartItem = async (userId, productId, quantity) => {
    const supabase = await getSupabase();

    const { data: cart, error: cartError } = await supabase
        .from("carts")
        .select("id")
        .eq("user_id", userId)
        .single();

    if (cartError) throw new AppError(cartError.message, 400);

    const { error } = await supabase
        .from("cart_items")
        .update({ quantity })
        .eq("cart_id", cart.id)
        .eq("product_id", productId);

    if (error) throw new AppError(error.message, 400);

    return { message: "Item updated", productId, quantity };
};

export const applyCoupon = async (userId, couponCode) => {
    const supabase = await getSupabase();

    // misalnya cek coupon valid
    const { data: coupon, error: couponError } = await supabase
        .from("coupons")
        .select("*")
        .eq("code", couponCode)
        .single();

    if (couponError) throw new AppError(couponError.message, 400);

    const { data: cart, error: cartError } = await supabase
        .from("carts")
        .update({ coupon: couponCode })
        .eq("user_id", userId)
        .select()
        .single();

    if (cartError) throw new AppError(cartError.message, 400);

    return cart;
};