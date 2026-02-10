import React from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MessageBubbleProps {
  message: {
    id: string;
    userId: string;
    text: string;
    timestamp: string;
    isSent: boolean;
  };
  onDelete?: () => void;
}

const MessageBubble = ({ message, onDelete }: MessageBubbleProps) => (
  <div
    className={`flex ${message.isSent ? "justify-end" : "justify-start"} mb-4 animate-fadeIn group`}
  >
    <div
      className={`max-w-[70%] ${message.isSent ? "items-end" : "items-start"} flex flex-col gap-1`}
    >
      <div className="relative">
        <div
          className={`px-4 py-2.5 rounded-2xl ${
            message.isSent
              ? "bg-gradient-to-br from-amber-600 to-amber-700 text-white shadow-sm shadow-sm-900/20"
              : "bg-white border border-slate-200 text-slate-900 shadow-sm"
          } transition-all duration-200 hover:shadow-sm`}
        >
          <p className="text-[15px] leading-relaxed">{message.text}</p>
        </div>

        {onDelete && message.isSent && (
          <Button
            onClick={onDelete}
            variant="ghost"
            size="icon"
            className="absolute -right-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50"
            title="Delete message"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      <span className="text-xs text-slate-400 px-2">{message.timestamp}</span>
    </div>
  </div>
);

export default MessageBubble;
