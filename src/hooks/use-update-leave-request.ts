import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

export const useUpdateLeaveRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      id: string;
      title: string;
      description: string;
      startDate: string;
      endDate: string;
      leaveTypeId: string;
    }) => await axiosInstance.put(`/user/leave-requests/${data.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['leave-request'] 
      });
    }
  })
}