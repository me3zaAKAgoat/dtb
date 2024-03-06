import { useEffect, useState } from 'react';
import TaskList from './TaskList';
import CycleNotes from './CycleNotes';
import HUD from './HUD';
import { sortedTasks } from '../utils/taskUtil';

function Board({ cycleId }) {
	const [tasks, setTasks] = useState<Task[]>([
		{
			id: '4',
			title: 'Task 4',
			description: 'Description of Task 4',
			completion: 90,
			priority: 1,
		},
		{
			id: '5',
			title: 'Task 5',
			description: 'Description of Task 5',
			completion: 10,
			priority: 2,
		},
		{
			id: '6',
			title: 'Task 6',
			description: 'Description of Task 6',
			completion: 50,
			priority: 3,
		},
		{
			id: '7',
			title: 'Task 7',
			description: 'Description of Task 7',
			completion: 70,
			priority: 1,
		},
		{
			id: '8',
			title: 'Task 8',
			description: 'Description of Task 8',
			completion: 30,
			priority: 2,
		},
	]);
	const [notes, setNotes] = useState<string>('');

	useEffect(() => {
		sortedTasks(tasks);
	}, [tasks]);
	// fetch all cycle related stuff here in useEffect here

	// depnding on tasks and notes, we can make api calls to save them

	return (
		<div className="board h-full w-full flex flex-col justify-normal items-stretch">
			<div className="w-full h-[14%] flex justify-center items-center relative">
				<button className="btn bg-secondary absolute left-[5%] aspect-square w-[120px] border border-tertiary">
					+ Add a task
				</button>
				<HUD tasks={tasks} />
			</div>
			<div className="w-full h-[86%] flex justify-normal">
				<div className="w-1/2 flex flex-col items-center font-semibold">
					<h1 className="board-sides-title">Tasks</h1>
					<div className="w-full h-full overflow-y-scroll">
						<TaskList tasks={tasks} setTasks={setTasks} />
					</div>
				</div>
				<div className="h-full flex flex-col justify-center items-center">
					<div className=" h-[90%] w-[2px] rounded bg-tertiary"></div>
				</div>
				<div className="w-1/2 flex flex-col items-center font-semibold">
					<h1 className="board-sides-title">Notes</h1>
					<CycleNotes cycleId={cycleId} notes={notes} setNotes={setNotes} />
				</div>
			</div>
		</div>
	);
}

export default Board;
