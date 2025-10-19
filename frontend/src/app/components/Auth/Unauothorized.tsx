"use client";

import Link from "next/link";
import React from "react";

export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-3xl w-full bg-indigo-500 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-sky-500 via-indigo-500 to-violet-600 flex items-center justify-center shadow-lg ring-1 ring-white/10">
              {/* lock icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className="w-20 h-20 stroke-white/95"
              >
                <rect
                  x="3"
                  y="10"
                  width="18"
                  height="11"
                  rx="2"
                  strokeWidth="1.2"
                  stroke="currentColor"
                  fillOpacity="0.06"
                />
                <path
                  d="M7 10V7a5 5 0 0110 0v3"
                  strokeWidth="1.6"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="15" r="1.6" fill="white" />
              </svg>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-semibold text-white">
              Unauthorized
            </h1>
            <p className="mt-3 text-slate-200 max-w-xl">
              Kamu nggak punya akses ke halaman ini. Mungkin kamu belum login
              atau permission belum cocok.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-medium transition"
              >
                Back to Home
              </Link>

              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center rounded-full px-5 py-3 bg-sky-500/95 hover:bg-sky-600 text-white text-sm font-medium transition shadow"
              >
                Sign in
              </Link>
            </div>

            <div className="mt-6 text-xs text-slate-300/80">
              <p>
                Tips: kalau kamu admin, cek token di{" "}
                <code className="bg-white/5 px-1 rounded">localStorage</code>{" "}
                atau hub admin untuk update permission.
              </p>
            </div>
          </div>
        </div>

        <footer className="mt-8 pt-6 border-t border-white/6 text-center text-xs text-slate-400">
          <span>
            Need help?{" "}
            <Link href="/support" className="underline">
              Contact support
            </Link>
          </span>
        </footer>
      </div>
    </main>
  );
}
