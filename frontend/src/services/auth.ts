import createApiInstance from './interceptors';

const api = createApiInstance('/api/auth');

const login = async (username: string, password: string) => {
	const res = await api.post('/login', { username, password });
	return res.data;
};

const register = async (
	username: string,
	password: string,
) => {
	const res = await api.post('/signup', {
		username,
		password,
	});
	return res.data;
};

export default { login, register };
