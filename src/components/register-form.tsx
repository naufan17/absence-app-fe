/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import type { AxiosResponse } from "axios"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { useRegister } from "@/hooks/use-regiser"

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(10),
  confirmPassword: z.string().min(10),
})

type FormData = z.infer<typeof formSchema>

export function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
  const [error, setError] = useState<string | null>(null)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(formSchema) })
  const navigate = useNavigate();
  const registerUser = useRegister();

  const onSubmit = async (data: FormData) => {

    registerUser.mutate({
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword
    }, {
      onSuccess: (response: AxiosResponse) => {
        setError(null);
        toast.success(response.data.message, {
          style: { 
            color: 'green' 
          },
          action: {
            label: 'Login',
            onClick: () => {
              navigate('/login');
            },
          }
        })
      },
      onError: (error: any) => {
        setError(error.response?.data.message || 'Registration failed');
      }
    }
    )
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="shadow-none">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            Create an account
          </CardTitle>
          <CardDescription>
            Register with your email and password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              {error &&
                <Alert variant="destructive" className="border-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle className="mb-0 tracking-normal">
                    {error}
                  </AlertTitle>
                </Alert>
              }
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    {...register("name")}
                    className="shadow-none"
                    required
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...register("email")}
                    className="shadow-none"
                    required
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password"
                    placeholder="••••••••"
                    {...register("password")}
                    className="shadow-none"
                    required 
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    placeholder="••••••••"
                    {...register("confirmPassword")}
                    className="shadow-none"
                    required 
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                </div>
                <Button type="submit" className="w-full cursor-pointer">
                  Register
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Login
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}