import passwordComplexity from 'joi-password-complexity';
import Validator from 'joi';

const userSchema = Validator.object({
	username: Validator.string().required(),
	firstName: Validator.string().required(),
	lastName: Validator.string().required(),
	email: Validator.string().email().required(),
	password: passwordComplexity({
		min: 8,
		max: 25,
		lowerCase: 1,
		upperCase: 1,
		numeric: 1,
		symbol: 1,
		requirementCount: 4,
	}),
});

const cycleSchema = Validator.object({
	startDate: Validator.date().required(),
	endDate: Validator.date().optional(),
	userId: Validator.string().required(),
});

const taskSchema = Validator.object({
	title: Validator.string().required(),
	description: Validator.string().optional(),
	completion: Validator.number().required(),
	priority: Validator.number().required(),
	cycleId: Validator.string().required(),
});

const passwordSchema = Validator.object({
	password: passwordComplexity({
		min: 8,
		max: 25,
		lowerCase: 1,
		upperCase: 1,
		numeric: 1,
		symbol: 1,
		requirementCount: 4,
	}),
});

export { userSchema, cycleSchema, taskSchema, passwordSchema };
