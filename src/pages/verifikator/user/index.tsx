import { useState } from "react"
import PrivateGuard from "@/components/guard/private"
import VerifikatorLayout from "@/components/layout/verifikator"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserTable } from "@/components/verifikator/user-table"
import { Button } from "@/components/ui/button"
import { PaginationTable } from "@/components/pagination-table"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { useUser } from "@/hooks/use-user"

export default function UserPage() {
  const role: string | null = useSelector((state: RootState) => state.auth.role);  
  const [isVerified, setIsVerified] = useState<boolean>()
  const [page, setPage] = useState<number>(1)
  const { data, isLoading } = useUser(role as string, isVerified, undefined, page)

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
                    Verified
                  </DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    checked={isVerified === true}
                    onCheckedChange={(checked) => {
                      setIsVerified(checked ? true : undefined);
                      setPage(1)
                    }}
                  >
                  Verified
                  </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={isVerified === false}
                      onCheckedChange={(checked) => {
                        setIsVerified(checked ? false : undefined);
                        setPage(1)
                      }}
                    >
                    Not Verified
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
      </VerifikatorLayout>
    </PrivateGuard>
  )
}
