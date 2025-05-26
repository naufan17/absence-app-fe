import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

export const useLeaveTypeRequest = () => {
  return useQuery({
    queryKey: ['leave-type-request'],
    queryFn: async () => {
      const response = await axiosInstance.get('/leave-types');
      return response.data.data;
    },
  })
}