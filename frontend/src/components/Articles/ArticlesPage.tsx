"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { articles } from "@/app/data/articles";

export default function ArticlesPage() {
    const featuredArticle = articles[1];
    
    const recentArticles = articles
        .filter(article => article.id !== featuredArticle.id)
        .slice(0, 3);

    return (
        <div className="px-6 md:px-20 lg:px-32 xl:px-44 py-14 font-inter bg-white text-gray-800">
            {/* Back to Shopping */}
            <div className="flex items-center gap-2 text-green-700 font-medium mb-10">
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                <Link href="/products" className="hover:underline text-sm md:text-base">
                    Back to Shopping
                </Link>
            </div>

            {/* Featured Article */}
            <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
                <div className="relative w-full h-[280px] md:h-[340px] rounded-xl overflow-hidden shadow-md">
                    <Image
                        src={featuredArticle.image}
                        alt={featuredArticle.title}
                        fill
                        priority
                        className="object-cover object-center" // tetap sama, tidak zoom
                    />
                </div>
                <div>
                    <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-1.5 w-fit">
                        <span className="bg-[#0A3917] text-white px-4 py-1 text-sm md:text-base font-semibold rounded-full">
                            {featuredArticle.tag}
                        </span>
                        <span className="text-gray-700 text-sm md:text-base font-medium">{featuredArticle.readTime}</span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-semibold mb-4 mt-5 leading-snug">
                        {featuredArticle.title}
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg mb-6">
                        {featuredArticle.desc}
                    </p>
                    <Link
                        href={`/articles/${featuredArticle.id}`}
                        className="flex items-center gap-2 text-green-700 font-medium hover:underline text-base md:text-lg"
                    >
                        Read More <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                    </Link>
                </div>
            </div>

            {/* Recent Articles */}
            <div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-2">Our Recent Articles</h3>
                <p className="text-gray-500 mb-8 text-sm md:text-base">Stay Informed with Our Latest Insight</p>

                <div className="grid md:grid-cols-3 gap-8">
                    {recentArticles.map((article) => (
                        <div
                            key={article.id}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                        >
                            <div className="relative w-full h-[180px] md:h-[180px] rounded-t-xl">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover object-center" // tidak berubah rasio
                                />
                            </div>
                            <div className="p-5 md:p-6">
                                <p className="text-sm md:text-base text-gray-500 mb-1">
                                    {article.author} • {article.date}
                                </p>
                                <h4 className="font-semibold text-lg md:text-xl mb-2 line-clamp-2">
                                    {article.title}
                                </h4>
                                <p className="text-gray-600 text-sm md:text-base mb-3 line-clamp-2">
                                    {article.desc}
                                </p>
                                <Link
                                    href={`/articles/${article.id}`}
                                    className="flex items-center gap-2 text-green-700 font-medium text-sm md:text-base hover:underline"
                                >
                                    Read More <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
