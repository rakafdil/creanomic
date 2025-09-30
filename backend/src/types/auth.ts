export type UserData = {
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

export type Credentials = {
    email: string
    password: string
}

export type UserProfile = {
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
