// / <reference types="vite/client" />

// replace string with all the types of modals that exist in the modals directory
interface Modal {
	type:
		| 'off'
		| 'CycleStartForm'
		| 'TaskCreationForm'
		| 'TaskEditForm'
		| 'Settings';
	extraData?: {
		cycleId?: string;
		taskId?: string;
		tasks?: Task[];
		setTasks?: React.Dispatch<React.SetStateAction<Task[]>>;
		setCycleId?: React.Dispatch<React.SetStateAction<string | null>>;
	};
}

type priority = 'very high' | 'high' | 'medium' | 'low' | 'very low';

interface Task {
	id: string;
	title: string;
	description: string;
	completion: number;
	priority: priority;
}

interface Toast {
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
