import { useEffect, useState, useContext } from 'react';
import { updateTask } from '../services/task';
import { AuthContext } from '../utils/useAuth';
import { useDebounce } from '../utils/useDebounce';
import { deleteTask } from '../services/task';
import { ToastContext } from '../providers/Toast';
import { ModalContext } from '../providers/Modal';

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
		<div className="bg-secondary mb-6 w-full border border-tertiary rounded overflow-hidden flex flex-col">
			<button className="h-[60px] w-full" onClick={() => setOpen(!open)}>
				<div className="flex justify-start px-5 items-center h-[80%]">
					<div className="flex items-center">
						<label htmlFor="title" className="text-sm h-full font-normal mr-1">
							Title:
						</label>
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
					<pre className="text-xs font-medium bg-primary my-2 border border-tertiary w-full h-[70%] rounded p-2 overflow-auto">
						{task?.description}
					</pre>
					<label htmlFor="completion" className="text-sm font-normal mb-2">
						Completion:
					</label>
					<input
						className="task-slider mb-2 w-full"
						type="range"
						min={0}
						max={100}
						step={10}
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
				</div>
			</div>
			<div className="h-[2px] w-full flex flex-col justify-start items-start">
				<div
					className={`h-full bg-primary-content ${open ? 'hidden' : 'visible'}`}
					style={{ width: `${task?.completion}%` }}
				></div>
			</div>
		</div>
	);
}

export default TaskCard;
