import { User } from "@/app/messages/page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Circle } from "lucide-react";

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
        <AvatarImage src={user.profile_picture} alt={user.username} />
        <AvatarFallback>
          {user.username
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
        {user.username}
      </p>
      <p className="text-xs text-slate-500 truncate">
        {user.status === "online" ? "Active now" : `Last seen `}
      </p>
    </div>
  </button>
);

export default UserListItem;
