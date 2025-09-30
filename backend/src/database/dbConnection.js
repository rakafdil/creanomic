import { createClient } from '@supabase/supabase-js'

async function dbConnection() {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

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