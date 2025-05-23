import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: async (data: { 
      password: string; 
      confirmPassword: string 
    }) => await axiosInstance.post('/account/update-password', data),
  });
}