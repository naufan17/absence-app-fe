import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: { 
      email: string; 
      password: string; 
    }) => await axiosInstance.post('/auth/login', data),
  });
}