import { useState } from 'react';

const priorityWeights = {
	'very low': 1,
	low: 2,
	medium: 3,
	high: 4,
	'very high': 5,
};

export const calcTotal = (tasks: Task[]) => {
	if (tasks.length === 0) return 0;

	const coeffTotal = tasks.reduce(
		(accumulator, task) => accumulator + priorityWeights[task.priority],
		0,
	);
	return Math.trunc(
		tasks.reduce(
			(accumulator, task) =>
				accumulator + task.completion * priorityWeights[task.priority],
			0,
		) / coeffTotal,
	);
};

export const strcmp = (s1: string, s2: string) => {
	for (let i = 0; i < s1.length && i < s2.length; i++) {
		if (s1.charCodeAt(i) !== s2.charCodeAt(i)) {
			return s1.charCodeAt(i) - s2.charCodeAt(i);
		}
	}

	return s1.length - s2.length;
};

export const sortedTasks = (tasks: Task[]) => {
	return tasks.sort((a, b) => {
		const byPriority =
			priorityWeights[b.priority] - priorityWeights[a.priority];
		const byTitle = strcmp(a.title, b.title);
		return byPriority || byTitle;
	});
};

export function useSortingTasksState<T>(
	initialState: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
	const [state, setState] = useState<T>(initialState);

	const customSetState: React.Dispatch<React.SetStateAction<T>> = (
		newState: React.SetStateAction<T>,
	) => {
		sortedTasks(newState as Task[]);
		setState(newState);
	};

	return [state, customSetState];
}
