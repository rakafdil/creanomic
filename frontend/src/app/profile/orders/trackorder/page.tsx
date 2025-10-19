import React from "react";
import Link from "next/link";
import { Order } from "@/Types/Products";
import OrderProgress from "@/app/components/Orders/OrderProgress";
import OrderSummaryBar from "@/app/components/Orders/OrderSummaryBar";
import OrderDetailsCard from "@/app/components/Orders/OrderDetailsCard";
import { IoIosArrowBack } from "react-icons/io";

// --- Mock Data ---
// Biasanya data ini akan datang dari API
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

const TrackOrder = () => {
    return (
        <>
            <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-32">
                <nav className="my-3 md:my-4 text-[#0A3917]">
                    <Link
                        href="/profile"
                        className="text-base md:text-xl hover:text-black flex gap-1 items-center"
                    >
                        <IoIosArrowBack className="w-5 h-5 md:w-6 md:h-6" /> 
                        <span>Back to Profile</span>
                    </Link>
                </nav>

                <main>
                    <div className="mb-12 md:mb-25">
                        <OrderProgress />
                    </div>
                    <OrderSummaryBar
                        orderId={orderData.orderId}
                        paymentMethod={orderData.paymentMethod}
                        transactionId={orderData.transactionId}
                        estimatedDelivery={orderData.estimatedDelivery}
                    />
                    <OrderDetailsCard order={orderData} />
                </main>
            </div>
        </>
    );
};

export default TrackOrder;