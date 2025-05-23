import axiosInstance from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { 
      name: string; 
      email: string 
    }) => await axiosInstance.post('/account/update-profile', data),
    onSuccess: () => queryClient.invalidateQueries({ 
      queryKey: ['profile'] 
    })
  });
}