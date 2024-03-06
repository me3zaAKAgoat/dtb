// / <reference types="vite/client" />

// replace string with all the types of modals that exist in the modals directory
type Modal = 'off' | string;

interface Task {
	id: string;
	title: string;
	description: string;
	completion: number;
	priority: number;
}

interface Alert {
	type: 'error' | 'success' | 'info';
	message: string;
}

interface User {
	token: string | null;
	userInfo: {
		id: string;
		avatar: string;
		[key: string]: string;
	};
	expiryDate: string | null;
}

interface AuthContextType {
	user: User | null;
	login: (user: User) => void;
	logout: () => void;
}
