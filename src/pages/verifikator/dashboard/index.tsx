import { useEffect, useState } from "react";
import type { AxiosResponse } from "axios";
import axiosInstance from "@/lib/axios";
import { Link } from "react-router-dom";
import { ReceiptText, User } from "lucide-react";
import { CardOverview } from "@/components/card-overview";
import PrivateGuard from "@/components/guard/private"
import VerifikatorLayout from "@/components/layout/verifikator"
import { PieChartLeaveRequest } from "@/components/pie-chart-leave-request";
import { PieChartUser } from "@/components/pie-chart-user-verified";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ 
    total: number
    isVerified: number
    notVerified: number
  }>({
    total: 0,
    isVerified: 0,
    notVerified: 0
  });
  const [leaveRequest, setLeaveRequest] = useState<{
    total: number
    pending: number
    canceled: number
    revoked: number
    approved: number
    rejected: number
  }>({
    total: 0,
    pending: 0,
    canceled: 0,
    revoked: 0,
    approved: 0,
    rejected: 0
  })

  const fetchUserStatistic = async () => {
    setIsLoading(true);

    try {
      const response: AxiosResponse = await axiosInstance.get('/verifikator/users/statistics');

      setUser(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const fetchLeaveRequestStatistic = async () => {
    setIsLoading(true);

    try {
      const response: AxiosResponse = await axiosInstance.get('/verifikator/leave-requests/statistics');

      setLeaveRequest(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUserStatistic();
    fetchLeaveRequestStatistic();
  }, [])

  return (
    <PrivateGuard allowedRole="verifikator">
      <VerifikatorLayout>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            {isLoading ? (
              <div className="flex h-30 bg-secondary rounded-md w-full mt-4 animate-pulse"></div>
            ) : (
              <Link to="/verifikator/user">
                <CardOverview index={1} title="User" value={user.total} description="Total user" icon={User} />
              </Link>
            )}
            {isLoading ? (
              <div className="flex h-30 bg-secondary rounded-md w-full mt-4 animate-pulse"></div>
            ) : (
              <Link to="/verifikator/leave-request">
                <CardOverview index={2} title="Leave Request" value={leaveRequest.total} description="Total leave request" icon={ReceiptText} />              
              </Link>
            )}
          </div>
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            {isLoading ? (
              <div className="flex h-88 bg-secondary rounded-md w-full mt-4 animate-pulse"></div>              
            ):(
              <PieChartUser user={user} />
            )}
            {isLoading ? (
              <div className="flex h-88 bg-secondary rounded-md w-full mt-4 animate-pulse"></div>              
            ):(
              <PieChartLeaveRequest leaveRequest={leaveRequest} />
            )}      
          </div>
        </div>
      </VerifikatorLayout>
    </PrivateGuard>
  )
}
