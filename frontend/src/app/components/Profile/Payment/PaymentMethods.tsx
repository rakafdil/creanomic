"use client";

import { useState } from "react";
import Image from "next/image";

const paymentData = [
    {
        id: "paypal",
        name: "Paypal",
        logo: "/assets/Paypal.svg",
        linked: false,
    },
    {
        id: "ovo",
        name: "OVO",
        logo: "/assets/ovo.svg",
        linked: true,
    },
    {
        id: "gopay",
        name: "gopay",
        logo: "/assets/gopay.svg",
        linked: false,
    },
];

export default function PaymentMethods() {
    const [methods, setMethods] = useState(paymentData);

    const toggleLink = (id: string) => {
        setMethods((prev) =>
            prev.map((m) => (m.id === id ? { ...m, linked: !m.linked } : m))
        );
    };

    return (
        <div className="w-full mx-auto mt-4 sm:mt-6 lg:mt-10 space-y-3 sm:space-y-4">
            {methods.map((method) => (
                <div
                    key={method.id}
                    className="flex items-center justify-between border border-gray-300 rounded-lg px-4 py-3 sm:px-5 sm:py-4 lg:px-6 lg:py-0 bg-white shadow-sm w-full lg:min-w-[650px]"
                >
                    <div className="flex items-center gap-2 sm:gap-3 flex-1">
                        <Image
                            src={method.logo}
                            alt={`${method.name} logo`}
                            width={90}
                            height={90}
                            className="object-contain w-16 h-16 sm:w-20 sm:h-20 lg:w-[90px] lg:h-[90px]"
                        />
                    </div>

                    <button
                        onClick={() => toggleLink(method.id)}
                        className={`text-sm sm:text-base lg:text-lg font-semibold transition-colors whitespace-nowrap ml-2 sm:ml-3 lg:ml-4 ${
                            method.linked
                                ? "text-[#FF5757] hover:text-red-600"
                                : "text-[#3F9241] hover:text-green-700"
                        }`}
                    >
                        {method.linked ? "Delete" : "Link Account"}
                    </button>
                </div>
            ))}
        </div>
    );
}