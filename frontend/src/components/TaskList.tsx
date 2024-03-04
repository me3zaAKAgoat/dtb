import TaskCard from './TaskCard';

function TaskList({ tasks }: { tasks: Task[] }) {
	return (
		<div>
			{tasks.map((task) => (
				<TaskCard key={task.id} task={task} />
			))}
		</div>
	);
}

export default TaskList;
