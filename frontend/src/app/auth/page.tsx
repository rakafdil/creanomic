import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";

export default async function AuthPage({ searchParams }: { searchParams: Promise<{ mode?: string }> }) {
    const params = await searchParams;
    
    return (
        <div>
            {params.mode === "signup" ? <RegisterForm /> : <LoginForm />}
        </div>
    );
}