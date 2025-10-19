import React from "react";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import ProfileSidebar from "../ProfileSidebar";
import PaymentMethods from "./PaymentMethods";

export default function paymentPage() {
    return (
        <div className="min-h-screen bg-white text-[#0A3917] flex justify-center py-12">
            <div className="flex w-full max-w-6xl gap-40">
                {/* Sidebar */}
                <div className="w-[240px]">
                    <Link
                        href="/products"
                        className="text-lg mb-4 font-semibold inline-block hover:underline"
                    >
                        <IoIosArrowBack className="inline-block mr-2" />
                        Back to Shopping
                    </Link>
                    <ProfileSidebar activeItem="My Orders" />
                </div>

                {/* Main Content */}
                <div className="flex flex-col">
                    {/* Komponen status dan summary */}
                    <PaymentMethods />
                </div>
            </div>
        </div>
    );
}