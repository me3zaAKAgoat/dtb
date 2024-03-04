import axios from 'axios';

const createApiInstance = (baseURL: string) => {
	const api = axios.create({
		baseURL: baseURL,
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

	return api;
};

export default createApiInstance;
