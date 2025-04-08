import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../../cfg/store/AuthStore';
const AuthGuard = ({ requireAdmin = false }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to="/auth/login" replace />;
	}

	if (requireAdmin && user?.role !== 'admin') {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};

export default AuthGuard;