import React from "react";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import ProfileSidebar from "../ProfileSidebar";
import PaymentMethods from "./PaymentMethods";

export default function paymentPage() {
    return (
        <div className="min-h-screen bg-white text-[#0A3917] flex justify-center py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-6 sm:gap-8 lg:gap-40">
                {/* Sidebar */}
                <div className="w-full lg:w-[240px]">
                    <Link
                        href="/products"
                        className="text-base sm:text-lg mb-3 sm:mb-4 font-semibold inline-block hover:underline"
                    >
                        <IoIosArrowBack className="inline-block mr-2" />
                        Back to Shopping
                    </Link>
                    <div className="hidden lg:block">
                        <ProfileSidebar activeItem="My Orders" />
                    </div>
                    {/* Mobile Sidebar - Optional: bisa ditampilkan sebagai dropdown atau tabs */}
                    <div className="lg:hidden mt-4">
                        <ProfileSidebar activeItem="My Orders" />
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col flex-1">
                    <PaymentMethods />
                </div>
            </div>
        </div>
    );
}