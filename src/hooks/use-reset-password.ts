import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

export const useResetPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      id: string;
      password: string;
      confirmPassword: string;
    }) => await axiosInstance.put(`/admin/users/${data.id}/reset-password`, {
      password: data.password,
      confirmPassword: data.confirmPassword
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['user'] 
      });
    }
  });
}