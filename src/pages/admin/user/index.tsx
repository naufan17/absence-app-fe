import { useEffect, useState } from "react"
import type { AxiosResponse } from "axios"
import axiosInstance from "@/lib/axios"
import { ChevronDown } from "lucide-react"
import PrivateGuard from "@/components/guard/private"
import AdminLayout from "@/components/layout/admin"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserTable } from "@/components/admin/user-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function UserPage() {
  const [loading, setLoading] = useState<boolean>(true)
  const [role, setRole] = useState<string>()
  const [users, setUsers] = useState<Array<{
    id: string
    name: string
    email: string
    role: string
  }>>([])

  const fetchUsers = async () => {
    setLoading(true);
    
    try {
      const response: AxiosResponse = await axiosInstance.get('/admin/users', {
        params: {
          role
        }
      });
      setUsers(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = (name: string) => {
    if (!name) return fetchUsers();

    setUsers(users.filter(user => user.name.toLowerCase().includes(name.toLowerCase())))
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
            </div>
          </div>
          {loading ? (
            <div className="flex h-96 bg-secondary rounded-md w-full mt-4 animate-pulse"></div>
          ) : users.length === 0 ? (
            <div className="flex h-32 items-center justify-center bg-secondary rounded-md w-full mt-4 text-destructive font-semibold">
              No User Found
            </div>
          ) : (
            <UserTable data={{ users }} fetchUsers={fetchUsers} />
          )}
        </div>      
      </AdminLayout>
    </PrivateGuard>
  )
}
