import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import Cors from 'cors';
import { API_URL } from '../../../../config/config';

const cors = Cors({
	methods: ['GET'],
	origin: API_URL,
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
	req: NextApiRequest,
	res: NextApiResponse,
	fn: Function
) {
	return new Promise((resolve, reject) => {
		fn(req, res, (result: any) => {
			if (result instanceof Error) {
				return reject(result);
			}

			return resolve(result);
		});
	});
}

const handler: NextApiHandler = async (req, res) => {
	await runMiddleware(req, res, cors);
	const { method } = req;
	switch (method) {
		case 'POST':
			return sendNewEmail(req, res);
			break;

		default:
			return res.status(404).send('Not found!');
	}
};
const CONTACT_MESSAGE_FIELDS: any = {
	name: 'Name',
	email: 'Email',
	message: 'Message',
};

const generateEmailContent = (data: any, inject = false) => {
	let htmlData, stringData;
	if (!inject) {
		stringData = Object.entries(data).reduce(
			(str, [key, val]) =>
				(str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${val} \n \n`),
			''
		);
		htmlData = Object.entries(data).reduce((str, [key, val]) => {
			return (str += `<h3 class="form-heading" align="left">${CONTACT_MESSAGE_FIELDS[key]}</h3><p class="form-answer" align="left">${val}</p>`);
		}, '');
	} else {
		htmlData = data;
		stringData = 'Thank you for contacting!';
	}

	return {
		text: stringData,
		html: `<!DOCTYPE html><html> <head> <title></title> <meta charset="utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <style type="text/css"> body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}table{border-collapse: collapse !important;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}@media screen and (max-width: 525px){.wrapper{width: 100% !important; max-width: 100% !important;}.responsive-table{width: 100% !important;}.padding{padding: 10px 5% 15px 5% !important;}.section-padding{padding: 0 15px 50px 15px !important;}}.form-container{margin-bottom: 24px; padding: 20px; border: 1px dashed #ccc;}.form-heading{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 400; text-align: left; line-height: 20px; font-size: 18px; margin: 0 0 8px; padding: 0;}.form-answer{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 300; text-align: left; line-height: 20px; font-size: 16px; margin: 0 0 24px; padding: 0;}div[style*="margin: 16px 0;"]{margin: 0 !important;}</style> </head> <body style="margin: 0 !important; padding: 0 !important; background: #fff"> <div style=" display: none; font-size: 1px; color: #fefefe; line-height: 1px;  max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; " ></div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#ffffff" align="center" style="padding: 10px 15px 30px 15px" class="section-padding" > <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px" class="responsive-table" > <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0" > <tr> <td style=" padding: 0 0 0 0; font-size: 16px; line-height: 25px; color: #232323; " class="padding message-content" > <h2>${
			inject ? 'Greener Solution' : 'New contact message!'
		}</h2> <div class="form-container">${htmlData}</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table></body></html>`,
	};
};

const sendNewEmail = async (req: NextApiRequest, res: NextApiResponse) => {
	const data = req.body;
	if (!data.name || !data.email || !data.message) {
		return res.status(400).send({ message: 'Bad request' });
	}

	try {
		await transporter.sendMail({
			...mailOptions,
			subject: 'eco-solution',
			...generateEmailContent(data),
		});
		await transporter.sendMail({
			from: process.env.EMAIL,
			to: data.email,
			subject: 'no-reply',
			...generateEmailContent(
				`<h3 style="font-weight:bold;margin-bottom:10px;" class="form-heading" align="left">Thank you ${data.name} for contacting Greener Solution!</h3><p class="form-answer" align="left">We will come back to you shortly!</p><p class="form-answer" align="left">Aim to respond within 48 hours</p>`,
				true
			),
		});

		return res.status(200).send({ success: true });
	} catch (e: any) {
		console.log(e);
		res.status(404).send({ message: e.message });
	}

	res.status(200).send('all good');
};

export const transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASS,
	},
});

export const mailOptions = {
	from: process.env.EMAIL,
	to: process.env.EMAIL,
};

export default handler;
