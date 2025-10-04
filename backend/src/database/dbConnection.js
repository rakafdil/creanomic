import { createClient } from '@supabase/supabase-js'

async function dbConnection() {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
        throw new Error('Missing required environment variables: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

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