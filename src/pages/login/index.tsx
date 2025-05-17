import GuestGuard from "@/components/guard/guest";
import AuthLayout from "@/components/layout/auth";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <GuestGuard>
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </GuestGuard>
  )
}