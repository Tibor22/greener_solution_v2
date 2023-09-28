import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import {
	postValidationSchema,
	validateSchema,
} from '../../../../lib/validators';
import { readFile } from '../../../../utils/utils';
import formidable from 'formidable';

import prisma from '../../../../lib/prisma';
import { PostObject } from '../../../../types/types';
import postModel from '../../../../models/PostModel';
import Cors from 'cors';
import { MAIN_URL } from '../../../../config/config';
export const config = {
	api: { bodyParser: false },
};

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
		case 'POST':
			return createNewPost(req, res);
			break;
		case 'GET':
			return getAllPost(req, res);
			break;
		default:
			return res.status(404).send('Not found!');
	}
};

const createNewPost: NextApiHandler = async (req, res) => {
	const { files, body }: PostObject = await readFile(req);
	let tags: string[] = [];
	const { slug } = body;
	// // tags will be in string form so converting to array
	if (body.tags) tags = JSON.parse(body.tags as string);

	const error = validateSchema(postValidationSchema, {
		...body,
		tags,
	});
	if (error) return res.status(400).json({ error });
	const article = await postModel.findPost('slug', slug);
	if (article) {
		return res.status(400).json({ error: 'slug need to be unique' });
	}

	// uploading thumbnail if there is any
	const thumbnail = files.thumbnail as formidable.File;

	try {
		const createdPost = await postModel.createPost(thumbnail, body, tags);
		res.status(201).json(createdPost);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};
const getAllPost: NextApiHandler = async (req, res) => {
	try {
		const allPosts = await prisma.article.findMany();
		res.status(200).json(allPosts);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

export default handler;
