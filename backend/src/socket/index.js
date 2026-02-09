import { messageHandler } from "./handlers/messageHandler.js";
import { createClient } from "@supabase/supabase-js";

export const initializeSocket = (io, supabase) => {
  io.use(async (socket, next) => {
    try {
      const cookies = socket.handshake.headers.cookie;
      if (!cookies) {
        return next(new Error("Authentication error: No cookies"));
      }

      const authToken = cookies
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];

      if (!authToken) {
        return next(new Error("Authentication error: No token"));
      }

      const supabaseClient = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_ANON_KEY,
        {
          global: {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        },
      );

      const { data: user, error } = await supabaseClient.auth.getUser();

      if (error || !user) {
        return next(new Error("Authentication error: Invalid token"));
      }

      socket.data.userId = user.user.id;
      socket.data.user = user.user;

      next();
    } catch (err) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log("Socket connected", socket.id, "User:", socket.data.userId);

    socket.join(socket.data.userId);

    messageHandler(socket, io, supabase);

    socket.on("disconnect", () => {
      console.log("Socket disconnected", socket.id);
    });
  });
};
