import { AppError } from "../../utils/AppError.js";
import { createClient } from "@supabase/supabase-js";

class AuthService {
    constructor(supabase) {
        this.supabase = supabase;

        this.adminClient = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY
        );
    }

    async signup(userData, redirectTo = "http://localhost:3000/auth/callback") {
        const { email, password, confirmPassword, username, firstName, lastName } = userData;

        if (password !== confirmPassword) {
            throw new AppError("Password and confirm password do not match", 400);
        }

        if (!email || !password || !username || !firstName || !lastName) {
            throw new AppError("All fields are required", 400);
        }

        const { data: authUser, error: authError } = await this.supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: redirectTo,
            },
        });

        if (authError) throw new AppError(authError.message, 400);

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

    async login(credentials) {
        const { email, password } = credentials;

        if (!email || !password) {
            throw new AppError("Email and password are required", 400);
        }

        const { data: authData, error: authError } = await this.supabase.auth.signInWithPassword({
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

        const { data: profile, error: profileError } = await this.supabase
            .from('users')
            .select('*')
            .eq("id", userId)
            .single();

        if (profileError || !profile) {
            throw new AppError("User profile not found", 404);
        }

        if (!profile.is_active) {
            throw new AppError("Account is deactivated", 401);
        }

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

    async getUserProfile(userId) {
        const { data: user, error } = await this.supabase
            .from("users")
            .select("*")
            .eq("id", userId)
            .single();

        if (error || !user) {
            throw new AppError("User not found", 404);
        }

        return {
            id: user.id,
            email: user.email_verified,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            avatar_url: user.avatar_url,
            phone: user.phone,
            address: user.address,
            is_seller: user.is_seller,
            seller_rating: user.seller_rating,
            buyer_rating: user.buyer_rating,
            is_active: user.is_active,
            last_login: user.last_login,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };
    }

    async logout() {
        const { error } = await this.supabase.auth.signOut();
        if (error) throw new AppError(error.message, 500);
    }
}

export { AuthService };
