import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

export const useCreateLeaveRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      startDate: string;
      endDate: string;
      leaveTypeId: string;
      reason: string;
    }) => await axiosInstance.post('/user/leave-requests', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['leave-request'] 
      });
    }
  })
}