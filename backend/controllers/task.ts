import express from 'express';
const taskRouter = express.Router();
import { Request, Response } from 'express';
import Task from '../models/task';
import Cycle from '../models/cycle';
import { taskSchema } from '../utils/validators';

/** Route for creating a task
 * Route for deleting a task
 * Route for getting a task
 * Route for updating a task
 * Route for getting all tasks for a cycle
 */

taskRouter.post('/:id', async (req: Request, res: Response) => {
	const { error } = taskSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	try {
		const cycle = await Cycle.findById(req.params.id);

		if (!cycle) return res.status(404).json({ error: 'Cycle not found' });

		if (cycle.archived)
			return res.status(400).json({ error: 'Cycle is archived' });

		const task = new Task({
			title: req.body.title,
			description: req.body.description,
			completion: 0,
			priority: req.body.priority,
			cycle: cycle._id,
		});

		const savedTask = await task.save();

		await cycle.updateOne({ $push: { tasks: savedTask.id } });

		return res.status(201).json(savedTask);
	} catch (error: any) {
		console.log(error);
		return res.status(500).json({ error: error.message });
	}
});

taskRouter.delete('/:id', async (req: Request, res: Response) => {
	try {
		const task = await Task.findById(req.params.id);

		if (!task) return res.status(404).json({ error: 'Task not found' });

		const cycle = await Cycle.findById(task.cycle);

		if (!cycle) return res.status(404).json({ error: 'Cycle not found' });

		if (cycle.archived)
			return res.status(400).json({ error: 'Cycle is archived' });

		await cycle.updateOne({ $pull: { tasks: task.id } });

		await Task.findByIdAndDelete(req.params.id);

		return res.status(204).json();
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
});

taskRouter.get('/:id', async (req: Request, res: Response) => {
	try {
		const cycle = await Cycle.findById(req.params.id);

		if (!cycle) return res.status(404).json({ error: 'Cycle not found' });

		const tasks = await Task.find({ cycle: cycle.id });

		return res.status(200).json(tasks);
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
});

taskRouter.put('/:id', async (req: Request, res: Response) => {
	const { error } = taskSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	try {
		const task = await Task.findById(req.params.id);

		if (!task) return res.status(404).json({ error: 'Task not found' });

		const cycle = await Cycle.findById(task.cycle);

		if (!cycle) return res.status(404).json({ error: 'Cycle not found' });

		if (cycle.archived)
			return res.status(400).json({ error: 'Cycle is archived' });

		const updatedTask = await Task.findByIdAndUpdate(
			req.params.id,
			{
				title: req.body.title,
				description: req.body.description,
				completion: req.body.completion,
				priority: req.body.priority,
			},
			{ new: true },
		);

		return res.status(200).json(updatedTask);
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
});

taskRouter.get('/cycle/:id', async (req: Request, res: Response) => {
	try {
		const cycle = await Cycle.findById(req.params.id);

		if (!cycle) return res.status(404).json({ error: 'Cycle not found' });

		const tasks = await Task.find({ cycle: cycle.id });

		return res.status(200).json(tasks);
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
});

export default taskRouter;
