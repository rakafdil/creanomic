"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import LoginForm from "@/components/Auth/LoginForm";
import RegisterForm from "@/components/Auth/RegisterForm";
import Loading from "@/components/Common/Loading";

function AuthContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  return <div>{mode === "signup" ? <RegisterForm /> : <LoginForm />}</div>;
}

export default function AuthPage() {
  return (
    <Suspense fallback={<Loading text={"Processing Authentication..."} />}>
      <AuthContent />
    </Suspense>
  );
}
