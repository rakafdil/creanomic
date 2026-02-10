import { AppError } from "../../utils/AppError.js";
import { createClient } from "@supabase/supabase-js";

class AuthService {
  constructor(supabase) {
    this.supabase = supabase;

    this.adminClient = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
    );
  }

  async signup(
    userData,
    redirectTo = "https://growthwell.vercel.app/auth/callback",
  ) {
    const { email, password, confirmPassword, username, firstName, lastName } =
      userData;

    if (password !== confirmPassword) {
      throw new AppError("Password and confirm password do not match", 400);
    }

    if (!email || !password || !username || !firstName || !lastName) {
      throw new AppError("All fields are required", 400);
    }

    const { data: authUser, error: authError } =
      await this.supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectTo,
        },
      });

    if (authError) throw new AppError(authError.message, error.status || 400);

    const { data: newUser, error: insertError } = await this.adminClient
      .from("users")
      .insert({
        id: authUser.user?.id,
        username,
        first_name: firstName,
        last_name: lastName,
      })
      .select("id, username, first_name, last_name, created_at")
      .single();

    if (insertError) throw new AppError(insertError.message, 500);

    return {
      user: newUser,
      token: authUser.session?.access_token,
    };
  }

  async loginWithGoogle(
    redirectTo = "https://growthwell.vercel.app/auth/callback",
  ) {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
    if (error) throw new AppError(error.message, error.status || 400);
    return { url: data.url };
  }

  async emailConfirmation() {
    const {
      data: { user },
      error,
    } = await this.supabase.auth.getUser();

    if (error) {
      throw new AppError(error.message, error.status);
    }

    if (!user?.email_confirmed_at) {
      throw new AppError("Email has not been confirmed", 400);
    }

    await this.adminClient
      .from("users")
      .update({ email_verified: true })
      .eq("id", userId);

    return {
      message: "Email has been confirmed",
    };
  }

  async login(credentials) {
    const { email, password } = credentials;

    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }

    const { data: authData, error: authError } =
      await this.supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError || !authData.user) {
      throw new AppError("Invalid email or password", 401);
    }

    if (!authData.user.email_confirmed_at) {
      throw new AppError("Email not verified", 401);
    }

    const userId = authData.user.id;

    const { data: profile, error: profileError } = await this.adminClient
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (profileError || !profile) {
      throw new AppError("User profile not found", 404);
    }

    // if (!profile.is_active) {
    //     throw new AppError("Account is deactivated", 401)
    // }

    await this.adminClient
      .from("users")
      .update({ last_login: new Date().toISOString() })
      .eq("id", userId);

    return {
      user: {
        id: profile.id,
        email: authData.user.email,
        username: profile.username,
        fullName: `${profile.first_name} ${profile.last_name}`,
      },
      token: authData.session?.access_token,
    };
  }

  async getUserProfile(user) {
    const { data: userData, error } = await this.adminClient
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();
    // console.log(error);
    if (error) throw new AppError(error.message, error.status || 400);

    return {
      id: userData.id,
      email: user.email,
      username: userData.username,
      first_name: userData.first_name,
      last_name: userData.last_name,
      profile_picture: userData.profile_picture,
      phone: userData.phone,
      address: userData.address,
      role: userData.role,
      seller_rating: userData.seller_rating,
      buyer_rating: userData.buyer_rating,
      is_active: userData.is_active,
      last_login: userData.last_login,
      created_at: userData.created_at,
      updated_at: userData.updated_at,
    };
  }

  async getUsers(userId) {
    const { data, error } = await this.adminClient
      .from("users")
      .select("*")
      .neq("id", userId);

    if (error) throw new AppError(error.message, error.status || 400);

    return data.map((user) => ({
      id: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      profile_picture: user.profile_picture,
      role: user.role,
      seller_rating: user.seller_rating,
      buyer_rating: user.buyer_rating,
      is_active: user.is_active,
      last_login: user.last_login,
    }));
  }

  async searchUser(query, userId) {
    const { data, error } = await this.adminClient
      .from("users")
      .select("*")
      .or(
        `username.ilike.%${query}%,first_name.ilike.%${query}%,last_name.ilike.%${query}%`,
      )
      .neq("id", userId);

    if (error) throw new AppError(error.message, error.status || 400);

    return data.map((user) => ({
      id: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      profile_picture: user.profile_picture,
      role: user.role,
      seller_rating: user.seller_rating,
      buyer_rating: user.buyer_rating,
      is_active: user.is_active,
      last_login: user.last_login,
    }));
  }

  async forgotPassword(email) {
    const { data, error } = await this.supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: "https://api-growthwell.vercel.app/auth/reset-password",
      },
    );

    if (error) throw new AppError(error.message, error.status || 400);
    return { message: "Check your email to reset password" };
  }

  async handleResetPassword(newPassword, accessToken) {
    const { data, error } = await this.adminClient.auth.updateUser(
      {
        password: newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (error) throw new AppError(error.message, error.status || 400);
    return { message: "Password reset is succes" };
  }

  async handleOAuthUser(authUser) {
    if (!authUser || !authUser.id) {
      throw new AppError("Invalid user data from OAuth", 400);
    }

    const { data: existingUser, error: fetchError } = await this.adminClient
      .from("users")
      .select("id, username, first_name, last_name")
      .eq("id", authUser.id)
      .single();

    if (existingUser && !fetchError) {
      return {
        user: existingUser,
        isNewUser: false,
      };
    }

    const userMetadata = authUser.user_metadata || {};
    const email = authUser.email;

    const username =
      userMetadata.preferred_username ||
      email?.split("@")[0] ||
      `user_${authUser.id.slice(0, 8)}`;

    const fullName = userMetadata.full_name || userMetadata.name || "";
    const nameParts = fullName.split(" ");
    const firstName = userMetadata.given_name || nameParts[0] || "User";
    const lastName =
      userMetadata.family_name || nameParts.slice(1).join(" ") || "";

    const { data: newUser, error: insertError } = await this.adminClient
      .from("users")
      .insert({
        id: authUser.id,
        username,
        first_name: firstName,
        last_name: lastName,
        profile_picture:
          userMetadata.avatar_url || userMetadata.picture || null,
        email_verified: authUser.email_confirmed_at ? true : false,
      })
      .select(
        "id, username, first_name, last_name, profile_picture, created_at",
      )
      .single();

    if (insertError) {
      if (insertError.code === "23505") {
        const { data: user } = await this.adminClient
          .from("users")
          .select("id, username, first_name, last_name")
          .eq("id", authUser.id)
          .single();

        return { user, isNewUser: false };
      }
      throw new AppError(insertError.message, 500);
    }

    return {
      user: newUser,
      isNewUser: true,
    };
  }

  async logout() {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw new AppError(error.message, 500);
  }
}

export { AuthService };
