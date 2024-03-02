import nodemailer from 'nodemailer';
import config from './config.js';

// Create a Nodemailer transporter with your SMTP settings
const transporter = nodemailer.createTransport({
	host: 'smtp-mail.outlook.com',
	secure: false,
	port: 587,
	service: 'outlook',
	auth: {
		user: config.MAIL_EMAIL,
		pass: config.MAIL_PASS,
	},
	tls: {
		ciphers: 'SSLv3',
	},
});

const sendEmail = async (to: string, subject: string, html: string) => {
	const info = await transporter.sendMail({
		from: `${config.MAIL_EMAIL}`,
		to: to,
		subject: subject,
		html: html,
	});
	console.log('Email sent:', info.messageId);
};

export default sendEmail;
