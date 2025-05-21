/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import type { AxiosResponse } from "axios";
import axiosInstance from "@/lib/axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
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
  const [loading, setLoading] = useState<boolean>(false)
  const [error] = useState<string | null>(null)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      const reponse: AxiosResponse = await axiosInstance.post('/account/update-password', {
        password: data.password,
        confirmPassword: data.confirmPassword
      })

      toast.success(reponse.data.message, {
        style: { 
          color: 'green' 
        },
      })
    } catch (error: any) {
      console.error("Update password failed: ", error.response);

      toast.error(error.response?.data.message, {
        style: { 
          color: 'red' 
        },
      })
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-lg md:text-xl font-bold">Password</h1>
      <h5 className="text-md">Change your password</h5>
      <Separator className="my-4" />
      {error && 
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4 -mt-1" />
          <AlertTitle className="mb-0 tracking-normal">{error}</AlertTitle>
        </Alert>
      }
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            {loading ? (
              <div className="w-full h-9 bg-secondary animate-pulse rounded-lg"></div>
            ) : (
              <Input 
                id="password" 
                type="password" 
                {...register("password")}
                className="shadow-none"
              />
            )}
            {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            {loading ? (
              <div className="w-full h-9 bg-secondary animate-pulse rounded-lg"></div>
            ) : (
              <Input 
                id="confirmPassword" 
                type="password" 
                {...register("confirmPassword")}
                className="shadow-none"
              />
            )}
            {errors.confirmPassword && <span className="text-sm text-red-500">{errors.confirmPassword.message}</span>}
          </div>
          <Button 
            type="submit" 
            className="shadow-none"
          >
            {loading ? (
              <svg className="inline w-7 h-7   text-slate-200 animate-spin dark:text-slate-300 fill-slate-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
            ) : (
              "Update Password"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}