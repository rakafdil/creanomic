"use client";
import React from "react";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import ProfileSidebar from "../ProfileSidebar";

// Komponen modular dari folder Orders
import OrderDetailsCard from "@/app/components/Profile/Orders/MyOrdersDetails";
import { Order } from "@/Types/Products";

// --- Mock Data ---
const orderData: Order = {
    orderId: "#PSNG12341",
    paymentMethod: "OVO",
    transactionId: "TRSNF1243RE",
    estimatedDelivery: "20 Oktober 2025",
    products: [
        {
            id: 1,
            name: "Sweet Banana",
            quantity: "500 gram",
            price: 15000,
            image: "/assets/products/banana.svg",
        },
        {
            id: 2,
            name: "Fresh Broccoli",
            quantity: "100 gram",
            price: 36000,
            image: "/assets/products/broccoli.svg",
        },
        {
            id: 3,
            name: "Fresh Garlic",
            quantity: "500 gram",
            price: 18000,
            image: "/assets/products/onion.svg",
        },
        {
            id: 4,
            name: "Green Cabbage",
            quantity: "500 gram",
            price: 30000,
            image: "/assets/products/cabbage.svg",
        },
    ],
    shipping: 3000,
    taxes: 3000,
    total: 105000,
};

export default function MyOrdersPage() {
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
                    <OrderDetailsCard order={orderData} />
                </div>
            </div>
        </div>
    );
}