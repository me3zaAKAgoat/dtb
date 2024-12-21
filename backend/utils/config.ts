import dotenv from 'dotenv';
dotenv.config();

const PORT: number | undefined = process.env.PORT as unknown as number;
const MONGODB_URI: string | undefined = process.env.MONGODB_URI;
const SECRET: string | undefined = process.env.SECRET;
const TOKEN_EXPIRATION: string | undefined = process.env.TOKEN_EXPIRATION;
const MAIL_PASS: string | undefined = process.env.MAIL_PASS;
const MAIL_EMAIL: string | undefined = process.env.MAIL_EMAIL;
const CLOUDINARY_CLOUD_NAME: string | undefined =
	process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY: string | undefined = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET: string | undefined =
	process.env.CLOUDINARY_API_SECRET;

const config = {
	PORT,
	MONGODB_URI,
	SECRET,
	TOKEN_EXPIRATION,
	MAIL_PASS,
	MAIL_EMAIL,
	CLOUDINARY_CLOUD_NAME,
	CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET,
};

export default config;
