exports.getAllProducts = (supabase) => async (req, res) => {
    const { data, error } = await supabase.from('products').select('*')
    if (error) return res.status(500).json({ error: error.message })
    res.json(data)
}