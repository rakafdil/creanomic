"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Circle } from "lucide-react";

// Types
interface User {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline";
  lastSeen?: string;
}

interface Message {
  id: string;
  userId: string;
  text: string;
  timestamp: string;
  isSent: boolean;
}

// Dummy Data
const users: User[] = [
  {
    id: "1",
    name: "Elena Rodriguez",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    status: "online",
  },
  {
    id: "2",
    name: "Marcus Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    status: "online",
  },
  {
    id: "3",
    name: "Sophie Laurent",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
    status: "offline",
    lastSeen: "2 hours ago",
  },
  {
    id: "4",
    name: "James O'Brien",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    status: "online",
  },
  {
    id: "5",
    name: "Aisha Patel",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
    status: "offline",
    lastSeen: "1 day ago",
  },
  {
    id: "6",
    name: "Leo Martinez",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leo",
    status: "online",
  },
];

const messagesByUser: Record<string, Message[]> = {
  "1": [
    {
      id: "1",
      userId: "1",
      text: "Hey! How are you doing?",
      timestamp: "10:30 AM",
      isSent: false,
    },
    {
      id: "2",
      userId: "me",
      text: "I'm good! Just working on a new project. I'm good! Just working on a new project. I'm good! Just working on a new project. I'm good! Just working on a new project.",
      timestamp: "10:32 AM",
      isSent: true,
    },
    {
      id: "3",
      userId: "1",
      text: "That sounds exciting! What kind of project?",
      timestamp: "10:33 AM",
      isSent: false,
    },
    {
      id: "4",
      userId: "me",
      text: "A messaging interface with a really clean design",
      timestamp: "10:35 AM",
      isSent: true,
    },
    {
      id: "5",
      userId: "1",
      text: "I'd love to see it when you're done!",
      timestamp: "10:36 AM",
      isSent: false,
    },
    {
      id: "6",
      userId: "1",
      text: "I'd love to see it when you're done!",
      timestamp: "10:36 AM",
      isSent: false,
    },
    {
      id: "7",
      userId: "1",
      text: "I'd love to see it when you're done!",
      timestamp: "10:36 AM",
      isSent: false,
    },
    {
      id: "8",
      userId: "1",
      text: "I'd love to see it when you're done!",
      timestamp: "10:36 AM",
      isSent: false,
    },
  ],
  "2": [
    {
      id: "1",
      userId: "2",
      text: "Did you see the game last night?",
      timestamp: "9:15 AM",
      isSent: false,
    },
    {
      id: "2",
      userId: "me",
      text: "Yeah! What a finish!",
      timestamp: "9:20 AM",
      isSent: true,
    },
  ],
  "3": [
    {
      id: "1",
      userId: "3",
      text: "Can we reschedule our meeting?",
      timestamp: "Yesterday",
      isSent: false,
    },
    {
      id: "2",
      userId: "me",
      text: "Sure, what time works for you?",
      timestamp: "Yesterday",
      isSent: true,
    },
  ],
  "4": [
    {
      id: "1",
      userId: "4",
      text: "Thanks for your help earlier!",
      timestamp: "11:00 AM",
      isSent: false,
    },
  ],
  "5": [
    {
      id: "1",
      userId: "5",
      text: "Let me know when you're free",
      timestamp: "2 days ago",
      isSent: false,
    },
  ],
  "6": [
    {
      id: "1",
      userId: "6",
      text: "Just sent you the files",
      timestamp: "8:45 AM",
      isSent: false,
    },
    {
      id: "2",
      userId: "me",
      text: "Got them, thanks!",
      timestamp: "8:50 AM",
      isSent: true,
    },
  ],
};

