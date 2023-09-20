import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { API_URL, MAIN_URL } from '../../../../config/config';
import Cors from 'cors';
const cors = Cors({
	methods: ['GET', 'POST'],
	origin: MAIN_URL,
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
		case 'GET':
			return getAllPost(req, res);
			break;
		default:
			return res.status(404).send('Not found!');
	}
};

const getAllPost: NextApiHandler = async (req, res) => {
	try {
		const posts = await prisma.article.findMany({
			orderBy: {
				updatedAt: 'desc',
			},
			select: {
				title: true,
				slug: true,
				published: true,
				tags: true,
				categoryName: true,
				id: true,
				authorId: true,
				thumbnailUrl: true,
				hero: true,
				featured: true,
			},
		});
		// Replace with your database query function
		res.status(200).json({ posts });
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

export default handler;
