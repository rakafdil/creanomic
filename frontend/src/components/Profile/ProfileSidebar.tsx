"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

interface ProfileSidebarProps {
  activeItem?: string;
}

export default function ProfileSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Personal Information", href: "/profile/personal" },
    { name: "My Orders", href: "/profile/orders" },
    { name: "Manage Address", href: "/profile/address" },
    { name: "Payment Method", href: "/profile/payment" },
    { name: "Password Manager", href: "/profile/password" },
    { name: "Logout", href: "/profile/logout" },
  ];

  return (
    <aside className="flex flex-col gap-4 w-full md:w-[280px] transition-all">
      {menuItems.map((item, index) => {
        const isActive = pathname.startsWith(item.href);

        return (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              animate={{
                scale: isActive ? 1 : 0.95,
              }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href={item.href}
                className={`border border-gray-300 rounded-md py-3 px-4 md:py-5 md:px-8 text-left font-medium text-base md:text-xl transition block
    ${
      isActive
        ? "bg-[#0A3917] text-white"
        : "bg-white text-black hover:bg-green-900 hover:text-white"
    }`}
              >
                {item.name}
              </Link>
            </motion.div>
          </motion.div>
        );
      })}
    </aside>
  );
}
