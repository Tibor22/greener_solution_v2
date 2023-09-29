import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import cheerio from 'cheerio';
// import prisma from '../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
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
		console.log('DATA:', weatherData);
		res.status(200).send(weatherData);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'An error occurred' });
	}
};
