import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useAuthStore from '../../cfg/store/AuthStore';
const AuthGuard = ({ requireAdmin = false }) => {
	const { isAuthenticated, user } = useAuthStore();
	const navigate = useNavigate();
	if (!isAuthenticated) {
		navigate('/auth/login', { replace: true });
	}

	if (requireAdmin && user?.role !== 'admin') {
		navigate("/", { replace: true });
	}

	return <Outlet />;
};

export default AuthGuard;