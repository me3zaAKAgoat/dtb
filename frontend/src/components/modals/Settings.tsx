import { useContext, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { ToastContext } from '../../providers/Toast';
import { AuthContext } from '../../utils/useAuth';
import { updatePassword } from '../../services/user';
import { updateAvatar } from '../../services/user';

function Avatar() {
	const { user, setUser } = useContext(AuthContext)!;
	const [image, setImage] = useState<File | string>(user?.userInfo.avatar!);
	const editor = useRef<AvatarEditor>(null);
	const { setToast } = useContext(ToastContext);
	const [zoom, setZoom] = useState(1);

	const handleSave = async () => {
		if (editor.current && image) {
			const canvas = editor.current.getImageScaledToCanvas();
			const file = new File([canvas.toDataURL()], 'avatar.png', {
				type: 'image/png',
			});
			try {
				const res = await updateAvatar(user!.token!, file);
				setUser({
					...user!,
					userInfo: { ...user!.userInfo, avatar: res.avatar },
				});
				setToast({ message: 'Avatar updated', type: 'success' });
				window.localStorage.setItem(
					'userInfo',
					JSON.stringify({ ...user!.userInfo, avatar: res.avatar }),
				);
			} catch (err: any) {
				console.log(err);
				setToast({ message: err.response.data.error, type: 'error' });
			}
		} else setToast({ message: 'No image selected', type: 'error' });
	};

	return (
		<div className="flex flex-col items-stretch gap-2">
			<AvatarEditor
				className="m-auto"
				ref={editor}
				image={image}
				width={200}
				height={200}
				border={50}
				color={[255, 255, 255, 0.5]}
				borderRadius={200}
				scale={zoom}
				rotate={0}
			/>
			<input
				type="range"
				min="1"
				max="2"
				step="0.01"
				value={zoom}
				onChange={(e) => setZoom(parseFloat(e.target.value))}
			/>
			<input
				type="file"
				accept="image/*"
				onChange={(e) => setImage(e.target.files?.[0]!)}
			/>
			<button
				type="submit"
				className="w-36 font-semibold h-10 transition-all focus:border-primary-content my-2 border border-tertiary bg-accent hover:bg-primary px-4 rounded-[4px] text-primary-content"
				onClick={handleSave}
			>
				Save changes
			</button>
		</div>
	);
}

function SettingsModal() {
	const { setToast } = useContext(ToastContext);
	const { user } = useContext(AuthContext)!;
	const [username, setUsername] = useState('');
	const [oldPassword, setOldPassword] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (password === '' || oldPassword === '' || confirmPassword === '') {
			setToast({ message: 'All fields are required', type: 'error' });
			return;
		}
		if (password !== confirmPassword) {
			setToast({ message: 'Passwords do not match', type: 'error' });
			return;
		}
		try {
			await updatePassword(user!.token!, oldPassword, password);
		} catch (err: any) {
			setToast({ message: err.response.data.error, type: 'error' });
		}
	};

	return (
		<div className="text-primary-content flex flex-col justify-between pb-2">
			<div className="flex items-center justify-center">
				<h1 className="mb-5 mt-2 flex items-center justify-center font-semibold text-xl w-full">
					Settings
				</h1>
			</div>
			<div className="mt-2">
				<div className="flex gap-16">
					<div>
						<form className="w-full flex flex-col items-stretch">
							<label htmlFor="username" className="font-semibold">
								Username:
							</label>
							<div className="flex flex-col">
								<input
									placeholder={user?.userInfo.username}
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									type="text"
									name="username"
									id="username"
									className="w-64 transition-all focus:border-primary-content bg-secondary my-2 border border-tertiary rounded-[4px] input input-primary"
									required
								/>
								<button
									type="submit"
									className="w-36 font-semibold h-10 transition-all focus:border-primary-content my-2 border border-tertiary bg-accent hover:bg-primary px-4 rounded-[4px] text-primary-content"
								>
									Save changes
								</button>
							</div>
						</form>
						<form
							onSubmit={handlePasswordSubmit}
							className="w-full flex flex-col items-stretch border-t-2 border-t-tertiary"
						>
							<label htmlFor="password" className="font-semibold">
								Password:
							</label>
							<div className="flex flex-col">
								<input
									value={oldPassword}
									onChange={(e) => setOldPassword(e.target.value)}
									placeholder="Old password"
									type="password"
									name="oldPassword"
									id="oldPassword"
									className="w-64 transition-all focus:border-primary-content bg-secondary my-2 border border-tertiary rounded-[4px] input input-primary"
								/>
								<input
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="new password"
									type="password"
									name="newPassowrd"
									id="newPassowrd"
									className="w-64 transition-all focus:border-primary-content bg-secondary my-2 border border-tertiary rounded-[4px] input input-primary"
								/>
								<input
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									placeholder="confirm new password"
									type="password"
									name="confirmPassword"
									id="confirmPassword"
									className="w-64 transition-all focus:border-primary-content bg-secondary my-2 border border-tertiary rounded-[4px] input input-primary"
								/>
								<button
									type="submit"
									className="w-36 font-semibold h-10 transition-all focus:border-primary-content my-2 border border-tertiary bg-accent hover:bg-primary px-4 rounded-[4px] text-primary-content"
								>
									Save changes
								</button>
							</div>
						</form>
					</div>
					<div>
						<form
							onSubmit={(e) => e.preventDefault()}
							className="w-full flex flex-col items-stretch"
						>
							<label htmlFor="avatar" className="font-semibold">
								Avatar:
							</label>
							<div className="flex justify-between">
								<Avatar />
							</div>
						</form>
					</div>
				</div>
				<a
					className="text-blue-600 hover:underline"
					href="https://github.com/me3zaAKAgoat"
				>
					Contact the creator
				</a>
			</div>
		</div>
	);
}

export default SettingsModal;
