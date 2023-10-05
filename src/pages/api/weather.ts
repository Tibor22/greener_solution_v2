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
		const resp2 = await axios(
			'https://www.iqair.com/gb/world-air-quality-ranking'
		);
		const data2 = await resp2.data;

		const $$ = cheerio.load(data2);
		const selector2 =
			'.table-wrapper.over-x-auto table tbody tr:nth-child(1) td:nth-child(3)';
		const selector3 =
			'.table-wrapper.over-x-auto table tbody tr:nth-child(1) td:nth-child(4)';
		const pollutionLocation = $$(selector2).text();
		const pollutionNumber = $$(selector3).text();

		const pollutionData = {
			location: pollutionLocation,
			data: pollutionNumber,
		};

		const data = await resp.data;
		const $ = cheerio.load(data);
		const selector =
			'body table tbody tr td table tbody tr td table tbody tr td div div table tbody:nth-child(2) tr:nth-child(2)';
		const weather = $(selector).text();

		const lines = weather
			?.split('\n')
			?.filter((line: any) => line?.trim() !== '');
		const weatherData = {
			location: lines && lines[1]?.trim(),
			temperature: lines && lines[3]?.trim(),
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
		if (pollutionData) {
			await prisma.pollution.upsert({
				where: {
					id: 1,
				},
				update: {
					location: pollutionData.location.trim(),
					data: pollutionData.data.trim(),
				},
				create: {
					location: pollutionData.location.trim(),
					data: pollutionData.data.trim(),
				},
			});
		}

		res.status(200).send({ weatherData, pollutionData });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'An error occurred' });
	}
};
