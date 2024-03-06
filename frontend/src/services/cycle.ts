import createApiInstance from './interceptors';

const api = createApiInstance('http://localhost:3003/api/cycle');

export const startCycle = async (token: string, cycleEndDate: string) => {
	const response = await api.post(
		'/new',
		{ cycleEndDate },
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
