import { createContext, useState, useContext } from 'react';

export const UserContext = createContext(null);

export function UserContextProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);

	const login = (userData) => {
		setUser(userData);
	};

	const logout = () => {
		setUser(null);
	};

	const contextValue = {
		user,
		setUser,
		loading,
		setLoading,
		login,
		logout
	};

	return (
		<UserContext.Provider value={contextValue}>
			{children}
		</UserContext.Provider>
	);
}

// Custom hook to use the UserContext
export function useUserContext() {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error('useUserContext must be used within a UserContextProvider');
	}
	return context;
}