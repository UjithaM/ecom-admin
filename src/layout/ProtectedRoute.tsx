import React from 'react';
import { Navigate } from 'react-router-dom';
import {useAuth} from "@/components/AuthProvider.tsx";
import LoadingScreen from "@/components/loading-screen.tsx";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user, loading } = useAuth();

    console.log(user);

    if (loading) {
        return <LoadingScreen />;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;