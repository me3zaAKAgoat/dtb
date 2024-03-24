import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	firstName: {
		type: String,
		// required: true, // might need this later one when the app signup is complex again
	},
	lastName: {
		type: String,
		// required: true, // might need this later one when the app signup is complex again
	},
	email: {
		type: String,
		// required: true, // might need this later one when the app signup is complex again
		// unique: true,
	},
	passwordHash: {
		type: String,
		required: true,
	},
	isVerified: {
		type: Boolean,
		default: false,
		// required: true, // might need this later one when the app signup is complex again
	},
	verificationToken: {
		type: String,
		// required: true, // might need this later one when the app signup is complex again
	},
	avatar: {
		type: String,
		default: 'default.png',
	},
	cycles: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Cycle',
		},
	],
});

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.passwordHash;
	},
});

const User = mongoose.model('User', userSchema);

export default User;
