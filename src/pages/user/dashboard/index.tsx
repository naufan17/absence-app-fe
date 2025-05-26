import { Link } from "react-router-dom";
import { ReceiptText } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useStatistics } from "@/hooks/use-statistics-user";
import { CardOverview } from "@/components/card-overview";
import PrivateGuard from "@/components/guard/private"
import UserLayout from "@/components/layout/user"

export default function DashboardPage() {
  const role: string | null = useSelector((state: RootState) => state.auth.role);  
  const { data, isLoading } = useStatistics(role as string);

  return (
    <PrivateGuard allowedRole="user">
      <UserLayout>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            {isLoading ? (
              <div className="flex h-30 bg-secondary rounded-md w-full mt-4 animate-pulse"></div>
            ) : (
              <Link to="/user/leave-request">
                <CardOverview index={2} title="Leave Request" value={data.total} description="Total leave request" icon={ReceiptText} />              
              </Link>
            )}
            <div/>
          </div>
        </div>
      </UserLayout>
    </PrivateGuard>
  )
}
