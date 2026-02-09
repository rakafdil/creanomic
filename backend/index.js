import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { dbConnection } from "./src/database/dbConnection.js";
import { bootstrap } from "./src/bootstrap.js";
import { Server } from "socket.io";
import { initializeSocket } from "./src/socket/index.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["https://creanomic.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

const startServer = async () => {
  try {
    const supabase = await dbConnection();
    bootstrap(app, supabase);

    const PORT = process.env.PORT || 5050;
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    const io = new Server(server, {
      cors: {
        origin: ["https://creanomic.vercel.app", "http://localhost:3000"],
        credentials: true,
      },
    });

    initializeSocket(io, supabase);

    app.set("io", io);
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
