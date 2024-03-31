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
				console.error(err);
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
				color={[137, 87, 229, 0.5]}
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
			setToast({ message: 'Password updated', type: 'success' });
		} catch (err: any) {
			setToast({ message: err.response.data.error, type: 'error' });
		}
	};

	return (
		<div className="text-primary-content flex flex-col justify-between pb-2 px-12">
			<div className="flex items-center justify-center">
				<h1 className="mb-5 mt-2 flex items-center justify-center font-semibold text-xl w-full">
					<svg className="mr-1 mt-0.5 fill-primary-content" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="17" height="17"><path d="M8 0a8.2 8.2 0 0 1 .701.031C9.444.095 9.99.645 10.16 1.29l.288 1.107c.018.066.079.158.212.224.231.114.454.243.668.386.123.082.233.09.299.071l1.103-.303c.644-.176 1.392.021 1.82.63.27.385.506.792.704 1.218.315.675.111 1.422-.364 1.891l-.814.806c-.049.048-.098.147-.088.294.016.257.016.515 0 .772-.01.147.038.246.088.294l.814.806c.475.469.679 1.216.364 1.891a7.977 7.977 0 0 1-.704 1.217c-.428.61-1.176.807-1.82.63l-1.102-.302c-.067-.019-.177-.011-.3.071a5.909 5.909 0 0 1-.668.386c-.133.066-.194.158-.211.224l-.29 1.106c-.168.646-.715 1.196-1.458 1.26a8.006 8.006 0 0 1-1.402 0c-.743-.064-1.289-.614-1.458-1.26l-.289-1.106c-.018-.066-.079-.158-.212-.224a5.738 5.738 0 0 1-.668-.386c-.123-.082-.233-.09-.299-.071l-1.103.303c-.644.176-1.392-.021-1.82-.63a8.12 8.12 0 0 1-.704-1.218c-.315-.675-.111-1.422.363-1.891l.815-.806c.05-.048.098-.147.088-.294a6.214 6.214 0 0 1 0-.772c.01-.147-.038-.246-.088-.294l-.815-.806C.635 6.045.431 5.298.746 4.623a7.92 7.92 0 0 1 .704-1.217c.428-.61 1.176-.807 1.82-.63l1.102.302c.067.019.177.011.3-.071.214-.143.437-.272.668-.386.133-.066.194-.158.211-.224l.29-1.106C6.009.645 6.556.095 7.299.03 7.53.01 7.764 0 8 0Zm-.571 1.525c-.036.003-.108.036-.137.146l-.289 1.105c-.147.561-.549.967-.998 1.189-.173.086-.34.183-.5.29-.417.278-.97.423-1.529.27l-1.103-.303c-.109-.03-.175.016-.195.045-.22.312-.412.644-.573.99-.014.031-.021.11.059.19l.815.806c.411.406.562.957.53 1.456a4.709 4.709 0 0 0 0 .582c.032.499-.119 1.05-.53 1.456l-.815.806c-.081.08-.073.159-.059.19.162.346.353.677.573.989.02.03.085.076.195.046l1.102-.303c.56-.153 1.113-.008 1.53.27.161.107.328.204.501.29.447.222.85.629.997 1.189l.289 1.105c.029.109.101.143.137.146a6.6 6.6 0 0 0 1.142 0c.036-.003.108-.036.137-.146l.289-1.105c.147-.561.549-.967.998-1.189.173-.086.34-.183.5-.29.417-.278.97-.423 1.529-.27l1.103.303c.109.029.175-.016.195-.045.22-.313.411-.644.573-.99.014-.031.021-.11-.059-.19l-.815-.806c-.411-.406-.562-.957-.53-1.456a4.709 4.709 0 0 0 0-.582c-.032-.499.119-1.05.53-1.456l.815-.806c.081-.08.073-.159.059-.19a6.464 6.464 0 0 0-.573-.989c-.02-.03-.085-.076-.195-.046l-1.102.303c-.56.153-1.113.008-1.53-.27a4.44 4.44 0 0 0-.501-.29c-.447-.222-.85-.629-.997-1.189l-.289-1.105c-.029-.11-.101-.143-.137-.146a6.6 6.6 0 0 0-1.142 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM9.5 8a1.5 1.5 0 1 0-3.001.001A1.5 1.5 0 0 0 9.5 8Z"></path></svg>Settings
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
									placeholder="old password"
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
