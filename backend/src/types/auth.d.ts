export interface UserData {
    email: string
    password: string
    confirmPassword: string
    username: string
    firstName: string
    lastName: string
    avatarUrl?: string
    phone?: string
    address?: string
    isSeller?: boolean
}

export interface Credentials {
    email: string
    password: string
}

export interface UserProfile {
    id: string
    email: string
    username: string
    first_name: string
    last_name: string
    avatar_url?: string | null
    phone?: string | null
    address?: string | null
    is_seller: boolean
    seller_rating: number
    buyer_rating: number
    is_active: boolean
    last_login?: string | null
    created_at: string
    updated_at: string
}
