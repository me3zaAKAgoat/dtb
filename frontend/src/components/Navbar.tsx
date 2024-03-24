import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../utils/useAuth';
import { ModalContext } from '../providers/Modal';

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
					<div
						className={
							menuOpen ? `rounded-full active-profile-button` : `rounded-full`
						}
					>
						<img src={user.userInfo.avatar} alt="avatar" />
					</div>
				</div>
			</button>
			<DropdownContainer
				menuOpen={menuOpen}
				setMenuOpen={setMenuOpen}
				logout={logout}
			/>
		</div>
	);
};

const DropdownContainer = ({
	menuOpen,
	setMenuOpen,
	logout,
}: {
	menuOpen: boolean;
	setMenuOpen: (value: boolean) => void;
	logout: () => void;
}) => {
	const { setModal } = useContext(ModalContext);

	if (menuOpen) {
		return (
			<div className="bg-secondary border-[1px] border-tertiary absolute bottom-2 left-16 ml-1 w-36 h-40 flex flex-col justify-center items-center">
				<button
					className="mb-2 hover:filter hover:brightness-125 transition-all font-semibold"
					onClick={() => {
						setModal({ type: 'Settings' });
						setMenuOpen(false);
					}}
				>
					Settings
				</button>
				<div className="w-[70%] mx-0.5 mt-1.5 mb-1.5 h-[1px] bg-tertiary"></div>
				<button
					className="mt-2 hover:filter hover:brightness-125 transition-all font-semibold"
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
		<nav className="flex-grow-0 flex-shrink-0 custom-navbar h-screen w-16 self-start flex flex-col justify-between items-center border-r-[1px] border-r-tertiary">
			<div className="flex flex-col items-center">
				<Link to="." className="">
					<img src="/dtb.svg" alt="logo" className="p-[10px]" />
				</Link>
				<div className="w-[70%] mx-0.5 mt-1.5 mb-1.5 h-[2px] bg-tertiary flex-grow"></div>
			</div>
			<div className="h-full w-full flex flex-col justify-between items-center">
				<ul className="w-full flex flex-col items-center">
					<li className="h-20">
						<div
							className="tooltip hover:tooltip-open tooltip-right"
							data-tip="home"
						>
							<Link className="m-2" to="/home">
								<svg
									className="fill-primary-content"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 16 16"
									width="26"
									height="26"
								>
									<path d="M6.906.664a1.749 1.749 0 0 1 2.187 0l5.25 4.2c.415.332.657.835.657 1.367v7.019A1.75 1.75 0 0 1 13.25 15h-3.5a.75.75 0 0 1-.75-.75V9H7v5.25a.75.75 0 0 1-.75.75h-3.5A1.75 1.75 0 0 1 1 13.25V6.23c0-.531.242-1.034.657-1.366l5.25-4.2Zm1.25 1.171a.25.25 0 0 0-.312 0l-5.25 4.2a.25.25 0 0 0-.094.196v7.019c0 .138.112.25.25.25H5.5V8.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 .75.75v5.25h2.75a.25.25 0 0 0 .25-.25V6.23a.25.25 0 0 0-.094-.195Z"></path>
								</svg>
							</Link>
						</div>
					</li>
					<li className="h-20">
						<div
							className="tooltip hover:tooltip-open tooltip-right"
							data-tip="dashboard"
						>
							<Link className="m-2" to="/dashboard">
								<svg
									className="fill-primary-content"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 16 16"
									width="26"
									height="26"
								>
									<path d="M1.5 1.75V13.5h13.75a.75.75 0 0 1 0 1.5H.75a.75.75 0 0 1-.75-.75V1.75a.75.75 0 0 1 1.5 0Zm14.28 2.53-5.25 5.25a.75.75 0 0 1-1.06 0L7 7.06 4.28 9.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.25-3.25a.75.75 0 0 1 1.06 0L10 7.94l4.72-4.72a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042Z"></path>
								</svg>
							</Link>
						</div>
					</li>
					<li className="h-20">
						<div
							className="tooltip hover:tooltip-open tooltip-right"
							data-tip="about"
						>
							<a
								className="m-2"
								href="https://www.me3za.tech/posts/dtb/"
								target="_blank"
							>
								<svg
									className="fill-primary-content"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 16 16"
									width="26"
									height="26"
								>
									<path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path>
								</svg>
							</a>
						</div>
					</li>
				</ul>
				<ProfileButton user={user!} logout={logout} />
			</div>
		</nav>
	);
};

export default Navbar;
