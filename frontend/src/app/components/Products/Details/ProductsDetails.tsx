"use client";
import Image from "next/image";
import React, { useState } from "react";

const ProductsDetail = () => {
    const [selectedWeight, setSelectedWeight] = useState("500 g");
    const [quantity, setQuantity] = useState(1);
    const weights = ["500 g", "1 Kg", "2 Kg", "5 Kg"];

    return (
        <section className="w-full max-w-6xl mx-auto py-12 px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 font-sans">
            {/* LEFT SIDE — Image Gallery */}
            <div>
                {/* Main Image */}
                <div className="w-full aspect-square rounded-2xl border border-gray-200 overflow-hidden flex items-center justify-center">
                    <Image
                        src="/assets/banana-main.png"
                        alt="Sweet Banana"
                        width={500}
                        height={500}
                        className="object-contain w-full h-full"
                        priority
                    />
                </div>

                {/* Thumbnails */}
                <div className="flex gap-4 mt-4">
                    {["banana-1.png", "banana-2.png", "banana-3.png"].map((img, i) => (
                        <div
                            key={i}
                            className="w-24 h-24 rounded-xl border border-gray-200 overflow-hidden hover:border-green-700 transition-all cursor-pointer"
                        >
                            <Image
                                src={`/assets/${img}`}
                                alt={`Banana ${i + 1}`}
                                width={100}
                                height={100}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT SIDE — Product Info */}
            <div className="flex flex-col justify-start">
                {/* Category & Status */}
                <p className="text-[#0A3917] font-medium text-2xl mb-5">Fruits</p>
                <h1 className="text-4xl font-bold text-gray-900 mb-5">
                    Sweet Banana
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#FFD700"
                            viewBox="0 0 24 24"
                            width="30"
                            height="30"
                        >
                            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.781 1.402 8.176L12 18.896l-7.336 3.857 1.402-8.176L.132 9.21l8.2-1.192z" />
                        </svg>
                    ))}
                    <span className="text-gray-700 font-medium text-xl">5.0</span>
                    <span className="text-gray-400 text-lg">(255 Review)</span>
                </div>

                {/* Price */}
                <p className="text-3xl font-bold text-gray-900 mb-3">
                    Rp 15.000
                </p>

                {/* Description */}
                <p className="text-[#595959] leading-relaxed mb-15">
                    Pisang Cavendish premium dengan rasa manis pas dan tekstur lembut.
                    Pilihan tepat untuk camilan sehat dan penambah energi instan.
                </p>

                {/* Weight Options */}
                <div className="mb-6">
                    <p className="font-semibold text-gray-800 mb-2">Weight</p>
                    <div className="flex gap-3 flex-wrap">
                        {weights.map((w) => (
                            <button
                                key={w}
                                onClick={() => setSelectedWeight(w)}
                                className={`px-5 py-2 rounded-full border text-sm font-medium transition-all ${selectedWeight === w
                                        ? "bg-[#0A3917] text-white border-green-700"
                                        : "border-gray-300 text-gray-700 hover:border-green-700"
                                    }`}
                            >
                                {w}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Quantity & Buttons */}
                <div className="flex items-center gap-4 mb-8 flex-wrap">
                    <div className="flex items-center border border-gray-300 rounded-full">
                        <button
                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            className="px-3 py-2 text-gray-600 text-xl font-bold hover:text-green-700"
                        >
                            −
                        </button>
                        <span className="px-4 py-2 text-lg font-medium">{quantity}</span>
                        <button
                            onClick={() => setQuantity((q) => q + 1)}
                            className="px-3 py-2 text-gray-600 text-xl font-bold hover:text-green-700"
                        >
                            +
                        </button>
                    </div>

                    <button className="bg-[#0A3917] hover:bg-green-900 text-white font-semibold py-3 px-8 rounded-full transition-all">
                        Add To Cart
                    </button>
                    <button className="bg-[#D0F348] hover:bg-[#B3E03B] text-black font-semibold py-3 px-8 rounded-full transition-all">
                        Buy Now
                    </button>
                </div>

                {/* Product Info */}
                <div className="text-lx text-gray-600 space-y-2">
                    <p>
                        <span className="font-semibold text-gray-800">SKU:</span>{" "}
                        BNFR93748PQR
                    </p>
                    <p>
                        <span className="font-semibold text-gray-800">Tags:</span>{" "}
                        Pisang, Kuning, Manis, Buah
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ProductsDetail;
