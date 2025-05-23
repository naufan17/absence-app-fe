/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import type { AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdatePassword } from "@/hooks/use-update-password";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  password: z.string().min(10),
  confirmPassword: z.string().min(10),
})

type FormData = z.infer<typeof formSchema>

export default function UpdatePasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(formSchema) });
  const updatePassword = useUpdatePassword();

  const onSubmit = async (data: FormData) => {
    updatePassword.mutate({
      password: data.password,
      confirmPassword: data.confirmPassword
    }, {
      onSuccess: (response: AxiosResponse) => {
        setError(null);
        toast.success(response.data.message, {
          style: { 
            color: 'green' 
          },
        })
      },
      onError: (error: any) => {
        setError(error.response?.data.message);
      }
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-lg md:text-xl font-bold">Password</h1>
      <h5 className="text-md">Change your password</h5>
      <Separator className="my-4" />
      {error && 
        <Alert variant="destructive" className="mb-4 border-red-500">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="mb-0 tracking-normal">
            {error}
          </AlertTitle>
        </Alert>
      }
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              {...register("password")}
              className="shadow-none"
            />
            {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input 
              id="confirmPassword" 
              type="password" 
              {...register("confirmPassword")}
              className="shadow-none"
            />
            {errors.confirmPassword && <span className="text-sm text-red-500">{errors.confirmPassword.message}</span>}
          </div>
          <Button 
            type="submit" 
            className="shadow-none"
            onChange={() => setError(null)}
          >
            Update Password
          </Button>
        </div>
      </form>
    </div>
  );
}