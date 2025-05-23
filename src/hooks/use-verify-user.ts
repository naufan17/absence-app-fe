import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

export const useVerifyUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      id: string;
    }) => await axiosInstance.put(`/verifikator/users/${data.id}/verify`),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['user'] 
      });
    }
  });
}