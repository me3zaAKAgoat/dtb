import React, { useEffect, useState, useContext } from 'react';
import authApi from '../services/auth';
import { AuthContext } from '../utils/useAuth';
import { useNavigate, Link } from 'react-router-dom';

import Icon from '../assets/dtb';

const Register = () => {
	const { user } = useContext(AuthContext)!;
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [modal, setModal] = useState(false);
	const navigate = useNavigate();

	const handleUsernameChange = (e: React.FormEvent<HTMLInputElement>) => {
		setUsername((e.target as HTMLInputElement).value);
	};

	const handlePasswordChange = (e: React.FormEvent<HTMLElement>) => {
		setPassword((e.target as HTMLInputElement).value);
	};

	const handleConfirmPasswordChange = (e: React.FormEvent<HTMLElement>) => {
		setConfirmPassword((e.target as HTMLInputElement).value);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setError('Passwords do not match.');
			return;
		}
		try {
			setError(null);
			setLoading(true);
			await authApi.register(username, password);
			setLoading(false);
			setModal(true);
		} catch (err: any) {
			console.error(err);
			setError(err.response.data.error);
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, []);

	useEffect(() => {
		if (modal) {
			(document.getElementById('my_modal_2') as HTMLDialogElement).showModal();
		}
	}, [modal]);

	return (
		<div className="base-page register-page flex flex-col items-center justify-center">
			<div className="bg-secondary flex flex-col justify-end items-center w-96 rounded-[7px] border border-solid border-gray-600 overflow-hidden drop-shadow-2xl">
			<a
				className="mt-10 svg-icon mr-1 text-4xl flex items-center gap-2 text-primary-content hover:text-accent transition-all font-semibold"
				href="/"
			>
				<Icon className="fill-primary-content h-[35px] mt-0.5 -mr-1" />
				Dtboard
			</a>
				<form
					className="flex flex-col items-center w-full h-full"
					onSubmit={handleSubmit}
				>
					<div className=" mt-8 flex flex-col items-center justify-center">
						<input
							className="main-input"
							type="text"
							placeholder="Username"
							value={username}
							onChange={handleUsernameChange}
						/>
						<input
							className="main-input"
							type="password"
							placeholder="Password"
							value={password}
							onChange={handlePasswordChange}
						/>
						<input
							className="main-input"
							type="password"
							placeholder="Confirm Password"
							value={confirmPassword}
							onChange={handleConfirmPasswordChange}
						/>
					</div>
					<button className="main-button mt-3" type="submit" disabled={loading}>
						Sign Up
					</button>
				</form>
				<Link className="m-2 hover:underline text-stone-500  font-semibold" to="/login">
					Already have an account? Log in here.
				</Link>
				<div
					className={`flex flex-col items-center justify-center h-8 text-primary-content bg-error w-full font-bold text-sm ${
						error === null ? 'bg-transparent' : ''
					}`}
				>
					{error}
				</div>

				{/* Open the modal using document.getElementById('ID').showModal() method */}
				<dialog id="my_modal_2" className="modal bg-[rgba(0,0,0,0.6)]">
					<div className="modal-box p-4 bg-primary border rounded-[6px] flex flex-col">
						<button
							className="btn btn-circle btn-outline self-end min-h-6 h-6 w-6"
							onClick={() => {
								setModal(false);
								navigate('/login');
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-4 w-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
						<p className="font-semibold text-lg px-5 pb-7 pt-4">
							Thank you for signing up! Please log in to continue.
						</p>
					</div>
					<form method="dialog" className="modal-backdrop">
						<button>close</button>
					</form>
				</dialog>
			</div>
		</div>
	);
};

export default Register;
