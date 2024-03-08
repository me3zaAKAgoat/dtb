import { useEffect, useState, useContext } from 'react';
import { updateTask } from '../services/task';
import { AuthContext } from '../utils/useAuth';
import { useDebounce } from '../utils/useDebounce';

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

	return (
		<div className="bg-secondary mb-6 w-full border border-tertiary rounded overflow-hidden flex flex-col">
			<button className="h-[60px] w-full" onClick={() => setOpen(!open)}>
				<h1>{task?.title}</h1>
			</button>
			<div
				className={`task-card flex flex-col justify-start items-center ${
					open ? 'task-card-open' : 'task-card-closed'
				}`}
			>
				<p className="bg-primary border border-tertiary w-[80%] h-[70%] rounded p-2">
					{task?.description}
				</p>
				<input
					className="task-slider m-auto w-[80%]"
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
