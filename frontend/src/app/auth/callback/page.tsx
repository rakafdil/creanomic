"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Common/Loading";

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

    fetch(
      process.env.NODE_ENV === "production"
        ? "https://api-growthwell.vercel.app/api/v1/auth/oauth/session"
        : "http://localhost:5050/api/v1/auth/oauth/session",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken,
          refreshToken,
        }),
      },
    )
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

  return <Loading text={"Processing login..."} />;
}
