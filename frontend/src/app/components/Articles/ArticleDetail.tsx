"use client";

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Article = {
    title: string;
    image: string;
    tag?: string;
    readTime?: string;
    content: string;
};

type ArticleDetailProps = {
    article: Article;
};

export default function ArticleDetail({ article }: ArticleDetailProps) {
    return (
        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-8 lg:py-16 font-inter">
            {/* Back Button */}
            <Link
                href="/articles"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-6 lg:mb-10 transition-colors"
            >
                <ArrowLeft size={20} className="flex-shrink-0" />
                <span className="text-base lg:text-lg">Back to Article</span>
            </Link>

            {/* Header Image */}
            <div className="relative w-full h-60 sm:h-72 md:h-[420px] lg:h-[500px] mb-8 flex justify-center">
                <div className="relative w-full rounded-2xl overflow-hidden shadow-md border border-white">
                    <Image
                        src={article.image}
                        alt={article.title}
                        width={1200}
                        height={600}
                        className="w-full h-auto object-cover rounded-2xl"
                        priority
                    />
                </div>
            </div>

            {/* Tag and Read Time */}
            <div className="flex items-center gap-3 mb-4 lg:mb-6 flex-wrap">
                {article.tag && (
                    <span className="bg-[#0A3917] text-white px-3 lg:px-4 py-1 text-sm lg:text-base font-semibold rounded-full">
                        {article.tag}
                    </span>
                )}
                {article.readTime && (
                    <span className="text-gray-500 text-sm lg:text-base">
                        {article.readTime}
                    </span>
                )}
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6 leading-snug">
                {article.title}
            </h1>

            {/* Content */}
            <div className="prose prose-lg lg:prose-xl max-w-none text-justify text-gray-800 leading-relaxed whitespace-pre-line">
                {article.content}
            </div>
        </div>
    );
}
