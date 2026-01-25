import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import { type ReactNode } from 'react';

export function ProtectedRoute({ children }: { children: ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="animate-spin">
                <div className="h-12 w-12 rounded-full border-4 border-brand-primary border-t-transparent"></div>
            </div>
        </div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
