"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ProfileSidebarProps {
    activeItem?: string;
}

export default function ProfileSidebar({ activeItem }: ProfileSidebarProps) {
    const pathname = usePathname(); // deteksi halaman aktif

    const menuItems = [
        { name: "Personal Information", href: "/profile" },
        { name: "My Orders", href: "/profile/orders" },
        { name: "Manage Address", href: "/profile/address" },
        { name: "Payment Method", href: "/profile/payment" },
        { name: "Password Manager", href: "/profile/password" },
        { name: "Logout", href: "/profile/logout" },
    ];

    return (
        <aside className="flex flex-col gap-4 w-full md:w-[280px]">
            {menuItems.map((item, index) => {
                const isActive = pathname === item.href;

                return (
                    <Link
                        key={index}
                        href={item.href}
                        className={`border border-gray-300 rounded-md py-3 px-4 md:py-5 md:px-8 text-left font-medium text-base md:text-xl transition
                            ${isActive
                                ? "bg-[#0A3917] text-white"
                                : "bg-white text-black hover:bg-green-900 hover:text-white"
                            }`}
                    >
                        {item.name}
                    </Link>
                );
            })}
        </aside>
    );
}