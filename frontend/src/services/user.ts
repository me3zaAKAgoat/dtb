import createApiInstance from './interceptors';

const api = createApiInstance('/api/user');

export const updateFirstLastName = async (
	token: string,
	firstName: string,
	lastName: string,
) => {
	const response = await api.put(
		'/information/fistname-lastname',
		{ firstName, lastName },
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);
	return response.data;
};

export const updatePassword = async (
	token: string,
	oldPassword: string,
	newPassword: string,
) => {
	const response = await api.put(
		'/information/password',
		{ oldPassword, newPassword },
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);
	return response.data;
};

export const updateAvatar = async (token: string, avatar: File) => {
	const formData = new FormData();
	formData.append('avatar', avatar);
	const response = await api.put('/information/avatar', formData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
}