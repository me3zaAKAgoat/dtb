import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../utils/useAuth';
import { ModalContext } from '../providers/Modal';
import Icon from '../assets/dtb';

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
			<div className="bg-secondary border-[1px] border-tertiary absolute bottom-2 left-16 ml-1 w-36 h-40 flex flex-col gap-5 justify-center items-center">
				<button
					className="flex items-center mt-2 hover:filter hover:brightness-125 transition-all font-semibold"
					onClick={() => {
						setModal({ type: 'Settings' });
						setMenuOpen(false);
					}}
				>
					<svg className="mr-1 mt-1 fill-primary-content" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="14" height="14"><path d="M8 0a8.2 8.2 0 0 1 .701.031C9.444.095 9.99.645 10.16 1.29l.288 1.107c.018.066.079.158.212.224.231.114.454.243.668.386.123.082.233.09.299.071l1.103-.303c.644-.176 1.392.021 1.82.63.27.385.506.792.704 1.218.315.675.111 1.422-.364 1.891l-.814.806c-.049.048-.098.147-.088.294.016.257.016.515 0 .772-.01.147.038.246.088.294l.814.806c.475.469.679 1.216.364 1.891a7.977 7.977 0 0 1-.704 1.217c-.428.61-1.176.807-1.82.63l-1.102-.302c-.067-.019-.177-.011-.3.071a5.909 5.909 0 0 1-.668.386c-.133.066-.194.158-.211.224l-.29 1.106c-.168.646-.715 1.196-1.458 1.26a8.006 8.006 0 0 1-1.402 0c-.743-.064-1.289-.614-1.458-1.26l-.289-1.106c-.018-.066-.079-.158-.212-.224a5.738 5.738 0 0 1-.668-.386c-.123-.082-.233-.09-.299-.071l-1.103.303c-.644.176-1.392-.021-1.82-.63a8.12 8.12 0 0 1-.704-1.218c-.315-.675-.111-1.422.363-1.891l.815-.806c.05-.048.098-.147.088-.294a6.214 6.214 0 0 1 0-.772c.01-.147-.038-.246-.088-.294l-.815-.806C.635 6.045.431 5.298.746 4.623a7.92 7.92 0 0 1 .704-1.217c.428-.61 1.176-.807 1.82-.63l1.102.302c.067.019.177.011.3-.071.214-.143.437-.272.668-.386.133-.066.194-.158.211-.224l.29-1.106C6.009.645 6.556.095 7.299.03 7.53.01 7.764 0 8 0Zm-.571 1.525c-.036.003-.108.036-.137.146l-.289 1.105c-.147.561-.549.967-.998 1.189-.173.086-.34.183-.5.29-.417.278-.97.423-1.529.27l-1.103-.303c-.109-.03-.175.016-.195.045-.22.312-.412.644-.573.99-.014.031-.021.11.059.19l.815.806c.411.406.562.957.53 1.456a4.709 4.709 0 0 0 0 .582c.032.499-.119 1.05-.53 1.456l-.815.806c-.081.08-.073.159-.059.19.162.346.353.677.573.989.02.03.085.076.195.046l1.102-.303c.56-.153 1.113-.008 1.53.27.161.107.328.204.501.29.447.222.85.629.997 1.189l.289 1.105c.029.109.101.143.137.146a6.6 6.6 0 0 0 1.142 0c.036-.003.108-.036.137-.146l.289-1.105c.147-.561.549-.967.998-1.189.173-.086.34-.183.5-.29.417-.278.97-.423 1.529-.27l1.103.303c.109.029.175-.016.195-.045.22-.313.411-.644.573-.99.014-.031.021-.11-.059-.19l-.815-.806c-.411-.406-.562-.957-.53-1.456a4.709 4.709 0 0 0 0-.582c-.032-.499.119-1.05.53-1.456l.815-.806c.081-.08.073-.159.059-.19a6.464 6.464 0 0 0-.573-.989c-.02-.03-.085-.076-.195-.046l-1.102.303c-.56.153-1.113.008-1.53-.27a4.44 4.44 0 0 0-.501-.29c-.447-.222-.85-.629-.997-1.189l-.289-1.105c-.029-.11-.101-.143-.137-.146a6.6 6.6 0 0 0-1.142 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM9.5 8a1.5 1.5 0 1 0-3.001.001A1.5 1.5 0 0 0 9.5 8Z"></path></svg>
					Settings
				</button>
				<div className="w-[70%] mx-0.5 h-[1px] bg-tertiary"></div>
				<button
					className="flex items-center hover:filter hover:brightness-125 transition-all font-semibold"
					onClick={() => {
						logout();
					}}
				>
					<svg className="mr-1 mt-1 fill-primary-content" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="14" height="14"><path d="M2 2.75C2 1.784 2.784 1 3.75 1h2.5a.75.75 0 0 1 0 1.5h-2.5a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h2.5a.75.75 0 0 1 0 1.5h-2.5A1.75 1.75 0 0 1 2 13.25Zm10.44 4.5-1.97-1.97a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734l1.97-1.97H6.75a.75.75 0 0 1 0-1.5Z"></path></svg>
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
		<nav className="flex-grow-0 flex-shrink-0 custom-navbar h-screen w-16 self-start flex flex-col justify-between items-center border-r-[3px] border-r-tertiary">
			<div className="flex flex-col items-center">
				<Link to="." className="h-11 mx-auto my-3">
					<Icon className="fill-primary-content h-full" />
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
