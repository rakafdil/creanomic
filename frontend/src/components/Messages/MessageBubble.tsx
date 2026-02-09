import { Message } from "@/app/messages/page";
import React from "react";

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

export default MessageBubble;
