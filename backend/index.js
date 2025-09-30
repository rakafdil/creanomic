    const express = require('express')
    const dotenv = require('dotenv')
    const { dbConnection } = require('./src/database/dbConnection.js')
    const { bootstrap } = require('./src/bootstrap.js')

    dotenv.config()
    const app = express()
    const PORT = process.env.PORT || 3000

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