import PrivateGuard from "@/components/guard/private"
import VerifikatorLayout from "@/components/layout/verifikator"
import { LeaveRequestTable } from "@/components/verifikator/leave-request"
import axiosInstance from "@/lib/axios"
import type { AxiosResponse } from "axios"
import { useEffect, useState } from "react"

export default function LeaveRequestPage() {
  const [loading, setLoading] = useState<boolean>(true)
  const [leaveRequests, setLeaveRequests] = useState<Array<{
    id: string
    user: {
      name: string
    },
    title: string
    description: string
    start_date: string
    end_date: string
    leave_type: {
      id: string
      name: string
    },
    status: string
  }>>([])

  const fetchLeaveRequest = async () => {
    try {
      const response: AxiosResponse = await axiosInstance.get('/verifikator/leave-requests')
      setLeaveRequests(response.data.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeaveRequest()
  }, [])

  return (
    <PrivateGuard allowedRole="verifikator">
      <VerifikatorLayout>
        <div className="flex flex-col p-4 pt-0 w-full">
          {loading ? (
            <div className="flex h-96 bg-secondary rounded-md w-full mt-4 animate-pulse"></div>
          ) : (
            <LeaveRequestTable data={{ leaveRequests }} />
          )}
        </div>  
      </VerifikatorLayout>
    </PrivateGuard>
  )
}
