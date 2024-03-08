import createApiInstance from './interceptors';

const api = createApiInstance('http://localhost:3003/api/cycle');

export const startCycle = async (token: string, cycleEndDate: string) => {
	const response = await api.post(
		'/new',
		{ endDate: cycleEndDate },
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);
	return response.data;
};

export const getCurrentCycle = async (token: string) => {
	const response = await api.get('/current', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};

export const getCycleNotes = async (token: string, cycleId: string) => {
	const response = await api.get(`/notes/${cycleId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};

export const deleteCycle = async (token: string, cycleId: string) => {
	const response = await api.delete(`/${cycleId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};

export const updateCycleNotes = async (
	token: string,
	cycleId: string,
	notes: string,
) => {
	const response = await api.put(
		`/notes/${cycleId}`,
		{ notes },
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);
	return response.data;
};
