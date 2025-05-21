import { useEffect, useState } from "react"
import axiosInstance from "@/lib/axios"
import type { AxiosResponse } from "axios"
import { ChevronDown } from "lucide-react"
import PrivateGuard from "@/components/guard/private"
import AdminLayout from "@/components/layout/admin"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LeaveRequestTable } from "@/components/admin/leave-request"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PaginationTable } from "@/components/pagination-table"

export default function LeaveRequestPage() {
    const [loading, setLoading] = useState<boolean>(true)
    const [status, setStatus] = useState<string>()
    const [leaveRequestsData, setLeaveRequestsData] = useState<{
      leaveRequests: {
        id: string
        user: {
          name: string
        }
        title: string
        description: string
        start_date: string
        end_date: string
        leave_type: {
          name: string
        }
        status: string
        comment: string | null
      }[],
      meta: {
        page: number
        limit: number
        total: number
        totalData: number
        totalPage: number
      }
    }>({
      leaveRequests: [],
      meta: {
        page: 1,
        limit: 20,
        total: 0,
        totalData: 0,
        totalPage: 0
      }
    })
  
    const fetchLeaveRequest = async (page?: number) => {
      setLoading(true)

      try {
        const response: AxiosResponse = await axiosInstance.get('/admin/leave-requests', {
          params: {
            status,
            page: page? page : leaveRequestsData.meta.page,
          }
        })
        setLeaveRequestsData(response.data.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    const handleSearch = (name: string) => {
      if (!name) return fetchLeaveRequest();
  
      setLeaveRequestsData({
        ...leaveRequestsData,
        leaveRequests: leaveRequestsData.leaveRequests.filter(leaveRequest => 
          leaveRequest.user.name.toLowerCase().includes(name.toLowerCase())
        )
      }
    )}
  
    useEffect(() => {
      fetchLeaveRequest(1)
    }, [status])
    
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
          ) : leaveRequestsData.leaveRequests.length === 0 ? (
            <div className="flex h-32 items-center justify-center bg-secondary rounded-md w-full mt-4 text-destructive font-semibold">
              No Leave Request Found
            </div>
          ) : (
            <>
              <LeaveRequestTable data={leaveRequestsData} />
              <PaginationTable data={leaveRequestsData.meta} fetchData={fetchLeaveRequest} />
            </>
          )}
        </div>  
      </AdminLayout>
    </PrivateGuard>
  )
}
