import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./src/database/dbConnection.js";
import { bootstrap } from "./src/bootstrap.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["https://creanomic.vercel.app", "http://localhost:3000", "*"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("API is running with CORS enabled");
});

// Development
const startServer = async () => {
  try {
    const supabase = await dbConnection();
    bootstrap(app, supabase);

    const PORT = process.env.PORT || 5050;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();

// Production serverless
// const handler = async (req, res) => {
//   try {
//     const supabase = await dbConnection();
//     bootstrap(app, supabase);

//     app(req, res);
//   } catch (error) {
//     console.error("Handler error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export default handler;
