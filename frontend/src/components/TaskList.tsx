import { useContext } from 'react';
import TaskCard from './TaskCard';
import { ModalContext } from '../providers/Modal';

function TaskList({
	cycleId,
	tasks,
	setTasks,
}: {
	cycleId: string;
	tasks: Task[];
	setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) {
	const { setModal } = useContext(ModalContext);
	return (
		<div className="flex flex-col items-center px-[10%] pt-2">
			{tasks.length === 0 && (
				<h1 className="mt-4 font-semibold text-tertiary text-center mb-6">
					There are currently no tasks for this cycle.
				</h1>
			)}
			{tasks.map((task) => (
				<TaskCard
					key={task.id}
					id={task.id}
					tasks={tasks}
					setTasks={setTasks}
				/>
			))}
			<button
				className="btn rounded-[5px] bg-secondary w-[120px] border border-tertiary"
				onClick={() =>
					setModal({
						type: 'TaskCreationForm',
						extraData: { cycleId, tasks, setTasks },
					})
				}
			>
				+ Add a task
			</button>
		</div>
	);
}

export default TaskList;
