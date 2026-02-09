export const messageHandler = (socket, io, supabase) => {
  socket.on("send_message", async (data) => {
    try {
      const { content, receiver_id } = data;
      const sender_id = socket.data.userId;

      if (!sender_id) {
        socket.emit("message_error", { error: "Unauthorized" });
        return;
      }

      const { data: message, error } = await supabase
        .from("messages")
        .insert({ content, sender_id, receiver_id })
        .select()
        .single();

      if (error) {
        socket.emit("message_error", { error: error.message });
        return;
      }

      io.to(sender_id).emit("new_message", message);
      io.to(receiver_id).emit("new_message", message);
    } catch (error) {
      console.error("Error handling send_message:", error);
      socket.emit("message_error", { error: "Failed to send message" });
    }
  });

  socket.on("delete_message", async (data) => {
    try {
      const { message_id } = data;
      const sender_id = socket.data.userId;

      const { error } = await supabase
        .from("messages")
        .delete()
        .eq("id", message_id)
        .eq("sender_id", sender_id);

      if (error) {
        socket.emit("message_error", { error: error.message });
        return;
      }

      io.emit("message_deleted", { message_id });
    } catch (error) {
      socket.emit("message_error", { error: "Failed to delete message" });
    }
  });

  socket.on("get_conversation", async (data) => {
    try {
      const { other_user_id } = data;
      const user_id = socket.data.userId;

      const { data: messages, error } = await supabase
        .from("messages")
        .select("*")
        .or(
          `and(sender_id.eq.${user_id},receiver_id.eq.${other_user_id}),and(sender_id.eq.${other_user_id},receiver_id.eq.${user_id})`,
        )
        .order("created_at", { ascending: true });

      if (error) {
        socket.emit("message_error", { error: error.message });
        return;
      }

      socket.emit("conversation_loaded", messages);
    } catch (error) {
      console.error("Error loading conversation:", error);
      socket.emit("message_error", { error: "Failed to load conversation" });
    }
  });
};
