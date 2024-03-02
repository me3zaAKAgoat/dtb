const taskRouter = require('express').Router();
import Validator from 'joi';
import config from '../utils/config';

const taskSchema = Validator.object({
	title: Validator.string().required(),
	description: Validator.string().optional(),
	completion: Validator.number().required(),
	priority: Validator.number().required(),
	cycleId: Validator.string().required(),
});

/** Route for creating a task
 * Route for deleting a task
 * Route for getting a task
 * Route for updating a task
 * Route for getting all tasks for a cycle
 */

export default taskRouter;
