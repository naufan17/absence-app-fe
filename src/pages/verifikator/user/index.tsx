import { useEffect, useState } from "react"
import PrivateGuard from "@/components/guard/private"
import VerifikatorLayout from "@/components/layout/verifikator"
import { UserTable } from "@/components/verifikator/user-table"
import axiosInstance from "@/lib/axios"
import type { AxiosResponse } from "axios"

export default function UserPage() {
  const [loading, setLoading] = useState<boolean>(true)
  const [users, setUsers] = useState<Array<{
    id: string
    name: string
    email: string
    is_verified: string
  }>>([])

  const fetchUsers = async () => {
    try {
      const response: AxiosResponse = await axiosInstance.get('/verifikator/users');
      setUsers(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <PrivateGuard allowedRole="verifikator">
      <VerifikatorLayout>
        <div className="flex flex-col p-4 pt-0 w-full">
          {loading ? (
            <div className="flex h-96 bg-secondary rounded-md w-full mt-4 animate-pulse"></div>
          ) : (
            <UserTable data={{ users }} fetchUsers={fetchUsers} />
          )}
        </div>  
      </VerifikatorLayout>
    </PrivateGuard>
  )
}
