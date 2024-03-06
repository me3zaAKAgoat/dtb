import TaskCard from './TaskCard';

function TaskList({
	tasks,
	setTasks,
}: {
	tasks: Task[];
	setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) {
	return (
		<div className="flex flex-col items-center px-[10%] overflow-y-scroll pt-2">
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
