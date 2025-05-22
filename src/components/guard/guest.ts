import type { RootState } from "@/store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function GuestGuard({ children }: Readonly<{ children: React.ReactNode }>) {
  const isAuthenticated: boolean = useSelector((state: RootState) => state.auth.isAuthenticated);
  const role: string | null = useSelector((state: RootState) => state.auth.role);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && role) navigate(`/${role}/dashboard`);
  
  }, [isAuthenticated, role, navigate]);

  return isAuthenticated && role ? null : children
}