// Components
const UserListItem = ({
  user,
  isActive,
  onClick,
}: {
  user: User;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 p-4 transition-all duration-300 border-l-2 cursor-pointer ${
      isActive
        ? "bg-amber-50/50 border-l-amber-600"
        : "border-l-transparent hover:bg-slate-50"
    }`}
  >
    <div className="relative">
      <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>
          {user.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <Circle
        className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 ${
          user.status === "online"
            ? "fill-emerald-500 text-emerald-500"
            : "fill-slate-300 text-slate-300"
        } stroke-white stroke-[2px]`}
      />
    </div>
    <div className="flex-1 text-left min-w-0">
      <p className="font-semibold text-slate-900 truncate tracking-tight">
        {user.name}
      </p>
      <p className="text-xs text-slate-500 truncate">
        {user.status === "online" ? "Active now" : `Last seen ${user.lastSeen}`}
      </p>
    </div>
  </button>
);

const MessageBubble = ({ message }: { message: Message }) => (
  <div
    className={`flex ${message.isSent ? "justify-end" : "justify-start"} mb-4 animate-fadeIn`}
  >
    <div
      className={`max-w-[70%] ${message.isSent ? "items-end" : "items-start"} flex flex-col gap-1`}
    >
      <div
        className={`px-4 py-2.5 rounded-2xl ${
          message.isSent
            ? "bg-gradient-to-br from-amber-600 to-amber-700 text-white shadow-sm shadow-sm-900/20"
            : "bg-white border border-slate-200 text-slate-900 shadow-sm"
        } transition-all duration-200 hover:shadow-sm`}
      >
        <p className="text-[15px] leading-relaxed">{message.text}</p>
      </div>
      <span className="text-xs text-slate-400 px-2">{message.timestamp}</span>
    </div>
  </div>
);

// Main Component
export default function MessagingPage() {
  const [activeUserId, setActiveUserId] = useState<string>("1");
  const [messageInput, setMessageInput] = useState("");

  const activeUser = users.find((u) => u.id === activeUserId);
  const messages = messagesByUser[activeUserId] || [];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // In a real app, this would send the message
      console.log("Sending:", messageInput);
      setMessageInput("");
    }
  };

  return (
    <div className="h-screen flex  border-slate-100  via-white to-amber-50/30 px-20">
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
        <div className="p-6 border-b bg-gradient-to-r from-slate-50 to-amber-50/30">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-1">
            Messages
          </h1>
          <p className="text-sm text-slate-500">
            Connect with your clients/sellers
          </p>
        </div>

        <ScrollArea className="flex-1">
          <div className="py-2">
            {users.map((user, index) => (
              <div
                key={user.id}
                className="animate-slideIn "
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <UserListItem
                  user={user}
                  isActive={activeUserId === user.id}
                  onClick={() => setActiveUserId(user.id)}
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      </aside>

      <main className="flex-1 flex flex-col border-t border-r">
        {activeUser && (
          <>
            <header className="h-20 bg-white border-slate-200 flex items-center px-8 border-b ">
              <div className="flex items-center gap-4 ">
                <div className="relative">
                  <Avatar className="h-14 w-14 border-2 border-amber-200 shadow-sm cursor-pointer">
                    <AvatarImage
                      src={activeUser.avatar}
                      alt={activeUser.name}
                    />
                    <AvatarFallback>
                      {activeUser.name
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
                    {activeUser.name}
                  </h2>
                  <p className="text-sm text-slate-500">
                    {activeUser.status === "online" ? (
                      <span className="text-emerald-600 font-medium">
                        ● Active now
                      </span>
                    ) : (
                      `Last seen ${activeUser.lastSeen}`
                    )}
                  </p>
                </div>
              </div>
            </header>

            <div className="relative flex flex-col h-full min-h-0">
              <ScrollArea className="h-full px-8 py-6 pb-25">
                <div className="max-w-4xl mx-auto">
                  {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                  ))}
                </div>
              </ScrollArea>

              <div className="absolute bottom-0 w-full bg-white border-t border-slate-200 p-6 shadow-sm">
                <div className="max-w-4xl mx-auto flex gap-3">
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 h-12 px-4 bg-slate-50 border-slate-200 focus:border-amber-500 focus:ring-amber-500 rounded-xl text-[15px] transition-all duration-200"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="h-12 px-6 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl shadow-sm shadow-sm-900/20 transition-all duration-200 hover:shadow-sm hover:shadow-sm-900/30"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
