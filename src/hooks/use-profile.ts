import axiosInstance from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const reponse = await axiosInstance.get('/account/profile');
      return reponse.data.data;
    }
  })
}