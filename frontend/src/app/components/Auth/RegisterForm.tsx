"use client"
import { Eye, EyeOff } from "lucide-react";
import { useState, type MouseEvent } from "react";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("Form submitted", { email, password, rememberMe });
    };

    return (
        <section className="relative w-full h-screen flex items-center overflow-hidden font-sans">
            {/* LEFT SIDE - Branding with Background Image */}
            <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative bg-cover bg-center h-screen">
                <img
                    src="/assets/auth1.png"
                    alt="GrowthWell background"
                    className="absolute inset-0 w-full h-200 object-cover"
                    loading="eager"
                    decoding="async"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative z-10 text-center px-8 text-white">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <img
                            src="/assets/logo.svg"
                            alt="GrowthWell logo"
                            className="w-100 h-auto"
                            loading="eager"
                            decoding="async"
                        />
                    </div>
                    <p className="text-3xl font-medium mt-6">
                        Belanja Sehat, Berbagi Kebaikan
                    </p>
                </div>
            </div>

            {/* RIGHT SIDE - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-12 py-12 bg-white">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-2">Create a New Account</h2>
                        <p className="text-[#595959] text-base">Get full access to our selection of fresh products.</p>
                    </div>

                    {/* Form */}
                    <div className="space-y-5">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border-2 border-gray-300 rounded-2xl px-6 py-4 text-base focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
                        />
                        <input
                            type="text"
                            placeholder="Your username or email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border-2 border-gray-300 rounded-2xl px-6 py-4 text-base focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
                        />

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Your Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border-2 border-gray-300 rounded-2xl px-6 py-4 pr-14 text-base focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                            </button>
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full bg-[#0A3917] hover:bg-[#145016] text-white font-semibold py-4 rounded-2xl transition-colors text-lg mt-6"
                        >
                            Login
                        </button>
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between mt-5">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-5 h-5 rounded border-2 border-gray-300 text-[#1B5E20] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                            />
                            <span className="ml-2 text-gray-700 font-medium">Remember me</span>
                        </label>
                        <a href="#" className="text-[#2377E7] hover:underline font-medium">
                            Forgot your password?
                        </a>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-8">
                        <div className="flex-1 h-px bg-gray-300"></div>
                        <span className="text-gray-500 font-medium">or</span>
                        <div className="flex-1 h-px bg-gray-300"></div>
                    </div>

                    {/* Continue with Google */}
                    <button
                        type="button"
                        className="w-full border-2 border-gray-300 rounded-2xl py-4 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        <span className="text-gray-700 font-semibold">Continue with Google</span>
                    </button>

                    {/* Sign Up Link */}
                    <div className="text-center mt-10">
                        <span className="text-black font-bold">Don't have an account? </span>
                        <a href="/auth?mode=login" className="text-[#0A3917] font-bold hover:underline">Sign up</a>
                    </div>
                </div>
            </div>
        </section>
    );
}