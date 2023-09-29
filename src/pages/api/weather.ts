import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';
import prisma from '../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		// Launch a headless browser
		// const browser = await puppeteer.launch();
		const browser = await puppeteer.connect({
			browserWSEndpoint:
				'wss://chrome.browserless.io?token=6d75fbea-8637-400b-8336-a48998b86a71',
		});

		// Open a new page
		const page = await browser.newPage();

		// Navigate to the target page
		await page.goto(
			'https://www.eldoradoweather.com/climate/world-extremes/world-temp-rainfall-extremes.php',
			{
				waitUntil: 'domcontentloaded',
			}
		);

		// Extract the desired text

		const selector =
			'body table tbody tr td table tbody tr td table tbody tr td div div table tbody:nth-child(2) tr:nth-child(2)';
		const text = await page.$eval(selector, (element) => element.textContent);

		// Close the browser
		await browser.close();
		const lines = text?.split('\n').filter((line: any) => line.trim() !== '');
		const data = {
			location: lines && lines[1].trim(),
			temperature: lines && lines[3].trim(),
		};

		const weather = await prisma.weather.create({
			data: {
				location: data.location || 'Death Valley',
				temperature: data.temperature || '53',
			},
		});

		// Send the extracted text as the response
		res.status(200).json(data);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'An error occurred' });
	}
};
