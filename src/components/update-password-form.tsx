import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function UpdatePasswordForm() {
  const [loading] = useState<boolean>(false)
  const [error] = useState<string | null>(null)

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
      <form>
        <div className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            {loading ? (
              <div className="w-full h-9 bg-secondary animate-pulse rounded-lg"></div>
            ) : (
              <Input 
                id="password" 
                type="password" 
                name="password"
                className="shadow-none"
              />
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            {loading ? (
              <div className="w-full h-9 bg-secondary animate-pulse rounded-lg"></div>
            ) : (
              <Input 
                id="confirmPassword" 
                type="password" 
                name="confirmPassword"
                className="shadow-none"
              />
            )}
          </div>
          <Button type="submit" className="shadow-none">
            Update Password
          </Button>
        </div>
      </form>
    </div>
  );
}