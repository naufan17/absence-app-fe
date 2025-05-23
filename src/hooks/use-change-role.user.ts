import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

export const useChangeRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      id: string;
      role: string;
    }) => await axiosInstance.put(`/admin/users/${data.id}/role`, {
      role: data.role
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['user'] 
      });
    }
  });
}