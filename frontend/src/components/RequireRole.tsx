import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function RequireRole({
  roles,
  children,
}: {
  roles: string[];
  children: React.ReactNode;
}) {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="p-6">Loading...</div>;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  if (!role || !roles.includes(role))
    return <Navigate to="/" replace state={{ from: location }} />;
  return children;
}
