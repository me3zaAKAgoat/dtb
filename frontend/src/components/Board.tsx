import React, { useContext, useEffect, useState } from 'react';
import TaskList from './TaskList';
import CycleNotes from './CycleNotes';
import HUD from './HUD';
import { useSortingTasksState } from '../utils/taskUtil';
import { getCycleTasks } from '../services/task';
import { AuthContext } from '../utils/useAuth';
import { getCycleEndDate, getCycleNotes } from '../services/cycle';

function Board({
	cycleId,
	setCycleId,
}: {
	cycleId: string;
	setCycleId: React.Dispatch<React.SetStateAction<string | null>>;
}) {
	const { user } = useContext(AuthContext)!;
	const [tasks, setTasks] = useSortingTasksState<Task[]>([]);
	const [notes, setNotes] = useState<string | null>(null);
	const [endDate, setEndDate] = useState<string | null>(null);

	useEffect(() => {
		getCycleTasks(user?.token!, cycleId).then((data) => {
			setTasks(data);
		});
		getCycleNotes(user?.token!, cycleId).then((data) => {
			setNotes(data);
		});
		getCycleEndDate(user?.token!, cycleId).then((data) => {
			setEndDate(data);
		});
	}, [cycleId]);

	return (
		<div className="board h-full w-full flex flex-col justify-normal items-stretch">
			<div className="w-full h-[112px] flex-shrink-0 flex justify-center items-center relative">
				<HUD tasks={tasks} cycleId={cycleId} endDate={endDate} setCycleId={setCycleId} />
			</div>
			<div className="w-full h-[calc(100%-112px)] flex justify-normal">
				<div className="w-1/2 h-full flex flex-col items-center font-semibold">
					<h1 className="board-sides-title">Tasks</h1>
					<div className="w-full h-full overflow-auto">
						<TaskList cycleId={cycleId} tasks={tasks} setTasks={setTasks} />
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
