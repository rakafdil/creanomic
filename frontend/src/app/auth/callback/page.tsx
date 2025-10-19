"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // 1. Ambil token dari URL hash
    if (window.location.hash) {
      const params = new URLSearchParams(window.location.hash.slice(1));
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");

      // 2. Simpan token ke localStorage/sessionStorage
      if (accessToken) {
        localStorage.setItem("authToken", accessToken);
      }
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }

      // 3. Hapus token dari URL (agar aman)
      window.history.replaceState(null, "", window.location.pathname);

      // 4. Redirect ke halaman utama/products
      router.push("/products");
    } else {
      // Jika tidak ada token, redirect ke login
      router.push("/auth?mode=login");
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <svg
          className="animate-spin h-10 w-10 text-green-700 mx-auto mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span className="text-gray-600">Processing login...</span>
      </div>
    </div>
  );
}
