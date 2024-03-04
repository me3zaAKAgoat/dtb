import createApiInstance from './interceptors';

const api = createApiInstance('http://localhost:3003/api/auth');

const login = async (email: string, password: string) => {
	const res = await api.post('/login', { email, password });
	return res.data;
};

const register = async (
	username: string,
	firstName: string,
	lastName: string,
	email: string,
	password: string,
) => {
	const res = await api.post('/signup', {
		username,
		firstName,
		lastName,
		email,
		password,
	});
	return res.data;
};

export default { login, register };
