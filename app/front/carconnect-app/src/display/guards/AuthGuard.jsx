import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useAuthStore from '../../cfg/store/AuthStore';

const AuthGuard = ({ requireAdmin = false }) => {
    const { isAuthenticated, user, errorPop } = useAuthStore();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!isAuthenticated) {
            errorPop("Vous devez vous connecter pour accéder à cette page");
            navigate('/auth/login', { replace: true });
            return;
        }
        
        if (requireAdmin && user?.role !== 'admin') {
            errorPop("Vous n'avez pas les droits d'accès pour cette page");
            navigate("/", { replace: true });
            return;
        }
    }, [isAuthenticated, user, navigate, errorPop, requireAdmin]);
    
    if (!isAuthenticated || (requireAdmin && user?.role !== 'admin')) {
        return null;
    }

    return <Outlet />;
};

export default AuthGuard;