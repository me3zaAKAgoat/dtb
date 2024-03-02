declare namespace Express {
	export interface Request {
		token?: string;
		fileValidationError?: string;
		userId?: string;
	}
}
