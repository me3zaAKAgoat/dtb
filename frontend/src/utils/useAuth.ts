import { useState, useEffect, useCallback, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
	token: string | null;
	userInfo: {
		[key: string]: string;
	};
}

interface AuthContextType {
	user: User | null;
	login: (
		token: string,
		userInfo: {
			[key: string]: string;
		},
	) => void;
	logout: () => void;
	isAuthenticated: () => boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
	const [user, setUser] = useState<User | null>(null);
	const navigate = useNavigate();

	const login = useCallback(
		(
			token: string,
			userInfo: {
				[key: string]: string;
			},
		) => {
			window.localStorage.setItem('token', token);
			window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
			setUser({ token, userInfo });
		},
		[],
	);

	const logout = useCallback(() => {
		window.localStorage.removeItem('token');
		window.localStorage.removeItem('userInfo');
		window.localStorage.removeItem('expiryDate');
		setUser(null);
		navigate('/login');
	}, [navigate]);

	const isAuthenticated = useCallback(() => {
		const token = window.localStorage.getItem('token');
		const userInfo = JSON.parse(
			window.localStorage.getItem('userInfo') || '{}',
		);
		return !!token && !!userInfo;
	}, []);

	useEffect(() => {
		if (!isAuthenticated()) {
			logout();
		}
	}, [user, isAuthenticated, logout]);

	return { user, login, logout, isAuthenticated };
};
