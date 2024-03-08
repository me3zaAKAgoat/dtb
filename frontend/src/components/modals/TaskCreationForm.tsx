import { useState, useContext } from 'react';
import { ToastContext } from '../../providers/Toast';
import { AuthContext } from '../../utils/useAuth';
import { createTask } from '../../services/task';
import { ModalContext } from '../../providers/Modal';

/**
 * Cycle start form component
 * Fields: cycle end date
 * Future fields: cycle recurring tasks
 */
function TaskCreationForm({
	cycleId,
	tasks,
	setTasks,
}: {
	cycleId: string;
	tasks: Task[];
	setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) {
	const { setToast } = useContext(ToastContext);
	const { setModal } = useContext(ModalContext);
	const { user } = useContext(AuthContext)!;
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [priority, setPriority] = useState('medium');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const newTask = await createTask(user?.token!, cycleId, {
				title,
				description,
				priority,
			});

			setTasks([...tasks, newTask]);
			setToast({
				message: 'Task created successfully',
				type: 'success',
			});
			setModal({ type: 'off' });
		} catch (err) {
			setToast({
				message: 'Failed to create task',
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
						Create a new Task
					</h1>
					<div className="flex flex-col">
						<label htmlFor="title" className="font-semibold">
							Title:
						</label>
						<input
							type="text"
							name="title"
							id="title"
							className="transition-all focus:border-primary-content bg-secondary my-2 border border-tertiary rounded-[4px] input input-primary"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
						/>

						<label htmlFor="description" className="font-semibold">
							Description:
						</label>
						<textarea
							name="description"
							id="description"
							className="transition-all focus:border-primary-content bg-secondary my-2 border border-tertiary rounded-[4px] textarea textarea-primary"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>

						<label htmlFor="priority" className="font-semibold">
							Priority
						</label>
						<select
							name="priority"
							id="priority"
							className="transition-all focus:border-primary-content bg-secondary my-2 border border-tertiary rounded-[4px] select select-primary"
							value={priority}
							onChange={(e) => setPriority(e.target.value)}
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
								Create Task
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default TaskCreationForm;
