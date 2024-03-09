import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	completion: {
		type: Number,
		default: 0,
		required: true,
	},
	priority: {
		type: String,
		required: true,
	},
	cycle: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Cycle',
		required: true,
	},
});

taskSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
