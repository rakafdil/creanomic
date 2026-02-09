import { Router } from "express";
import { supabaseAuth } from "../../middlewares/auth.js";
import {
  getConversations,
  getConversationWith,
  deleteMessage,
  getAllUsers,
} from "./message.controller.js";

const messageRouter = (supabase) => {
  const router = Router();

  router.get("/users", supabaseAuth, getAllUsers);

  router.get("/conversations", supabaseAuth, getConversations);

  router.get("/conversations/:otherUserId", supabaseAuth, getConversationWith);

  router.delete("/:messageId", supabaseAuth, deleteMessage);

  return router;
};

export default messageRouter;
