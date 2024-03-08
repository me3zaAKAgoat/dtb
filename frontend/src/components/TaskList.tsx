import TaskCard from './TaskCard';

function TaskList({
	tasks,
	setTasks,
}: {
	tasks: Task[];
	setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) {
	return (
		<div className="flex flex-col items-center px-[10%] pt-2">
			{tasks.length === 0 && (
				<h1 className="mt-4 font-semibold text-tertiary text-center">
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
		</div>
	);
}

export default TaskList;
