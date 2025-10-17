import React from "react";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import ProfileSidebar from "../ProfileSidebar";

export default function AddressSection() {
    return (
        <div className="min-h-screen bg-white text-black flex justify-center py-12">
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
                <div className="flex flex-col flex-1">
                    <AddressCard
                        name="Brawnih"
                        address="2426 Royal Ln. Mesa, New Jersey 45872"
                        />
                    <AddressForm />
                </div>
            </div>
        </div>
    );
}