"use client";
import { useSearchParams } from "next/navigation";
import LoginForm from "@/components/Auth/LoginForm";
import RegisterForm from "@/components/Auth/RegisterForm";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  return <div>{mode === "signup" ? <RegisterForm /> : <LoginForm />}</div>;
}
