import React from "react";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import ProfileSidebar from "../ProfileSidebar";
import Logout from "./LogoutConfirmation";

export default function LogoutPage() {
  return (
    <div className="min-h-screen bg-white text-[#0A3917] flex justify-center py-8 md:py-12 px-4 md:px-0">
      <div className="flex flex-col flex-1">
        <Logout />
      </div>
    </div>
  );
}
