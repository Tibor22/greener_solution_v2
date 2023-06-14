import { NextApiHandler } from 'next';
import {
	postValidationSchema,
	validateSchema,
} from '../../../../lib/validators';
import { readFile } from '../../../../utils/utils';
import formidable from 'formidable';
import cloudinary from '../../../../lib/cloudinary';
import prisma from '../../../../lib/prisma';
import { PostObject } from '../../../../types/types';
import postModel from '../../../../models/PostModel';
import { Article } from '@prisma/client';

export const config = {
	api: { bodyParser: false },
};

const handler: NextApiHandler = async (req, res) => {
	const { method } = req;
	switch (method) {
		case 'POST':
			return createNewPost(req, res);
			break;
	}
};

const createNewPost: NextApiHandler = async (req, res) => {
	const { files, body }: PostObject = await readFile(req);
	let tags: string[] = [];
	let categories: string[] = [];
	const { slug } = body;
	// // tags will be in string form so converting to array
	if (body.tags) tags = body.tags.split(',');
	if (body.categories) categories = body.categories.split(',');

	const error = validateSchema(postValidationSchema, {
		...body,
		tags,
		categories,
	});
	if (error) return res.status(400).json({ error });
	const article = await postModel.findPost('slug', slug);
	if (article) {
		return res.status(400).json({ error: 'slug need to be unique' });
	}

	// uploading thumbnail if there is any
	const thumbnail = files.thumbnail as formidable.File;

	try {
		const createdPost = await postModel.createPost(thumbnail, body);
		res.status(201).json(createdPost);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

export default handler;
