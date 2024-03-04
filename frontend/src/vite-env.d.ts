// / <reference types="vite/client" />

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
