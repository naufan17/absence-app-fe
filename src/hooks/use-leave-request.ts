import axiosInstance from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useLeaveRequest = (role: string, status?: string, page?: number) => {
  return useQuery({
    queryKey: ['leave-request', role, status, page],
    queryFn: async () => {
      const response = await axiosInstance.get(`/${role}/leave-requests`, {
        params: {
          status,
          page,
        }
      });
      return response.data.data;
    },
  })
}