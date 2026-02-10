import { createClient } from "@supabase/supabase-js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";

export const getConversations = catchAsyncError(async (req, res, next) => {
  const userId = req.user.id;
  const adminClient = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  );

  const { data, error } = await adminClient.rpc("get_user_conversations", {
    p_user_id: userId,
  });

  if (error) {
    const { data: messages, error: msgError } = await adminClient
      .from("messages")
      .select("sender_id, receiver_id, content, created_at")
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order("created_at", { ascending: false });

    if (msgError) throw msgError;

    const userIds = new Set();
    messages.forEach((msg) => {
      const otherId =
        msg.sender_id === userId ? msg.receiver_id : msg.sender_id;
      userIds.add(otherId);
    });

    const { data: users, error: userError } = await adminClient
      .from("users")
      .select("id, username, email")
      .in("id", Array.from(userIds));

    if (userError) throw userError;

    return res.json({ success: true, data: users });
  }

  res.json({ success: true, data });
});

export const getConversationWith = catchAsyncError(async (req, res, next) => {
  const userId = req.user.id;
  const { otherUserId } = req.params;
  const adminClient = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  );

  const { data, error } = await adminClient
    .from("messages")
    .select(
      `
      *,
      sender:users!messages_sender_id_fkey(id, username, profile_picture),
      receiver:users!messages_receiver_id_fkey(id, username, profile_picture)
    `,
    )
    .or(
      `and(sender_id.eq.${userId},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${userId})`,
    )
    .order("created_at", { ascending: true });

  if (error) throw error;

  res.json({ success: true, data });
});

export const deleteMessage = catchAsyncError(async (req, res, next) => {
  const userId = req.user.id;
  const { messageId } = req.params;
  const supabase = req.supabase;

  const { error } = await supabase
    .from("messages")
    .delete()
    .eq("id", messageId)
    .eq("sender_id", userId);

  if (error) throw error;

  res.json({ success: true, message: "Message deleted" });
});

export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const userId = req.user.id;
  const supabase = req.supabase;

  const { data, error } = await supabase
    .from("users")
    .select("id, username, email")
    .neq("id", userId);

  if (error) throw error;

  res.json({ success: true, data });
});
