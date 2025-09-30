const express = require('express')
const dotenv = require('dotenv')
const { dbConnection } = require('./src/database/dbConnection.js')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running')
})

async function startServer() {
    const supabase = await dbConnection()

    app.get('/products', async (req, res) => {
        const { data, error } = await supabase.from('products').select('*')
        if (error) {
            return res.status(500).json({ error: error.message })
        }
        res.json(data)
    })

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`)
    })
}

startServer()