"use client";
import { useRouter } from "next/navigation";

export default function LogoutConfirmation() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("https://api-growthwell.vercel.app/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout failed", err);
    }
    router.push("/auth?mode=login");
  };

  return (
    <div className="max-w-sm mt-8 md:mt-16 bg-white rounded-lg px-4 md:px-0">
      <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
        Logout
      </h2>
      <p className="text-sm md:text-base text-gray-600 mb-5">
        Are you sure you want to log out?
      </p>

      <button
        onClick={handleLogout}
        className="w-full md:w-auto bg-red-500 hover:bg-red-600 text-white font-medium px-5 py-2 rounded-full transition-colors duration-200"
      >
        Yes, Logout
      </button>
    </div>
  );
}
