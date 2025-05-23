/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { useSelector } from "react-redux"
import { ChevronDown } from "lucide-react"
import type { RootState } from "@/store/store"
import { useLeaveRequest } from "@/hooks/use-leave-request"
import PrivateGuard from "@/components/guard/private"
import VerifikatorLayout from "@/components/layout/verifikator"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LeaveRequestTable } from "@/components/verifikator/leave-request-table"
import { Button } from "@/components/ui/button"
import { PaginationTable } from "@/components/pagination-table"

export default function LeaveRequestPage() {
  const role: string | null = useSelector((state: RootState) => state.auth.role);  
  const [status, setStatus] = useState<string>()
  const [page, setPage] = useState<number>(1)
  const { data, isLoading } = useLeaveRequest(role as string, status, page)

  return (
    <PrivateGuard allowedRole="verifikator">
      <VerifikatorLayout>
        <div className="flex flex-col p-4 pt-0 w-full">
          <div className="flex flex-row justify-between">
            <div/>
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
                    onCheckedChange={(value) => {
                      setStatus(value ? "pending" : undefined)
                      setPage(1)
                    }}
                  >
                    pending
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={status === "approved"}
                    onCheckedChange={(value) => {
                      setStatus(value ? "approved" : undefined)
                      setPage(1)
                    }}
                  >
                    approved
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={status === "rejected"}
                    onCheckedChange={(value) => {
                      setStatus(value ? "rejected" : undefined)
                      setPage(1)
                    }}
                  >
                    rejected
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={status === "revoked"}
                    onCheckedChange={(value) => {
                      setStatus(value ? "revoked" : undefined)
                      setPage(1)
                    }}
                  >
                    revoked
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={status === "canceled"}
                    onCheckedChange={(value) => {
                      setStatus(value ? "canceled" : undefined)
                      setPage(1)
                    }}
                  >
                    canceled
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
            {isLoading ? (
              <div className="flex h-96 bg-secondary rounded-md w-full mt-4 animate-pulse"></div>
            ) : data.leaveRequests.length === 0 ? (
              <div className="flex h-32 items-center justify-center bg-secondary rounded-md w-full mt-4 text-destructive font-semibold">
                No Leave Request Found
              </div>
            ) : (
              <>
                <LeaveRequestTable data={data} />
                <PaginationTable data={data.meta} fetchData={setPage} />
              </>            
            )}
        </div>  
      </VerifikatorLayout>
    </PrivateGuard>
  )
}
