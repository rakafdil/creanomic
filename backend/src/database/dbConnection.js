import { createClient } from '@supabase/supabase-js'

async function dbConnection() {
    const supabaseUrl = process.env.SUPABASE_URL
<<<<<<< HEAD
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
        throw new Error('Missing required environment variables: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)
=======
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing required environment variables: SUPABASE_URL and SUPABASE_ANON_KEY')
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)
>>>>>>> 36c660dcdefb3216eafb97627e6a717e96f9a47a

    try {
        const { error } = await supabase.from('products').select('id').limit(1)
        if (error) {
            console.log("DB Failed to connect:", error.message)
        } else {
            console.log("DB Connected Successfully")
        }
    } catch (err) {
        console.log("DB Failed to connect:", err.message)
    }

    return supabase
}

export { dbConnection }