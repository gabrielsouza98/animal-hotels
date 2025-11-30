import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Props = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: Props) {
  const { state } = useAuth();

  if (!state.user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
