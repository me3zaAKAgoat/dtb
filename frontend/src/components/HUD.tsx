import { calcTotal } from '../utils/taskUtil';
import { deleteCycle } from '../services/cycle';
import { useContext } from 'react';
import { AuthContext } from '../utils/useAuth';
import { ToastContext } from '../providers/Toast';
import { ModalContext } from '../providers/Modal';

function HUD({
	tasks,
	cycleId,
	endDate,
	setCycleId,
}: {
	tasks: Task[];
	cycleId: string;
	endDate: string | null;
	setCycleId: React.Dispatch<React.SetStateAction<string | null>>;
}) {
	const { user } = useContext(AuthContext)!;
	const { setToast } = useContext(ToastContext);
	const { setModal } = useContext(ModalContext);

	const handleDelete = async () => {
		try {
			const confirm = window.confirm(
				'Are you sure you want to delete this cycle?',
			);
			if (!confirm) return;
			await deleteCycle(user?.token!, cycleId);
			setCycleId(null);
			setToast({
				message: 'Cycle deleted',
				type: 'success',
			});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="w-[600px] z-10 bg-secondary h-[70%] border-[0.5px] border-tertiary p-2 px-4 flex items-center justify-between">
			<div className="flex">
				<h1 className="flex justify-center items-center font-bold mr-2">
					Completion:
				</h1>
				<div className="completion-circle h-14">
					<div className="outer">
						<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
							<circle
								cx="50%"
								cy="50%"
								r="42.5%"
								style={{
									strokeDasharray: 2 * 42.5 * 3.14,
									strokeDashoffset:
										2 * 42.5 * 3.14 * (1 - calcTotal(tasks) / 100),
								}}
							/>
						</svg>
						<div className="inner">{calcTotal(tasks)}%</div>
					</div>
				</div>
			</div>
			<div className="flex">
				<h1 className="flex justify-center items-center font-bold mr-2">
					Time left:
				</h1>
				<h1 className="flex justify-center items-center font-bold">
					{endDate
						? ` ${Math.floor(
								(new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
						  )} Days ${Math.floor(
								((new Date(endDate).getTime() - new Date().getTime()) % (1000 * 60 * 60 * 24)) /
									(1000 * 60 * 60),
						  )} Hours`
						: ' - Days - Hours'}
				</h1>
			</div>
			<div className="flex">
				<button
					onClick={() => {
						setModal({
							type: 'CycleEndForm',
							extraData: {
								cycleId,
								setCycleId,
							},
						});
					}}
					className="transition-all hover:brightness-125 border border-primary-content rounded ml-2 bg-accent h-8 w-8 flex items-center justify-center"
				>
					<svg
						className="fill-primary-content"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						width="16"
						height="16"
					>
						<path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm1.5 0a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm10.28-1.72-4.5 4.5a.75.75 0 0 1-1.06 0l-2-2a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018l1.47 1.47 3.97-3.97a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042Z"></path>
					</svg>
				</button>
				<button
					onClick={handleDelete}
					className="transition-all hover:brightness-125 border border-primary-content rounded ml-2 bg-error h-8 w-8 flex items-center justify-center"
				>
					<svg
						className="fill-primary-content"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 12 12"
						width="12"
						height="12"
					>
						<path d="M2.22 2.22a.749.749 0 0 1 1.06 0L6 4.939 8.72 2.22a.749.749 0 1 1 1.06 1.06L7.061 6 9.78 8.72a.749.749 0 1 1-1.06 1.06L6 7.061 3.28 9.78a.749.749 0 1 1-1.06-1.06L4.939 6 2.22 3.28a.749.749 0 0 1 0-1.06Z"></path>
					</svg>
				</button>
			</div>
		</div>
	);
}

export default HUD;
