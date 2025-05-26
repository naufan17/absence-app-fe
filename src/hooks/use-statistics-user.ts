import axiosInstance from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

export const useStatistics = (role: string) => {
  return useQuery({
    queryKey: ['leave-request-statistics'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/${role}/leave-requests/statistics`);
      return response.data.data;
    },
  });
};
