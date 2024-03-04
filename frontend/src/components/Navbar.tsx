import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../utils/useAuth';
import { useNavigate, Link } from 'react-router-dom';

const ProfileButton = ({
	user,
	logout,
}: {
	user: User;
	logout: () => void;
}) => {
	const [menuOpen, setMenuOpen] = useState<boolean>(false);

	const handleDropdownBlur = (e: React.FocusEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (!e.currentTarget.contains(e.relatedTarget)) {
			setMenuOpen(false);
		}
	};

	// tabIndex makes it so the div has focus and blur events and the -1 makes it not accessible by keyboard
	return (
		<div
			className="w-full flex justify-center items-center relative m-2"
			onBlur={(event) => handleDropdownBlur(event)}
			tabIndex={-1}
		>
			<button
				onClick={(event) => {
					event.preventDefault();
					setMenuOpen(!menuOpen);
				}}
			>
				<div className="avatar w-10">
					<div className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
						<img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
					</div>
				</div>
			</button>
			<DropdownContainer menuOpen={menuOpen} logout={logout} />
		</div>
	);
};

const DropdownContainer = ({
	menuOpen,
	logout,
}: {
	menuOpen: boolean;
	logout: () => void;
}) => {
	const [transitionProperties, setTransitionProperties] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		if (menuOpen) {
			setTimeout(() => {
				setTransitionProperties({ opacity: 1, visibility: 'visible' });
			}, 1);
		} else {
			setTransitionProperties({});
		}
	}, [menuOpen]);

	if (menuOpen) {
		return (
			<div
				className="bg-secondary border-[1px] border-tertiary absolute bottom-2 left-16 ml-1 w-28 h-32 flex flex-col justify-center items-center"
				style={transitionProperties}
			>
				<button
					className="mb-2"
					onClick={() => {
						navigate('/settings');
					}}
				>
					Settings
				</button>
				<div className="w-[70%] mx-0.5 mt-1.5 mb-1.5 h-[1px] bg-tertiary"></div>
				<button
					className="mt-2"
					onClick={() => {
						logout();
					}}
				>
					Log out
				</button>
			</div>
		);
	} else {
		return <></>;
	}
};

const Navbar = ({}) => {
	const { user, logout } = useContext(AuthContext)!;

	return (
		<nav className="h-screen w-16 self-start flex flex-col justify-between items-center border-r-[1px] border-r-tertiary">
			<div className="flex flex-col items-center">
				<Link to="." className="">
					<img src="/dtb.svg" alt="logo" className="p-[10px]" />
				</Link>
				<div className="w-[70%] mx-0.5 mt-1.5 mb-1.5 h-[2px] bg-tertiary flex-grow"></div>
			</div>
			<div className="h-full w-full flex flex-col justify-between items-center">
				<ul className="">
					<li className="">
						<Link className="m-2" to="/home">
							<svg
								className="w-[40px] h-[40px] text-gray-800 dark:text-primary-content"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.7"
									d="m4 12 8-8 8 8M6 10.5V19c0 .6.4 1 1 1h3v-3c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v3h3c.6 0 1-.4 1-1v-8.5"
								/>
							</svg>
						</Link>
					</li>
					<li className="">
						<Link className="m-2" to="/dashboard">
							<svg
								className="w-[40px] h-[40px] text-gray-800 dark:text-primary-content"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.7"
									d="M4 4v15c0 .6.4 1 1 1h15M8 16l2.5-5.5 3 3L17.3 7 20 9.7"
								/>
							</svg>
						</Link>
					</li>
				</ul>
				<ProfileButton user={user!} logout={logout} />
			</div>
		</nav>
	);
};

export default Navbar;