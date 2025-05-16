import AuthLayout from "@/components/layout/auth";
import { LoginForm } from "@/components/login-form";

export function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}