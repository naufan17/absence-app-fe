import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

export const useCancelLeaveRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => await axiosInstance.put(`/user/leave-requests/${id}/cancel`),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['leave-request'] 
      });
    }
  })
} 