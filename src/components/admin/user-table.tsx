import { useState } from "react";
import type { AxiosResponse } from "axios";
import axiosInstance from "@/lib/axios";
import { Edit, Ellipsis } from "lucide-react";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogFooter, DialogHeader, DialogTitle, DialogContent, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UserTableProps {
  data: {
    users: {
      id: string;
      name: string;
      email: string;
      role: string
   }[],
    meta: {
      page: number;
      limit: number;
      total: number;
      totalData: number;
      totalPage: number;
    }
  };
  fetchUsers: () => Promise<void>
}

export function UserTable({ data, fetchUsers }: UserTableProps) {
  const [resetPasswordForm, setResetPasswordForm] = useState<{
    id: string;
    password: string;
  }>({
    id: "",
    password: "",
  });

  const handleChangeRole = async (id: string) => {
    try {
      const response: AxiosResponse = await axiosInstance.put(`/admin/users/${id}/role`, { 
        role: "verifikator"
      });

      toast.success("Success", {
        description: response.data.message,
        style: { 
          color: 'green' 
        },
      })
    } catch (error) {
      console.error(error);
      
      toast.error("Error", {
        description: "Failed to change role",
        style: { 
          color: 'red' 
        },
      })
    } finally {
      fetchUsers();
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response: AxiosResponse = await axiosInstance.put(`/admin/users/${resetPasswordForm.id}/reset-password`, { 
        password: resetPasswordForm.password,
        confirmPassword: resetPasswordForm.password
      });

      toast.success("Success", {
        description: response.data.message,
        style: { 
          color: 'green' 
        },
      })
    } catch (error) {
      console.error(error);
      
      toast.error("Error", {
        description: "Failed to reset password",
        style: { 
          color: 'red' 
        },
      })
    } finally {
      fetchUsers();
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResetPasswordForm({
      ...resetPasswordForm,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className="rounded-md border w-full mt-4">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.users.map((user) => (
          <TableRow key={user.id} className="py-2">
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              {user.role === 'verifikator' ? (
                <Badge>
                  {user.role}
                </Badge>
              ):(
                <Badge variant="secondary">
                  {user.role}
                </Badge>
              )}
            </TableCell>
            <TableCell>
              <Dialog>
                <DialogTrigger>
                  <Button 
                    variant={"ghost"} 
                    className="p-1 h-auto"
                    onClick={() => {
                      setResetPasswordForm({
                        id: user.id,
                        password: "",
                      })
                    }}
                    >
                    <Edit className="size-4"/>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <form onSubmit={handleSubmit}>
                    <DialogHeader>
                      <DialogTitle>
                        Reset Password
                      </DialogTitle>
                      <DialogDescription>
                        Make your change here. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-6 mt-6">
                      <div className="grid gap-2">
                        <Input
                          id="id"
                          type="hidden"
                          name="id"
                          value={resetPasswordForm.id}
                        />
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          name="password"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          name="confirmPassword"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="mt-6">
                        Save changes
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              {user.role === 'verifikator' ? (
                ''
              ):(
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button variant={"ghost"} className="p-1 h-auto">
                      <Ellipsis className="size-4"/>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Change Role
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to change the role of this user?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleChangeRole(user.id)}>
                        Change
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </TableCell>
          </TableRow>                
        ))}
      </TableBody>
    </Table>
  </div>
  )
}