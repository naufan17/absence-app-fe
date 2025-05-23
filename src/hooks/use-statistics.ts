import axiosInstance from '@/lib/axios';
import { useQueries } from '@tanstack/react-query';

export const useStatistics = (role: string) => {
  return useQueries({
    queries: [
      {
        queryKey: ['user-statistics'],
        queryFn: async () => {
          const response = await axiosInstance.get(`/${role}/users/statistics`);
          return response.data.data;
        },
      },
      {
        queryKey: ['leave-request-statistics'],
        queryFn: async () => {
          const response = await axiosInstance.get(`/${role}/leave-requests/statistics`);
          return response.data.data;
        },
      },
    ],
  });
};
