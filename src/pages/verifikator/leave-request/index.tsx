import { useEffect, useState } from "react"
import type { AxiosResponse } from "axios"
import axiosInstance from "@/lib/axios"
import { ChevronDown } from "lucide-react"
import PrivateGuard from "@/components/guard/private"
import VerifikatorLayout from "@/components/layout/verifikator"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LeaveRequestTable } from "@/components/verifikator/leave-request"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LeaveRequestPage() {
  const [loading, setLoading] = useState<boolean>(true)
  const [status, setStatus] = useState<string>()
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
    status: string,
    comment: string | null
  }>>([])

  const fetchLeaveRequest = async () => {
    setLoading(true)

    try {
      const response: AxiosResponse = await axiosInstance.get('/verifikator/leave-requests', {
        params: {
          status
        }
      })
      setLeaveRequests(response.data.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (name: string) => {
    if (!name) return fetchLeaveRequest();

    setLeaveRequests(leaveRequests.filter(leaveRequest => leaveRequest.user.name.toLowerCase().includes(name.toLowerCase())))
  }

  useEffect(() => {
    fetchLeaveRequest()
  }, [status])

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
                    Status
                  </DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    checked={status === "pending"}
                    onCheckedChange={(value) => 
                      setStatus(value ? "pending" : undefined)
                    }
                  >
                    pending
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={status === "approved"}
                    onCheckedChange={(value) => 
                      setStatus(value ? "approved" : undefined)
                    }
                  >
                    approved
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={status === "rejected"}
                    onCheckedChange={(value) => 
                      setStatus(value ? "rejected" : undefined)
                    }
                  >
                    rejected
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={status === "revoked"}
                    onCheckedChange={(value) => 
                      setStatus(value ? "revoked" : undefined)
                    }
                  >
                    revoked
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={status === "canceled"}
                    onCheckedChange={(value) => 
                      setStatus(value ? "canceled" : undefined)
                    }
                  >
                    canceled
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
            {loading ? (
              <div className="flex h-96 bg-secondary rounded-md w-full mt-4 animate-pulse"></div>
            ) : leaveRequests.length === 0 ? (
              <div className="flex h-32 items-center justify-center bg-secondary rounded-md w-full mt-4 text-destructive font-semibold">
                No Leave Request Found
              </div>
            ) : (
              <LeaveRequestTable data={{ leaveRequests }} fetchLeaveRequest={fetchLeaveRequest} />
            )}
        </div>  
      </VerifikatorLayout>
    </PrivateGuard>
  )
}
