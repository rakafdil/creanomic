"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import LoginForm from "@/components/Auth/LoginForm";
import RegisterForm from "@/components/Auth/RegisterForm";

function AuthContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  return <div>{mode === "signup" ? <RegisterForm /> : <LoginForm />}</div>;
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthContent />
    </Suspense>
  );
}
