import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";

export default function AuthPage({
    searchParams,
}: {
    searchParams: { mode?: string };
}) {
    const mode = searchParams.mode;

    return (
        <div>
            {mode === "signup" ? <RegisterForm /> : <LoginForm />}
        </div>
    );
}