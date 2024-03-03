import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:3003/api/auth',
});

api.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		if (error.response.status === 401 || error.response.status === 403) {
			window.dispatchEvent(new CustomEvent('logOut')); // change this by changing route of app to special logout route
		}
		return Promise.reject(error);
	},
);

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
