import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { state } = useApp();
  const location = useLocation();

  if (!state.profile) {
    const params = new URLSearchParams({
      auth: "required",
      redirect: `${location.pathname}${location.search}`,
    });
    return <Navigate to={`/?${params.toString()}`} replace />;
  }

  return <>{children}</>;
}
