import type { RootState } from "@/lib/store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  allowedRole: 'verifikator' | 'admin' | 'user';
}

export default function PrivateGuard({ children, allowedRole }: Readonly<Props>) {
  const isAuthenticated: boolean = useSelector((state: RootState) => state.auth.isAuthenticated);
  const role: string | null = useSelector((state: RootState) => state.auth.role);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (!allowedRole.includes(role as 'verifikator' | 'admin' | 'user')) {
      navigate('/forbidden');
    }
  }, [isAuthenticated, role, navigate, allowedRole]);

  return isAuthenticated && allowedRole.includes(role as 'verifikator' | 'admin' | 'user') ? children : null;
}