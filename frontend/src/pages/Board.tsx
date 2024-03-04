import { useState } from 'react';

function Board({ cycleId }) {
	const [tasks, setTasks] = useState<Task[]>([]);

	return (
		<div>
			<div></div>
			<div>
				<div>
					<h1>Tasks</h1>
					<div></div>
				</div>
				<div>
					<h1>Notes</h1>
				</div>
			</div>
		</div>
	);
}

export default Board;
