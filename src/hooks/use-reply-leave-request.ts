import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

export const useReplyLeaveRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      id: string;
      comment: string;
      status: 'approved' | 'rejected' | 'revoked' | string;
    }) => await axiosInstance.put(`/verifikator/leave-requests/${data.id}/reply`, {
      comment: data.comment,
      status: data.status
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['leave-request'] 
      });
    }
  })
}