import { useState, useEffect, useCallback, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
	token: string | null;
	userInfo: {
		[key: string]: string;
	};
	expiryDate: string | null;
}

interface AuthContextType {
	user: User | null;
	login: (
		token: string,
		userInfo: {
			[key: string]: string;
		},
		expiryDate: string,
	) => void;
	logout: () => void;
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
			expiryDate: string,
		) => {
			window.localStorage.setItem('token', token);
			window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
			window.localStorage.setItem('expiryDate', expiryDate);
			setUser({ token, userInfo, expiryDate });
		},
		[],
	);

	const logout = useCallback(() => {
		window.localStorage.removeItem('token');
		window.localStorage.removeItem('userInfo');
		window.localStorage.removeItem('expiryDate');
		setUser(null);
		if (window.location.pathname !== '/register') navigate('/login');
	}, [navigate]);

	useEffect(() => {
		const authMount = () => {
			const token = window.localStorage.getItem('token');
			const userInfo = JSON.parse(
				window.localStorage.getItem('userInfo') || '{}',
			);
			const expiryDate = window.localStorage.getItem('expiryDate');
			if (
				!!token &&
				!!userInfo &&
				!!expiryDate &&
				new Date(expiryDate) > new Date()
			)
				setUser({ token, userInfo, expiryDate });
			else logout();
		};
		authMount();
	}, [logout]);

	return { user, login, logout };
};
