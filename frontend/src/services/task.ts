import createApiInstance from './interceptors';

const api = createApiInstance('http://localhost:3003/api/task');

export const getCycleTasks = async (token: string, cycleId: string) => {
	const response = await api.get(`/cycle/${cycleId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};

export const createTask = async (
	token: string,
	cycleId: string,
	task: {
		title: string;
		description: string;
		priority: string;
	},
) => {
	const response = await api.post(`/${cycleId}`, task, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};

export const updateTask = async (
	token: string,
	taskId: string,
	task: {
		title: string;
		description: string;
		priority: string;
		completion: number;
	},
) => {
	const response = await api.put(`/${taskId}`, task, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};


export const deleteTask = async (token: string, taskId: string) => {
	const response = await api.delete(`/${taskId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
}
