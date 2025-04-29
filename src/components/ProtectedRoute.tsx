
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  requireAuth?: boolean;
  allowedRoles?: Array<"admin" | "manager" | "employee">;
}

const ProtectedRoute = ({ 
  requireAuth = true,
  allowedRoles = ["admin", "manager", "employee"]
}: ProtectedRouteProps) => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const location = useLocation();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ml-primary"></div>
      </div>
    );
  }

  // If authentication is required and user is not authenticated, redirect to login
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is authenticated but not in allowed roles, redirect to dashboard
  if (requireAuth && isAuthenticated && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  // If authenticated but trying to access login/register pages, redirect to dashboard
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // If all checks pass, render the children
  return <Outlet />;
};

export default ProtectedRoute;
