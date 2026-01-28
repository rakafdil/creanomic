import { createClient } from "@supabase/supabase-js";

export default class ReviewService {
  constructor(supabase) {
    this.supabase = supabase;
    this.adminClient = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
    );
  }

  async addReview(productId, reviewData, userId) {
    const { rating, comment } = reviewData;

    if (!rating) {
      throw new Error("Rating wajib diisi");
    }

    const { data, error } = await this.adminClient
      .from("reviews")
      .insert([
        {
          product_id: productId,
          user_id: userId || null,
          rating,
          comment,
        },
      ])
      .select()
      .single();

    if (error) {
      throw new Error(`Gagal menambahkan review: ${error.message}`);
    }

    return data;
  }

  async getReviews(productId) {
    const { data, error } = await this.supabase
      .from("reviews")
      .select(
        `
                id,
                product_id,
                user_id,
                rating,
                comment,
                created_at,
                users ( name ),
                products ( name )
            `,
      )
      .eq("product_id", productId)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Gagal mengambil review: ${error.message}`);
    }

    return data;
  }
}
