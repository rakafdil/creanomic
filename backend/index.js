import express from 'express'
import dotenv from 'dotenv'
import { dbConnection } from './src/database/dbConnection.js'
import { bootstrap } from './src/bootstrap.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

app.get('/', (req, res) => res.send('API is running'))

async function startServer() {
    const supabase = await dbConnection()

    bootstrap(app, supabase)

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`)
    })
}

startServer()