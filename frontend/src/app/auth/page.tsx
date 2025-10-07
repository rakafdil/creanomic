// app/auth/page.tsx
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";

export default function AuthPage({ searchParams }: { searchParams: { mode?: string } }) {
    return (
        <div>
            {searchParams.mode === "register" ? <RegisterForm /> : <LoginForm />}
        </div>
    );
}