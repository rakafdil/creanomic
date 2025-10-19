import React from "react";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import ProfileSidebar from "../ProfileSidebar";
import PasswordForm from "./PasswordForm";

export default function PasswordPage() {
    return (
        <div className="min-h-screen bg-white text-[#0A3917] flex justify-center py-8 md:py-12 px-4 md:px-0">
            <div className="flex flex-col md:flex-row w-full max-w-6xl gap-8 md:gap-40">
                {/* Sidebar */}
                <div className="w-full md:w-[240px]">
                    <Link
                        href="/products"
                        className="text-base md:text-lg mb-4 font-semibold inline-block hover:underline"
                    >
                        <IoIosArrowBack className="inline-block mr-2" />
                        Back to Shopping
                    </Link>
                    <ProfileSidebar activeItem="My Orders" />
                </div>

                {/* Main Content */}
                <div className="flex flex-col flex-1">
                    {/* Komponen status dan summary */}
                    <PasswordForm />
                </div>
            </div>
        </div>
    );
}