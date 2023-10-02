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
		const selector2 = '.table-wrapper.over-x-auto table tbody tr:nth-child(1)';
		const pollution = $$(selector2).text();
		console.log('POLLUTION:', pollution);
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
		const lines2 = pollution
			?.split(' ')
			?.filter((line: any) => line?.trim() !== '');
		const pollutionData = {
			location:
				lines2 &&
				`${lines2[1]?.trim()} ${lines2[2]
					?.trim()
					?.slice(0, -1)} (${lines2[3]?.trim()})`,
			data: lines2 && lines2[4]?.trim(),
		};
		console.log('POLLUTION DATA:', pollutionData);
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
		if (lines2) {
			await prisma.pollution.upsert({
				where: {
					id: 1,
				},
				update: {
					location: pollutionData.location,
					data: pollutionData.data,
				},
				create: {
					location: pollutionData.location,
					data: pollutionData.data,
				},
			});
		}
		console.log('DATA:', weatherData);
		res.status(200).send({ weatherData, pollutionData });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'An error occurred' });
	}
};
