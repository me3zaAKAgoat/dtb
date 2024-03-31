import { useState, useContext } from 'react';
import { ToastContext } from '../../providers/Toast';
import { AuthContext } from '../../utils/useAuth';
import { updateTask } from '../../services/task';
import { ModalContext } from '../../providers/Modal';

/**
 * Cycle start form component
 * Fields: cycle end date
 * Future fields: cycle recurring tasks
 */
function TaskEditForm({
	taskId,
	tasks,
	setTasks,
}: {
	taskId: string;
	tasks: Task[];
	setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) {
	const { setToast } = useContext(ToastContext);
	const { setModal } = useContext(ModalContext);
	const { user } = useContext(AuthContext)!;
	const task = tasks.find((task) => task.id === taskId);
	const [title, setTitle] = useState(task?.title!);
	const [description, setDescription] = useState(task?.description!);
	const [priority, setPriority] = useState(task?.priority!);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const updatedTask = await updateTask(user?.token!, taskId, {
				title,
				description,
				priority,
				completion: task!.completion,
			});
			setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
			setToast({
				message: 'Task updated successfully',
				type: 'success',
			});
			setModal({ type: 'off' });
		} catch (err) {
			setToast({
				message: 'Failed to update task',
				type: 'error',
			});
			console.error(err);
		}
	};

	return (
		<div>
			<div className="flex justify-center text-primary-content">
				<form
					className="flex flex-col items-stretch w-96"
					onSubmit={handleSubmit}
				>
					<h1 className="mb-5 mt-2 flex items-center justify-center font-semibold text-xl w-full">
						<svg
						className="mr-1 mt-0.5 fill-primary-content"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							width="16"
							height="16"
						>
							<path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953 1.953-.558a.253.253 0 0 0 .108-.064Zm1.238-3.763a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Z"></path>
						</svg>
						Edit Task
					</h1>
					<label htmlFor="title" className="font-semibold">
						Title:
					</label>
					<input
						type="text"
						placeholder="Title"
						className="transition-all focus:border-primary-content bg-secondary my-2 border border-tertiary rounded-[4px] input input-primary"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
					<label htmlFor="description" className="font-semibold">
						Description:
					</label>
					<textarea
						placeholder="Description"
						className="transition-all p-2 focus:border-primary-content bg-secondary my-2 border border-tertiary rounded-[4px] textarea textarea-primary"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<label htmlFor="priority" className="font-semibold">
						Priority
					</label>
					<select
						className="transition-all focus:border-primary-content bg-secondary my-2 border border-tertiary rounded-[4px] select select-primary"
						value={priority}
						onChange={(e) => setPriority(e.target.value as priority)}
						required
					>
						<option value="very low">Very Low</option>
						<option value="low">Low</option>
						<option value="medium">Medium</option>
						<option value="high">High</option>
						<option value="very high">Very High</option>
					</select>
					<div className="w-full my-2 mt-4 flex justify-center items-center">
						<button type="submit" className="main-button w-32">
							Edit Task
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default TaskEditForm;
