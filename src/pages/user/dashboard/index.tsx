import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { AxiosResponse } from "axios";
import axiosInstance from "@/lib/axios";
import { ReceiptText } from "lucide-react";
import { CardOverview } from "@/components/card-overview";
import PrivateGuard from "@/components/guard/private"
import UserLayout from "@/components/layout/user"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
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

  const fetchLeaveRequestStatistic = async () => {
    setIsLoading(true);

    try {
      const response: AxiosResponse = await axiosInstance.get('/user/leave-requests/statistics');

      setLeaveRequest(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchLeaveRequestStatistic();
  }, [])

  return (
    <PrivateGuard allowedRole="user">
      <UserLayout>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            {isLoading ? (
              <div className="flex h-30 bg-secondary rounded-md w-full mt-4 animate-pulse"></div>
            ) : (
              <Link to="/user/leave-request">
                <CardOverview index={2} title="Leave Request" value={leaveRequest.total} description="Total leave request" icon={ReceiptText} />              
              </Link>
            )}
            <div/>
          </div>
        </div>
      </UserLayout>
    </PrivateGuard>
  )
}
