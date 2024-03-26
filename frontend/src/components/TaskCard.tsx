import { useEffect, useState, useContext } from 'react';
import { updateTask } from '../services/task';
import { AuthContext } from '../utils/useAuth';
import { useDebounce } from '../utils/useDebounce';
import { deleteTask } from '../services/task';
import { ToastContext } from '../providers/Toast';
import { ModalContext } from '../providers/Modal';

const priorityColor = {
	'very low': 'border-l-green-700',
	low: 'border-l-green-300',
	medium: 'border-l-slate-300',
	high: 'border-l-red-300',
	'very high': 'border-l-red-700',
};

function TaskCard({
	id,
	tasks,
	setTasks,
}: {
	id: string;
	tasks: Task[];
	setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) {
	const [open, setOpen] = useState(false);
	const { user } = useContext(AuthContext)!;
	const task = tasks.find((task) => task.id === id);
	const completion = useDebounce(task?.completion!, 500);
	const { setToast } = useContext(ToastContext);
	const { setModal } = useContext(ModalContext);

	useEffect(() => {
		if (task) {
			updateTask(user?.token!, id, {
				title: task.title,
				description: task.description,
				completion: task.completion,
				priority: task.priority,
			});
		}
	}, [completion]);

	const handleDelete = async () => {
		const confirm = window.confirm(
			'Are you sure you want to delete this task?',
		);
		if (!confirm) return;
		await deleteTask(user?.token!, id);
		const newTasks = tasks.filter((task) => task.id !== id);
		setTasks(newTasks);
		setToast({
			message: 'Task deleted',
			type: 'success',
		});
	};

	const handleEdit = async () => {
		setModal({
			type: 'TaskEditForm',
			extraData: {
				taskId: id,
				tasks,
				setTasks,
			},
		});
	};

	return (
		<div
			className={`transition-all hover:shadow-lg bg-secondary mb-6 w-full border-[0.5px] border-tertiary overflow-hidden flex flex-col border-l-4 ${
				priorityColor[task?.priority!]
			}`}
		>
			<button className="h-[60px] w-full" onClick={() => setOpen(!open)}>
				<div className="flex justify-start px-5 items-center h-[80%]">
					<div className="flex items-center">
						<h1 className="h-full">{task?.title}</h1>
					</div>
					<div className="h-full flex justify-end ml-auto items-center">
						<button
							onClick={(e) => {
								e.stopPropagation();
								handleEdit();
							}}
							className="hover:brightness-125 border border-primary-content rounded bg-tertiary h-6 w-6 flex items-center justify-center"
						>
							<svg
								className="fill-primary-content"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
								width="16"
								height="16"
							>
								<path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953 1.953-.558a.253.253 0 0 0 .108-.064Zm1.238-3.763a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Z"></path>
							</svg>
						</button>
						<button
							onClick={(e) => {
								e.stopPropagation();
								handleDelete();
							}}
							className="hover:brightness-125 border border-primary-content rounded ml-2 bg-tertiary h-6 w-6 flex items-center justify-center"
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
				<div className={`flex justify-center items-center -mt-4`}>
					<svg
						className={`transition-all ${
							open ? 'fill-transparent' : 'fill-primary-content'
						}`}
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 12 12"
						width="12"
						height="12"
					>
						<path d="M6 8.825c-.2 0-.4-.1-.5-.2l-3.3-3.3c-.3-.3-.3-.8 0-1.1.3-.3.8-.3 1.1 0l2.7 2.7 2.7-2.7c.3-.3.8-.3 1.1 0 .3.3.3.8 0 1.1l-3.2 3.2c-.2.2-.4.3-.6.3Z"></path>
					</svg>
				</div>
			</button>
			<div className="m-auto w-full px-5">
				<div
					className={`w-full task-card flex flex-col justify-start items-start ${
						open ? 'task-card-open' : 'task-card-closed'
					}`}
				>
					<label htmlFor="description" className="text-sm font-normal">
						Description:
					</label>
					<p className="preserve-lines text-xs font-medium my-2 border border-tertiary w-full h-[70%] rounded-lg p-2 overflow-auto">
						{task?.description}
					</p>
					<label htmlFor="completion" className="text-sm font-normal mb-2">
						Completion:
					</label>
					<div className="flex items-center justify-between w-full mb-2 gap-6">
						<input
							className="w-full task-slider"
							type="range"
							min={0}
							max={100}
							value={task?.completion}
							onChange={(event) => {
								const newTasks = tasks.map((task) => {
									if (task.id === id) {
										task.completion = parseInt(event.target.value);
									}
									return task;
								});
								setTasks(newTasks);
							}}
						/>
						<input
							type="number"
							min={0}
							max={100}
							className="w-12 text-xs text-center bg-secondary border border-tertiary rounded-[2px] text-primary-content"
							value={`${task?.completion}`}
							onChange={(event) => {
								const n = parseInt(event.target.value);
								if (Number.isNaN(n)) event.target.value = '0';
								if (n < 0) event.target.value = '0';
								else if (n > 100) event.target.value = '100';

								const newTasks = tasks.map((task) => {
									if (task.id === id) {
										task.completion = parseInt(event.target.value);
									}
									return task;
								});
								setTasks(newTasks);
							}}
						/>
					</div>
				</div>
			</div>
			<div className="w-full flex flex-col justify-start items-start">
				<div
					className={`h-[3px] transition-all bg-primary-content ${
						open ? 'bg-transparent' : ''
					}`}
					style={{ width: `${task?.completion}%` }}
				></div>
			</div>
		</div>
	);
}

export default TaskCard;
