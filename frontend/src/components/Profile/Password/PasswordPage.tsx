import React from "react";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import ProfileSidebar from "../ProfileSidebar";
import PasswordForm from "./PasswordForm";

export default function PasswordPage() {
  return (
    <div className="min-h-screen bg-white text-[#0A3917] justify-center py-8 md:py-12 px-4 md:px-0 w-full">
      <div className="flex flex-col gap-8">
        <PasswordForm />
      </div>
    </div>
  );
}
