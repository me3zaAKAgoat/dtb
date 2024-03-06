import React, { useEffect, useState, useContext } from 'react';
import authApi from '../services/auth';
import { AuthContext } from '../utils/useAuth';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
	const { user } = useContext(AuthContext)!;
	const [username, setUsername] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [modal, setModal] = useState(false);
	const navigate = useNavigate();

	const handleFirstNameChange = (e: React.FormEvent<HTMLInputElement>) => {
		setFirstName((e.target as HTMLInputElement).value);
	};

	const handleLastNameChange = (e: React.FormEvent<HTMLInputElement>) => {
		setLastName((e.target as HTMLInputElement).value);
	};

	const handleUsernameChange = (e: React.FormEvent<HTMLInputElement>) => {
		setUsername((e.target as HTMLInputElement).value);
	};

	const handleEmailChange = (e: React.FormEvent<HTMLElement>) => {
		setEmail((e.target as HTMLInputElement).value);
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
			await authApi.register(username, firstName, lastName, email, password);
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
			<div className="bg-secondary flex flex-col justify-end items-center w-auto h-auto rounded-[7px] border border-solid border-tertiary overflow-hidden drop-shadow-2xl">
				<Link className="m-6 hover:underline font-semibold" to="/login">
					Already have an account? Log in here.
				</Link>
				<form
					className="flex flex-col justify-between items-center"
					onSubmit={handleSubmit}
				>
					<div className="flex items-start justify-between mx-8">
						<div className="m-10 flex flex-col justify-start">
							<input
								className="main-input"
								type="text"
								placeholder="Username"
								value={username}
								onChange={handleUsernameChange}
							/>
							<input
								className="main-input"
								type="text"
								placeholder="First Name"
								value={firstName}
								onChange={handleFirstNameChange}
							/>
							<input
								className="main-input"
								type="text"
								placeholder="Last Name"
								value={lastName}
								onChange={handleLastNameChange}
							/>
							<input
								className="main-input"
								type="text"
								placeholder="Email"
								value={email}
								onChange={handleEmailChange}
							/>
						</div>
						<div className="m-10 flex flex-col">
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
					</div>
					<button className="main-button" type="submit" disabled={loading}>
						Sign Up
					</button>
				</form>
				<div
					className={`mt-6 flex flex-col items-center justify-center h-6 text-textColor bg-error w-full font-bold text-sm ${
						error === null ? 'invisible' : ''
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
							Thank you for signing up! Please check your email to verify your
							account.
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
