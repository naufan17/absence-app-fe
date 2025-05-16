import AuthLayout from "@/components/layout/auth";
import { RegisterForm } from "@/components/register-form";

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  )
}