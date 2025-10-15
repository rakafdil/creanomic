"use client";
import { Eye, EyeOff } from "lucide-react";
import { useState, type MouseEvent } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Form state - hanya 3 input: fullName, email, password, confirmPassword
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user types
    if (error) setError("");
  };

  // Function to generate username from email
  const generateUsername = (email: string): string => {
    // Ambil bagian sebelum @ dan bersihkan karakter khusus
    const username = email
      .split("@")[0]
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");

    // Tambahkan random number untuk uniqueness
    const randomNum = Math.floor(Math.random() * 1000);
    return `${username}${randomNum}`;
  };

  // Function to split full name into first and last name
  const splitFullName = (
    fullName: string
  ): { firstName: string; lastName: string } => {
    const nameParts = fullName.trim().split(/\s+/);

    if (nameParts.length === 1) {
      return {
        firstName: nameParts[0],
        lastName: nameParts[0], // Jika hanya satu kata, gunakan untuk keduanya
      };
    }

    // First name adalah kata pertama, last name adalah gabungan sisanya
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");

    return { firstName, lastName };
  };

  const validateForm = () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setError("");
    setIsLoading(true);

    try {
      // Split full name dan generate username
      const { firstName, lastName } = splitFullName(formData.fullName);
      const username = generateUsername(formData.email);

      // Prepare data sesuai format backend
      const requestData = {
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        username: username,
        firstName: firstName,
        lastName: lastName,
      };

      const response = await fetch(
        "https://api-growthwell.vercel.app/api/v1/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(requestData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Show success message
      setSuccessMessage(
        "Registration successful! Please check your email to verify your account."
      );

      // Optional: Save token if remember me is checked
      if (rememberMe && data.data.token) {
        localStorage.setItem("authToken", data.data.token);
      }

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/auth?mode=login");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      window.location.href =
        "https://api-growthwell.vercel.app/api/v1/auth/google-signin";
    } catch (err: any) {
      setError(err.message || "Failed to initiate Google sign-in");
    }
  };

  return (
    <section className="relative w-full h-screen flex items-center overflow-hidden font-sans">
      {/* LEFT SIDE - Branding with Background Image */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative bg-cover bg-center min-h-screen">
        <img
          src="/assets/auth1.png"
          alt="GrowthWell background"
          className="absolute inset-0 w-full h-full object-cover"
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

      {/* RIGHT SIDE - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-12 py-12 bg-white scale-90">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Create a New Account
            </h2>
            <p className="text-[#595959] text-base">
              Get full access to our selection of fresh products.
            </p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-2xl">
              <p className="text-green-600 text-sm">{successMessage}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-2xl">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full name"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              disabled={isLoading}
              className="w-full border-2 border-gray-300 rounded-2xl px-6 py-4 text-base focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              disabled={isLoading}
              className="w-full border-2 border-gray-300 rounded-2xl px-6 py-4 text-base focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                disabled={isLoading}
                className="w-full border-2 border-gray-300 rounded-2xl px-6 py-4 pr-14 text-base focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                disabled={isLoading}
                className="w-full border-2 border-gray-300 rounded-2xl px-6 py-4 pr-14 text-base focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
              >
                {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-[#0A3917] hover:bg-[#145016] text-white font-semibold py-4 rounded-2xl transition-colors text-lg mt-6 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  Creating Account...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center justify-center mt-5">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
                className="w-5 h-5 rounded border-2 border-gray-300 text-[#1B5E20] focus:ring-0 focus:ring-offset-0 cursor-pointer disabled:cursor-not-allowed mt-0.5"
              />
              <span className="ml-2 text-gray-700 text-sm">
                I agree to the{" "}
                <a
                  href="#"
                  className="text-[#0A3917] hover:underline font-medium"
                >
                  Terms & Conditions
                </a>
              </span>
            </label>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 font-medium">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Continue with Google */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full border-2 border-gray-300 rounded-2xl py-4 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-gray-700 font-semibold">
              Continue with Google
            </span>
          </button>

          {/* Login Link */}
          <div className="text-center mt-8">
            <span className="text-black font-bold">
              Already have an account?{" "}
            </span>
            <a
              href="/auth?mode=login"
              className="text-[#0A3917] font-bold hover:underline"
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
