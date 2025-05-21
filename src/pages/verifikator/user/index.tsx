import { useEffect, useState } from "react"
import type { AxiosResponse } from "axios"
import axiosInstance from "@/lib/axios"
import PrivateGuard from "@/components/guard/private"
import VerifikatorLayout from "@/components/layout/verifikator"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserTable } from "@/components/verifikator/user-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PaginationTable } from "@/components/pagination-table"

export default function UserPage() {
  const [loading, setLoading] = useState<boolean>(true)
  const [isVerified, setIsVerified] = useState<boolean>()
  const [dataUsers, setDataUsers] = useState<{
    users: {
      id: string
      name: string
      email: string
      role: string
      is_verified: boolean
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

  const fetchUsers = async (page?: number) => {
    setLoading(true);

    try {
      const response: AxiosResponse = await axiosInstance.get('/verifikator/users', { 
        params: { 
          isVerified,
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

  const handleSearch = (name: string) => {
    if (!name) return fetchUsers();

    setDataUsers(prev => ({
      ...prev,
      users: prev.users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()))
    }))
  }

  useEffect(() => {
    fetchUsers(1);
  }, [isVerified])

  return (
    <PrivateGuard allowedRole="verifikator">
      <VerifikatorLayout>
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
                    Verified
                  </DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    checked={isVerified === true}
                    onCheckedChange={(checked) => {
                      setIsVerified(checked ? true : undefined);
                    }}
                  >
                  Verified
                  </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={isVerified === false}
                      onCheckedChange={(checked) => {
                        setIsVerified(checked ? false : undefined);
                      }}
                    >
                    Not Verified
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
      </VerifikatorLayout>
    </PrivateGuard>
  )
}
