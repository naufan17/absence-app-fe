import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

export const useUser = (role: string, isVerified?: boolean, roleOption?: 'verifikator' | 'user' | string, page?: number) => {
  return useQuery({
    queryKey: ['user', role, isVerified, roleOption, page],
    queryFn: async () => {
      const response = await axiosInstance.get(`/${role}/users`, {
        params: {
          isVerified,
          role: roleOption,
          page,
        }
      });
      return response.data.data;
    },
  })
}