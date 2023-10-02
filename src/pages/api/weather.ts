import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import cheerio from 'cheerio';
import Cors from 'cors';
import { MAIN_URL } from '../../../config/config';
import prisma from '../../../lib/prisma';

const cors = Cors({
	methods: ['GET', 'POST'],
	origin: MAIN_URL,
});
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
export default async (req: NextApiRequest, res: NextApiResponse) => {
	await runMiddleware(req, res, cors);
	try {
		const resp = await axios(
			'https://www.eldoradoweather.com/climate/world-extremes/world-temp-rainfall-extremes.php'
		);
		const data = await resp.data;
		const $ = cheerio.load(data);
		const selector =
			'body table tbody tr td table tbody tr td table tbody tr td div div table tbody:nth-child(2) tr:nth-child(2)';
		const weather = $(selector).text();

		const lines = weather
			?.split('\n')
			.filter((line: any) => line.trim() !== '');
		const weatherData = {
			location: lines && lines[1].trim(),
			temperature: lines && lines[3].trim(),
		};
		if (lines) {
			await prisma.weather.upsert({
				where: {
					id: 1,
				},
				update: {
					location: weatherData.location,
					temperature: weatherData.temperature,
				},
				create: {
					location: weatherData.location,
					temperature: weatherData.temperature,
				},
			});
		}
		console.log('DATA:', weatherData);
		res.status(200).send(weatherData);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'An error occurred' });
	}
};
