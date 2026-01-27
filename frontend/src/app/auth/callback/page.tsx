"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const params = new URLSearchParams(hash);

    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    const error = params.get("error");
    const errorDescription = params.get("error_description");

    console.log("Access token:", accessToken);
    console.log("Refresh token:", refreshToken);
    console.log("Error:", error);

    if (error) {
      console.error("OAuth error:", error, errorDescription);
      router.push("/auth?mode=login");
      return;
    }

    if (!accessToken) {
      console.error("No access token found");
      router.push("/auth?mode=login");
      return;
    }

    fetch("http://localhost:5050/api/v1/auth/oauth/session", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken,
        refreshToken,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create session");
        }
        return response.json();
      })
      .then(() => {
        window.history.replaceState(null, "", window.location.pathname);
        router.push("/products");
      })
      .catch((error) => {
        console.error("Session creation failed:", error);
        router.push("/auth?mode=login");
      });
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
