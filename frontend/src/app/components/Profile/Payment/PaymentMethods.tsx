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
        <div className="max-w-md mx-auto mt-10 space-y-4">
            {methods.map((method) => (
                <div
                    key={method.id}
                    className="flex items-center justify-between border border-gray-300 rounded-lg px-6 py-5 bg-white shadow-sm min-w-[650px]"
                >
                    <div className="flex items-center gap-3 flex-1">
                        <Image
                            src={method.logo}
                            alt={`${method.name} logo`}
                            width={90}
                            height={90}
                            className="object-contain"
                        />
                    </div>

                    <button
                        onClick={() => toggleLink(method.id)}
                        className={`text-lg font-semibold transition-colors whitespace-nowrap ml-4 ${
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