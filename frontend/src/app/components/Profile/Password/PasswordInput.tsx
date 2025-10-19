"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
    label: string;
    placeholder?: string;
    showForgot?: boolean;
}

export default function PasswordInput({
    label,
    placeholder = "Enter Password",
    showForgot = false,
}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex flex-col space-y-3 md:space-y-5 relative">
            <label className="text-base md:text-lg font-semibold text-black">{label}</label>

            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    className="w-full border border-gray-300 rounded-md p-4 md:p-5 pr-12 md:pr-10 text-base md:text-lx focus:outline-none focus:ring-2 focus:ring-[#6a6a6a] transition"
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 md:right-5 top-4 md:top-5 text-gray-500 hover:text-gray-700"
                >
                    {showPassword ? (
                        <EyeOff size={22} className="md:w-[25px] md:h-[25px]" strokeWidth={1.8} />
                    ) : (
                        <Eye size={22} className="md:w-[25px] md:h-[25px]" strokeWidth={1.8} />
                    )}
                </button>
            </div>

            {showForgot && (
                <a
                    href="#"
                    className="text-sm text-[#0A3917] font-medium hover:underline mt-1 self-end"
                >
                    Forgot Password ?
                </a>
            )}
        </div>
    );
}