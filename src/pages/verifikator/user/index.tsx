import { useEffect, useState } from "react"
import PrivateGuard from "@/components/guard/private"
import VerifikatorLayout from "@/components/layout/verifikator"
import { UserTable } from "@/components/verifikator/user-table"
import axiosInstance from "@/lib/axios"
import type { AxiosResponse } from "axios"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function UserPage() {
  const [loading, setLoading] = useState<boolean>(true)
  const [isVerified, setIsVerified] = useState<boolean>()
  const [users, setUsers] = useState<Array<{
    id: string
    name: string
    email: string
    is_verified: string
  }>>([])

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const response: AxiosResponse = await axiosInstance.get('/verifikator/users', { 
        params: { 
          isVerified 
        } 
      });
      setUsers(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [isVerified])

  return (
    <PrivateGuard allowedRole="verifikator">
      <VerifikatorLayout>
        <div className="flex flex-col p-4 pt-0 w-full">
          <div className="flex flex-row justify-between">
            <div></div>
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
                  Is Verified
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
          ) : users.length === 0 ? (
            <div className="flex h-32 items-center justify-center bg-secondary rounded-md w-full mt-4 text-destructive font-semibold">
              No User Found
            </div>
          ) : (
            <UserTable data={{ users }} fetchUsers={fetchUsers} />
          )}
        </div>  
      </VerifikatorLayout>
    </PrivateGuard>
  )
}
