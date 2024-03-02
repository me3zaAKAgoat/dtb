import mongoose from 'mongoose';

const cycleSchema = new mongoose.Schema({
	startDate: {
		type: Date,
		required: true,
	},
	endDate: {
		type: Date,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	tasks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Task',
		},
	],
});

cycleSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Cycle = mongoose.model('Cycle', cycleSchema);

export default Cycle;
