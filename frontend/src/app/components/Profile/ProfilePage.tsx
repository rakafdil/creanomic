"use client";
import React, { useState } from "react";
import { Pencil } from "lucide-react";
import Link from "next/link";
import ProfileSidebar from "./ProfileSidebar";
import Image from "next/image";

export default function ProfilePage() {
    const [formData, setFormData] = useState({
        firstName: "Albert",
        lastName: "Jayendra",
        email: "albertjay@gmail.com",
        phone: "+628193166666",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Profile updated successfully!");
    };

    return (
        <div className="min-h-screen bg-white text-black flex justify-center py-20 text-lg sm:text-lg">
            <div className="flex w-full max-w-6xl gap-40">
                {/* Sidebar */}
                <div className="w-[240px]">
                    <Link
                        href="/products"
                        className="text-lg mb-4 font-semibold inline-block hover:underline">
                            <img
                            src="/Vector.svg"
                            alt="Back to Shopping"
                            className="inline-block mr-2"
                        />
                        Back to Shopping
                    </Link>
                    <ProfileSidebar activeItem="Personal Information" />
                </div>

                {/* Main Content */}
                <div className="flex flex-col items-start flex-1">
                    {/* Avatar */}
                    <div className="relative mb-8">
                        <div className="bg-[#083D57] h-40 w-40 rounded-full p-3 flex items-center justify-center">
                            <Image
                                src="/assets/default-avatar.png"
                                alt="avatar"
                                width={60}
                                height={60}
                                />
                        </div>
                        <button
                            type="button"
                            aria-label="Edit avatar"
                            title="Edit avatar"
                            className="absolute bottom-1 right-1 bg-[#0A3917] p-2 rounded-full hover:bg-green-900 transition"
                        >
                            <Pencil className="text-white w-7 h-7" />
                        </button>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-5 w-full max-w-lg sm:max-w-3xl"
                    >
                        <div className="flex flex-col sm:flex-row gap-5">
                            <div className="flex flex-col w-full sm:w-1/2">
                                <label className="text-lg mb-1 font-medium">First Name</label>
                                <input
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="First Name"
                                    className="border border-gray-300 rounded-md p-4 w-full focus:outline-none focus:ring-1 focus:ring-gray-800"
                                />
                            </div>
                            <div className="flex flex-col w-full sm:w-1/2">
                                <label className="text-lg mb-1 font-medium">Last Name</label>
                                <input
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Last Name"
                                    className="border border-gray-300 rounded-md p-4 w-full focus:outline-none focus:ring-1 focus:ring-gray-800"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-lg mb-1 font-medium">Email</label>
                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="border border-gray-300 rounded-md p-4 w-full focus:outline-none focus:ring-1 focus:ring-grey-800"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-lg mb-1 font-medium">Phone</label>
                            <input
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone"
                                className="border border-gray-300 rounded-md p-4 w-full focus:outline-none focus:ring-1 focus:ring-grey-800"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full sm:w-auto self-center sm:self-start mt-4 bg-[#0A3917] text-white py-3 px-6 rounded-lg hover:bg-green-900 transition"
                        >
                            Update Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}