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
		numeric: 1,
		requirementCount: 4,
	}),
});

const cycleSchema = Validator.object({
	endDate: Validator.date().optional(),
});

const taskSchema = Validator.object({
	title: Validator.string(),
	description: Validator.string().allow(''),
	priority: Validator.valid('very low', 'low', 'medium', 'high', 'very high'),
	completion: Validator.number().min(0).max(100).optional(),
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
