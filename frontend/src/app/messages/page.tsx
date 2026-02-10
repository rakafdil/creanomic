"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Circle, Search } from "lucide-react";
import UserListItem from "@/components/Messages/UserListItem";
import MessageBubble from "@/components/Messages/MessageBubble";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../page";
import { Field } from "@/components/ui/field";
import { useDebouncedCallback } from "@tanstack/react-pacer";
import { FaSpinner } from "react-icons/fa";
import { io, Socket } from "socket.io-client";

export interface User {
  id: string;
  username: string;
  profile_picture: string;
  first_name: string;
  last_name: string;
  status: "online" | "offline";
  role: string;
  seller_rating: number;
  buyer_rating: number;
  last_login?: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
}

export default function MessagingPage() {
  const controller = useRef(new AbortController());
  const [socket, setSocket] = useState<Socket | null>(null);
  const scrollViewportRef = useRef<HTMLDivElement | null>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);
  const [activeUserId, setActiveUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const [isConversationLoading, setIsConversationLoading] = useState(true);

  const prevMessagesLengthRef = useRef(0);

  const users = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}auth/users`, {
        withCredentials: true,
      });
      return response.data.data;
    },
  });

  const activeUser = useMemo(
    () => users.data?.find((u) => u.id === activeUserId),
    [users.data, activeUserId],
  );

  const displayedUsers = useMemo(
    () => (searchResult.length === 0 ? users.data || [] : searchResult),
    [searchResult, users.data],
  );

  const debouncedSearch = useDebouncedCallback(
    async (query: string) => {
      if (!query.trim()) {
        setSearchResult([]);
        return;
      }

      try {
        controller.current.abort();
        controller.current = new AbortController();

        setLoading(true);

        const res = await axios.get(`${BASE_URL}auth/search/${query}`, {
          signal: controller.current.signal,
          withCredentials: true,
        });

        setSearchResult(res.data.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }
        const error = err as AxiosError;

        if (error.response?.status === 404) {
          setSearchResult([]);
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    },
    { wait: 500 },
  );

  useEffect(() => {
    if (
      messages.length > prevMessagesLengthRef.current &&
      scrollViewportRef.current
    ) {
      scrollViewportRef.current.scrollTop =
        scrollViewportRef.current.scrollHeight;
    }
    prevMessagesLengthRef.current = messages.length;
  }, [messages]);

  useEffect(() => {
    const newSocket = io(
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050",
      {
        withCredentials: true,
      },
    );

    newSocket.on("connect", () => {
      console.log("Connected to socket server");
    });

    newSocket.on("new_message", (message: Message) => {
      console.log("New message received:", message);
      setMessages((prev) => [...prev, message]);
    });

    newSocket.on(
      "message_deleted",
      ({ message_id }: { message_id: string }) => {
        setMessages((prev) => prev.filter((m) => m.id !== message_id));
      },
    );

    newSocket.on("conversation_loaded", (msgs: Message[]) => {
      setMessages(msgs);
      setIsConversationLoading(false);
    });

    newSocket.on("message_error", ({ error }: { error: string }) => {
      console.error("Socket error:", error);
    });

    setSocket(newSocket);

    axios
      .get(`${BASE_URL}auth/profile`, { withCredentials: true })
      .then((res) => {
        setCurrentUserId(res.data.data.id);
      })
      .catch((err) => console.error("Failed to get user profile:", err));

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (socket && activeUserId) {
      setIsConversationLoading(true);
      console.log("Loading conversation with:", activeUserId);
      socket.emit("get_conversation", { other_user_id: activeUserId });
    }
  }, [socket, activeUserId]);

  const handleSendMessage = useCallback(() => {
    const content = messageInputRef.current?.value.trim();

    if (!content || !socket || !activeUserId) {
      return;
    }

    console.log("Sending message:", { content, receiver_id: activeUserId });
    socket.emit("send_message", {
      content,
      receiver_id: activeUserId,
    });

    if (messageInputRef.current) {
      messageInputRef.current.value = "";
    }
  }, [socket, activeUserId]);

  const handleDeleteMessage = useCallback(
    (messageId: string) => {
      if (socket) {
        socket.emit("delete_message", { message_id: messageId });
      }
    },
    [socket],
  );

  const handleUserClick = useCallback((userId: string) => {
    setMessages([]);
    if (messageInputRef.current) {
      messageInputRef.current.value = "";
    }

    setActiveUserId(userId);
  }, []);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSendMessage();
      }
    },
    [handleSendMessage],
  );

  const createDeleteHandler = useCallback(
    (messageId: string) => () => handleDeleteMessage(messageId),
    [handleDeleteMessage],
  );

  return (
    <div className="h-screen flex border-slate-100 via-white to-amber-50/30 px-20">
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }
      `}</style>

      <aside className="w-80 bg-white flex flex-col shadow-sm border-t border-r">
        <div className="p-6 border-b bg-gradient-to-r from-slate-50 to-amber-50/30 flex flex-col gap-10">
          <span>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-1">
              Messages
            </h1>
            <p className="text-sm text-slate-500">
              Connect with your clients/sellers
            </p>
          </span>
          <Field orientation="horizontal">
            <Input
              type="search"
              placeholder="Search..."
              onChange={(e) => debouncedSearch(e.target.value)}
            />
            <Search />
          </Field>
        </div>

        <ScrollArea className="flex flex-col h-full min-h-0">
          <div className="py-2">
            {loading ? (
              <div className="flex gap-2 px-10 pt-4">
                <FaSpinner className="animate-spin" />
                Loading...
              </div>
            ) : (
              displayedUsers.map((user, index) => (
                <div
                  key={user.id}
                  className="animate-slideIn"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <UserListItem
                    user={user}
                    isActive={activeUserId === user.id}
                    onClick={() => handleUserClick(user.id)}
                  />
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </aside>

      <main className="h-full flex-1 flex flex-col border-t border-r">
        {activeUser ? (
          <>
            <header className="h-20 bg-white border-slate-200 flex items-center px-8 border-b">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-14 w-14 border-2 border-amber-200 shadow-sm cursor-pointer">
                    <AvatarImage
                      src={activeUser.profile_picture}
                      alt={activeUser.username}
                    />
                    <AvatarFallback>
                      {activeUser.username
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Circle
                    className={`absolute -bottom-1 -right-1 h-4 w-4 ${
                      activeUser.status === "online"
                        ? "fill-emerald-500 text-emerald-500"
                        : "fill-slate-300 text-slate-300"
                    } stroke-white stroke-[2.5px]`}
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                    {activeUser.username}
                  </h2>
                  <p className="text-sm text-slate-500">
                    {activeUser.status === "online" ? (
                      <span className="text-emerald-600 font-medium">
                        ● Active now
                      </span>
                    ) : (
                      `Last seen ${activeUser.last_login || "recently"}`
                    )}
                  </p>
                </div>
              </div>
            </header>

            <div className="relative flex flex-col h-full min-h-0">
              <ScrollArea className="h-full px-8 py-6 pb-25">
                <div
                  className="max-w-4xl mx-auto"
                  ref={(node) => {
                    if (node) {
                      const viewport = node.closest(
                        "[data-radix-scroll-area-viewport]",
                      );
                      if (viewport)
                        scrollViewportRef.current = viewport as HTMLDivElement;
                    }
                  }}
                >
                  {isConversationLoading ? (
                    Array.from({ length: 10 }).map((_, i) => {
                      const isSent = i % 2 === 0;

                      return (
                        <div
                          key={i}
                          className={`flex ${isSent ? "justify-end" : "justify-start"} mb-4 animate-pulse`}
                        >
                          <div
                            className={`max-w-[70%] flex flex-col gap-2 ${
                              isSent ? "items-end" : "items-start"
                            }`}
                          >
                            <div
                              className={`px-4 py-3 rounded-2xl ${
                                isSent ? "bg-gray-300" : "bg-gray-300"
                              }`}
                            >
                              <div className="h-4 w-40 rounded " />
                            </div>

                            <div className="h-3 w-16 rounded bg-gray-300" />
                          </div>
                        </div>
                      );
                    })
                  ) : messages.length === 0 ? (
                    <div className="text-center text-slate-400 mt-10">
                      No messages yet. Start the conversation!
                    </div>
                  ) : (
                    messages.map((message) => (
                      <MessageBubble
                        key={message.id}
                        message={{
                          id: message.id,
                          userId: message.sender_id,
                          text: message.content,
                          timestamp: new Date(
                            message.created_at,
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          }),
                          isSent: message.sender_id !== activeUserId,
                        }}
                        onDelete={
                          message.sender_id === currentUserId
                            ? createDeleteHandler(message.id)
                            : undefined
                        }
                      />
                    ))
                  )}
                </div>
              </ScrollArea>

              <div className="absolute bottom-0 w-full bg-white border-t border-slate-200 p-6 shadow-sm">
                <div className="max-w-4xl mx-auto flex gap-3">
                  <Input
                    ref={messageInputRef}
                    type="text"
                    placeholder="Type your message..."
                    onKeyPress={handleKeyPress}
                    className="flex-1 h-12 px-4 bg-slate-50 border-slate-200 focus:border-amber-500 focus:ring-amber-500 rounded-xl text-[15px] transition-all duration-200 hover:cursor-text"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="h-12 px-6 bg-gradient-to-r cursor-pointer hover:text-white text-amber-600 hover:from-amber-700 hover:to-amber-800 rounded-xl shadow-sm shadow-sm-900/20 transition-all duration-300 hover:shadow-sm hover:shadow-sm-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-8" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-slate-400">
              <p className="text-xl font-medium">Select a conversation</p>
              <p className="text-sm mt-2">
                Choose a user from the list to start messaging
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
