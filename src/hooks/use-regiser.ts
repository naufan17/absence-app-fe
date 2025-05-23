import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: { 
      name: string;
      email: string; 
      password: string; 
      confirmPassword: string 
    }) => await axiosInstance.post('/auth/register', data),
  });
}