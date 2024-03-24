import { useState, useContext, useEffect } from 'react';
import authApi from '../services/auth';
import { AuthContext } from '../utils/useAuth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../index.css';

function Login({}) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const { user, login } = useContext(AuthContext)!;
	const navigate = useNavigate();

	useEffect(() => {
		if (user) navigate('/');
	}, [user]);

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			setLoading(true);
			const res = await authApi.login(username, password);

			login({
				token: res.token,
				userInfo: {
					id: res.id,
					avatar: res.avatar,
					username: res.username,
					firstName: res.firstName,
					lastName: res.lastName,
				},
				expiryDate: res.expiryDate,
			});

			setLoading(false);
			navigate('/');
		} catch (err: any) {
			setLoading(false);
			setError(err.response.data.error);
		}
	};

	return (
		<div className="login-page base-page flex flex-col items-center justify-center">
			<div className="bg-secondary flex flex-col justify-end items-center w-96 h-96 rounded-[7px] border border-solid border-gray-600 overflow-hidden drop-shadow-2xl">
				<Link
					className="m-8 mt-10 hover:underline  font-semibold"
					to="/register"
				>
					Don't have an account? Sign Up here.
				</Link>
				<form
					className="flex flex-col justify-between items-center h-4/5"
					onSubmit={handleLogin}
				>
					<div className="mt-8 flex flex-col items-center justify-center">
						<input
							className="main-input"
							type="text"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<input
							className="main-input"
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button className="main-button mb-4" type="submit" disabled={loading}>
						{loading ? 'Loading...' : 'Log In'}
					</button>
				</form>
				<div
					className={`flex flex-col items-center justify-center h-6 text-primary-content bg-error w-full font-bold text-sm ${
						error === null ? 'invisible' : ''
					}`}
				>
					{error}
				</div>
			</div>
		</div>
	);
}

export default Login;
