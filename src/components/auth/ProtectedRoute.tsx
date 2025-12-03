import { Navigate, useLocation } from 'react-router-dom';
import { useSupabaseAuth } from '../../hooks/useSupabaseAuth';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user, loading } = useSupabaseAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-mint"></div>
            </div>
        );
    }

    if (!user) {
        // Redirect to extras page, but save the location they were trying to go to
        return <Navigate to="/extras" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
