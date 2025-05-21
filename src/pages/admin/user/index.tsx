import { useEffect, useState } from "react"
import type { AxiosResponse } from "axios"
import axiosInstance from "@/lib/axios"
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

export default function UserPage() {
  const [loading, setLoading] = useState<boolean>(true)
  const [role, setRole] = useState<string>()
  const [dataUsers, setDataUsers] = useState<{
    users: {
      id: string
      name: string
      email: string
      role: string
    }[],
    meta: {
      page: number
      limit: number
      total: number
      totalData: number
      totalPage: number
    }
  }>({
    users: [],
    meta: {
      page: 1,
      limit: 20,
      total: 0,
      totalData: 0,
      totalPage: 0
    }
  })
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
    role: "user"
  })

  const fetchUsers = async (page?: number) => {
    setLoading(true);
    
    try {
      const response: AxiosResponse = await axiosInstance.get('/admin/users', {
        params: {
          role,
          page: page? page : dataUsers.meta.page,
        }
      });
      setDataUsers(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response: AxiosResponse = await axiosInstance.post('/admin/users', userForm);

      toast.success("Success", {
        description: response.data.message,
        style: {
          color: 'green'
        },
      })
    } catch (error) {
      console.error(error);

      toast.error("Error", {
        description: "Failed to create user",
        style: {
          color: 'red'
        },
      })
    } finally {
      fetchUsers();
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    })
  }

  const handleSearch = (name: string) => {
    if (!name) return fetchUsers();

    setDataUsers(prev => ({
      ...prev,
      users: prev.users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()))
    }))
  }

  useEffect(() => {
    fetchUsers();
  }, [role])

  return (
    <PrivateGuard allowedRole="admin">
      <AdminLayout>
        <div className="flex flex-col p-4 pt-0 w-full">
          <div className="flex flex-row justify-between">
            <Input 
              type="search" 
              placeholder="Find user by name" 
              onChange={(e) => handleSearch(e.target.value)}
              className="w-1/3 shadow-none placeholder:text-sm" 
            />
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
                    checked={role === "verifikator"}
                    onCheckedChange={(value) => 
                      setRole(value ? "verifikator" : undefined)
                    }
                  >
                    verifikator
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={role === "user"}
                    onCheckedChange={(value) => 
                      setRole(value ? "user" : undefined)
                    }
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
                          Save
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          {loading ? (
            <div className="flex h-96 bg-secondary rounded-md w-full mt-4 animate-pulse"></div>
          ) : dataUsers.users.length === 0 ? (
            <div className="flex h-32 items-center justify-center bg-secondary rounded-md w-full mt-4 text-destructive font-semibold">
              No User Found
            </div>
          ) : (
            <>
              <UserTable data={dataUsers} fetchUsers={fetchUsers} />
              <PaginationTable data={dataUsers.meta} fetchData={fetchUsers} />
            </>
          )}
        </div>      
      </AdminLayout>
    </PrivateGuard>
  )
}
