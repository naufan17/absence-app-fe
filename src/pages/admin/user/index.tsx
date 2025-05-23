/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import type { AxiosResponse } from "axios"
import { toast } from "sonner"
import { ChevronDown } from "lucide-react"
import PrivateGuard from "@/components/guard/private"
import AdminLayout from "@/components/layout/admin"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserTable } from "@/components/admin/user-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogClose } from "@radix-ui/react-dialog"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select } from "@radix-ui/react-select"
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PaginationTable } from "@/components/pagination-table"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { useUser } from "@/hooks/use-user"
import { useCreateUser } from "@/hooks/use-create-user"

export default function UserPage() {
  const role: string | null = useSelector((state: RootState) => state.auth.role);  
  const [roleOption, setRoleOption] = useState<string>()
  const [page , setPage] = useState<number>(1)
  const { data, isLoading } = useUser(role as string, undefined, roleOption, page)
  const createUser = useCreateUser()
  const [userForm, setUserForm] = useState<{
    name: string
    email: string
    password: string
    confirmPassword: string
    role: string
  }>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: ""
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createUser.mutate({
      name: userForm.name,
      email: userForm.email,
      password: userForm.password,
      confirmPassword: userForm.confirmPassword,
      role: userForm.role
    }, {
      onSuccess: (response: AxiosResponse) => {
        toast.success(response.data.message, {
          style: {
            color: 'green'
          },
        })
      },
      onError: (error: any) => {
        toast.error(error.response?.data.message, {
          style: {
            color: 'red'
          },
        })
      }
    });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    })
  }

  return (
    <PrivateGuard allowedRole="admin">
      <AdminLayout>
        <div className="flex flex-col p-4 pt-0 w-full">
          <div className="flex flex-row justify-between">
            <div />
            <div className="space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="shadow-none">
                    Filter
                  <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    Role
                  </DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    checked={roleOption === "verifikator"}
                    onCheckedChange={(value) => {
                      setRoleOption(value ? "verifikator" : undefined)
                      setPage(1)
                    }}
                  >
                    verifikator
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={roleOption === "user"}
                    onCheckedChange={(value) => {
                      setRoleOption(value ? "user" : undefined)
                      setPage(1)
                    }}
                  >
                    user
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Dialog>
                <DialogTrigger>
                  <Button variant="default">
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <form onSubmit={handleSubmit}>
                    <DialogHeader>
                      <DialogTitle>
                        Add New User
                      </DialogTitle>
                      <DialogDescription>
                        Make your user account here. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-6 mt-6">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name" 
                          type="text"
                          name="name"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email"
                          name="email"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input 
                          id="password" 
                          type="password"
                          name="password"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input 
                          id="confirmPassword" 
                          type="password"
                          name="confirmPassword"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="role">Role</Label>
                        <Select
                          name="role"
                          onValueChange={(value: string) =>
                            setUserForm({
                              ...userForm,
                              role: value
                            })
                          }
                          value={userForm.role}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="verifikator">Verifikator</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose>
                        <Button type="submit" className="mt-6">
                          Save changes
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          {isLoading ? (
            <div className="flex h-96 bg-secondary rounded-md w-full mt-4 animate-pulse"></div>
          ) : data.users.length === 0 ? (
            <div className="flex h-32 items-center justify-center bg-secondary rounded-md w-full mt-4 text-destructive font-semibold">
              No User Found
            </div>
          ) : (
            <>
              <UserTable data={data} />
              <PaginationTable data={data.meta} fetchData={setPage} />
            </>
          )}
        </div>      
      </AdminLayout>
    </PrivateGuard>
  )
}
