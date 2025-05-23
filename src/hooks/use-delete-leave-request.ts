import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

export const useDeleteLeaveRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => await axiosInstance.delete(`/user/leave-requests/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['leave-request'] 
      });
    }
  })
}