"use client"
import { useState } from "react";
import type { FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Button from '../Common/Button'

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted");
    };

    return (
        <section className="relative w-full min-h-[1080px] flex items-center overflow-hidden text-white font-inter">

            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/assets/auth1.svg"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/30" /> {/* overlay */}
            </div>

            {/* LEFT SIDE - Branding */}
            <div className="hidden md:flex w-1/2 items-center justify-center relative z-10">
                <div className="text-center px-8">
                    <Image
                        src="/assets/logo.svg"
                        alt="GrowthWell logo"
                        width={448}
                        height={448}
                        priority
                    />
                    <p className="text-4xl font-semiboldmt-2">Belanja Sehat, Berbagi Kebaikan</p>
                </div>
            </div>

            {/* RIGHT SIDE - Register Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center relative z-10 px-8 py-16 mb-8 mt-30">
                <div className="origin-center w-full max-w-lg bg-white p-12 rounded-3xl shadow-2xl text-black">
                    <div className="text-center mb-10">
                        <span className='flex items-center gap-2 justify-center mb-6'>
                            <Image
                                src="/assets/logo_icon.svg"
                                alt="GrowthWell logo"
                                width={40}
                                height={40}
                                priority
                            />
                            <span className="text-[#74AB35] text-2xl font-semibold">GrowthWell</span>
                        </span>
                        <h2 className="text-5xl font-bold mt-2 leading-tight">Welcome<br />Back</h2>
                    </div>

                    {/* Form */}
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email address"
                            className="w-full border border-gray-300 rounded-3xl px-6 py-4 text-base focus:outline-none focus:border-[#74AB35] transition-colors placeholder:text-gray-400"
                        />

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full border border-gray-300 rounded-3xl px-6 py-4 pr-14 text-base focus:outline-none focus:border-[#74AB35] transition-colors placeholder:text-gray-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#77AB34] hover:bg-[#5e8826] text-white font-semibold py-4 rounded-3xl transition-colors text-2xl mt-6"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="text-center text-black text-base my-6 font-medium">or sign in with</div>

                    <div className="flex justify-center gap-5 mt-6">
                        {/* Facebook */}
                        <button
                            type="button"
                            title="Continue with Facebook"
                            aria-label="Continue with Facebook"
                            className="w-16 h-16 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-center"
                        >
                            <Image
                                src="/assets/facebook.svg"
                                alt="Facebook logo"
                                width={39}
                                height={39}
                                priority
                            />
                        </button>

                        {/* Google */}
                        <button
                            type="button"
                            title="Continue with Google"
                            aria-label="Continue with Google"
                            className="w-16 h-16 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-center"
                        >
                            <Image
                                src="/assets/google.svg"
                                alt="Google logo"
                                width={33}
                                height={33}
                                priority
                            />
                        </button>

                        {/* Twitter (atau X) */}
                        <button
                            type="button"
                            title="Continue with Twitter"
                            aria-label="Continue with Twitter"
                            className="w-16 h-16 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-center"
                        >
                            <Image
                                src="/assets/twitter.svg"
                                alt="Twitter logo"
                                width={38}
                                height={38}
                                priority
                            />
                        </button>
                    </div>

                    <div className="text-center mt-8 text-base font-semibold">
                        <span className="text-black">Dont have an account ?</span>
                        <a href="/auth?mode=register" className="text-[#77AB34] font-semibold hover:underline ml-1">Register</a>
                    </div>
                </div>
            </div>
        </section>
    )
}