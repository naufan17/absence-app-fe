import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { ReceiptText, User } from "lucide-react";
import { useStatistics } from "@/hooks/use-statistics";
import { CardOverview } from "@/components/card-overview";
import PrivateGuard from "@/components/guard/private"
import VerifikatorLayout from "@/components/layout/verifikator"
import { PieChartLeaveRequest } from "@/components/pie-chart-leave-request";
import { PieChartUser } from "@/components/pie-chart-user-verified";

export default function DashboardPage() {
  const role: string | null = useSelector((state: RootState) => state.auth.role);
  const [{ data: userStatisticsData, isLoading: isUserLoading }, { data: leaveRequestStatisticsData, isLoading: isLeaveLoading }] = useStatistics(role as string);
  const userStatistics = userStatisticsData || {};
  const leaveRequestStatistics = leaveRequestStatisticsData || {};
  const isLoading = isUserLoading || isLeaveLoading;

  return (
    <PrivateGuard allowedRole="verifikator">
      <VerifikatorLayout>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            {isLoading ? (
              <div className="flex h-30 bg-secondary rounded-md w-full mt-4 animate-pulse"></div>
            ) : (
              <Link to="/verifikator/user">
                <CardOverview index={1} title="User" value={userStatistics.total} description="Total user" icon={User} />
              </Link>
            )}
            {isLoading ? (
              <div className="flex h-30 bg-secondary rounded-md w-full mt-4 animate-pulse"></div>
            ) : (
              <Link to="/verifikator/leave-request">
                <CardOverview index={2} title="Leave Request" value={leaveRequestStatistics.total} description="Total leave request" icon={ReceiptText} />              
              </Link>
            )}
          </div>
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            {isLoading ? (
              <div className="flex h-88 bg-secondary rounded-md w-full mt-4 animate-pulse"></div>              
            ):(
              <PieChartUser user={userStatistics} />
            )}
            {isLoading ? (
              <div className="flex h-88 bg-secondary rounded-md w-full mt-4 animate-pulse"></div>              
            ):(
              <PieChartLeaveRequest leaveRequest={leaveRequestStatistics} />
            )}      
          </div>
        </div>
      </VerifikatorLayout>
    </PrivateGuard>
  )
}
