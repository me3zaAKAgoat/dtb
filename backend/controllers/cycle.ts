import express from 'express';
const cycleRouter = express.Router();
import Cycle from '../models/cycle';
import User from '../models/user';
import { Request, Response } from 'express';
import { cycleSchema } from '../utils/validators';
import Task from '../models/task';

/**
 * Route for posting a new cycle
 * Route for posting a deleting a cycle
 * Route for getting a cycle
 * Route for updating a cycle
 * Route for getting all cycles for a user
 */

cycleRouter.post('/new', async (req: Request, res: Response) => {
	const { error } = cycleSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}
	try {
		const user = await User.findById(req.userId);
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
		const cycle = new Cycle({
			startDate: new Date(),
			endDate: new Date(req.body.endDate),
			user: user._id,
		});
		if (cycle.endDate <= cycle.startDate) {
			return res.status(400).json({ error: 'End date is before start date' });
		}
		await cycle.save();
		user.cycles = user.cycles.concat(cycle._id);
		return res.status(201).json({
			id: cycle.id,
		});
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
});

cycleRouter.get('/current', async (req: Request, res: Response) => {
	try {
		const cycle = await Cycle.findOne({
			user: req.userId,
			archived: false,
		});
		if (!cycle) {
			return res.status(404).json({ error: 'Cycle not found' });
		}
		return res.status(200).json({ id: cycle.id });
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
});

cycleRouter.delete('/:id', async (req: Request, res: Response) => {
	try {
		const cycle = await Cycle.findById(req.params.id);
		if (!cycle) {
			return res.status(404).json({ error: 'Cycle not found' });
		}
		await Task.deleteMany({ cycle: cycle.id });
		await cycle.deleteOne();
		return res.status(204).json();
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
});

cycleRouter.get('/:id', async (req: Request, res: Response) => {
	try {
		const cycle = await Cycle.findById(req.params.id);
		if (!cycle) {
			return res.status(404).json({ error: 'Cycle not found' });
		}
		return res.status(200).json(cycle);
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
});

cycleRouter.get('/', async (req: Request, res: Response) => {
	try {
		const cycles = await Cycle.find({});
		return res.status(200).json(cycles);
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
});

cycleRouter.put('/archive/:id', async (req: Request, res: Response) => {
	try {
		const cycle = await Cycle.findById(req.params.id);
		if (!cycle) {
			return res.status(404).json({ error: 'Cycle not found' });
		}
		cycle.archived = true;
		await cycle.save();
		return res.status(200).json(cycle);
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
});

cycleRouter.get('/notes/:id', async (req: Request, res: Response) => {
	try {
		const cycle = await Cycle.findById(req.params.id);
		if (!cycle) {
			return res.status(404).json({ error: 'Cycle not found' });
		}
		return res.status(200).json(cycle.notes);
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
});

cycleRouter.put('/notes/:id', async (req: Request, res: Response) => {
	try {
		const cycle = await Cycle.findById(req.params.id);
		if (!cycle) {
			return res.status(404).json({ error: 'Cycle not found' });
		}
		cycle.notes = req.body.notes;
		await cycle.save();
		return res.status(200).json(cycle.notes);
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
});

export default cycleRouter;
