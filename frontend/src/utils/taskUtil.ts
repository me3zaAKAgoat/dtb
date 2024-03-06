export const calcTotal = (tasks: Task[]) => {
	if (tasks.length === 0) return 0;

	const coeffTotal = tasks.reduce(
		(accumulator, task) => accumulator + task.priority,
		0,
	);
	return Math.trunc(
		tasks.reduce(
			(accumulator, task) => accumulator + task.completion * task.priority,
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
		const byPriority = b.priority - a.priority;
		const byTitle = strcmp(a.title, b.title);
		return byPriority || byTitle;
	});
};
