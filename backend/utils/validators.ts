import passwordComplexity from 'joi-password-complexity';
import Validator from 'joi';

const passwordComplexityRules = {
	min: 8,
	max: 25,
	numeric: 1,
	requirementCount: 4,
};

const userSchema = Validator.object({
	username: Validator.string().alphanum().min(3).max(30),
	password: passwordComplexity(passwordComplexityRules),
});

const cycleSchema = Validator.object({
	endDate: Validator.date().optional(),
	archived: Validator.boolean().optional(),
	notes: Validator.string().allow(''),
	endNote: Validator.string().allow(''),
	emotionalState: Validator.string()
		.valid('happy', 'neutral', 'sad')
		.optional(),
});

const taskSchema = Validator.object({
	title: Validator.string(),
	description: Validator.string().allow(''),
	priority: Validator.valid('very low', 'low', 'medium', 'high', 'very high'),
	completion: Validator.number().min(0).max(100).optional(),
});

const passwordSchema = Validator.object({
	password: passwordComplexity(passwordComplexityRules),
});

export { userSchema, cycleSchema, taskSchema, passwordSchema };
