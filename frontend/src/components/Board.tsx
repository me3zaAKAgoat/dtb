import { useEffect, useState } from 'react';

function Board({ cycleId }) {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [notes, setNotes] = useState<string>('');

	useEffect(() => {
		const tasks: Task[] = [
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
		];
		setTasks(tasks);
	}, []);
	// fetch all cycle related stuff here in useEffect here

	return (
		<div className="board h-full w-full flex flex-col justify-normal items-stretch">
			<div className="w-full h-24"></div>
			<div className="w-full h-full flex justify-normal">
				<div className="w-1/2 flex flex-col items-center font-semibold">
					<h1 className="board-sides-title">Tasks</h1>
					<div></div>
				</div>
				<div className="w-1/2 flex flex-col items-center font-semibold">
					<h1 className="board-sides-title">Notes</h1>
				</div>
			</div>
		</div>
	);
}

export default Board;
