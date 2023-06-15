import { NextApiHandler } from 'next';
import { readFile } from '../../../../utils/utils';
import formidable from 'formidable';
import { UpdateObj } from '../../../../types/types';
import postModel from '../../../../models/PostModel';

export const config = {
	api: { bodyParser: false },
};

const handler: NextApiHandler = async (req, res) => {
	const { method } = req;
	switch (method) {
		case 'GET':
			return getPost(req, res);
			break;
		case 'PATCH':
			return updatePost(req, res);
			break;
		default:
			res.status(404).send('Not found!');
	}
};

const getPost: NextApiHandler = async (req, res) => {
	console.log('PARAMS:', req.query);
	const slug = req.query.slug as string;
	if (!slug) return res.status(400).json({ message: 'Missing Slug' });
	try {
		const post = await postModel.findPost('slug', slug);
		if (post === null) {
			throw new Error("Post doesn't exist");
		}
		return res.status(200).json(post);
	} catch (err) {
		return res.status(400).json({ message: err });
	}
};

const updatePost: NextApiHandler = async (req, res) => {
	const slug = req.query.slug as string;
	const post = await postModel.findPost('slug', slug);
	if (!post) return res.status(404).json({ error: 'Post not found!' });

	const { files, body } = await readFile<UpdateObj>(req);

	// let tags = [];
	// let categories: string[] = [];
	// tags will be in string form so converting to array
	// if (body.tags) tags = JSON.parse(body.tags as string);
	// if (body.categories) categories = JSON.parse(body.categories as string);

	let tags: string[] = [];
	// // tags will be in string form so converting to array
	if (body.tags) tags = body.tags.split(',');
	if (body.tags.length > 0) {
		tags = [...tags, ...post.tags.map((tag) => tag.name)];
	}

	const thumbnail = files.thumbnail as formidable.File;

	try {
		const updatedPost = await postModel.updatePost(thumbnail, body, slug, tags);
		res.status(201).json(updatedPost);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

export default handler;
