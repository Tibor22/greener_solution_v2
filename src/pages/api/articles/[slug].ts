import { NextApiHandler } from 'next';
import { readFile } from '../../../../utils/utils';
import formidable from 'formidable';
import { UpdateObj } from '../../../../types/types';
import postModel from '../../../../models/PostModel';
import { Tag } from '@prisma/client';

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
		case 'DELETE':
			return deletePost(req, res);
			break;
		default:
			res.status(404).send('Not found!');
	}
};

const getPost: NextApiHandler = async (req, res) => {
	const slug = req.query.slug as string;
	if (!slug) return res.status(400).json({ message: 'Missing Slug' });
	try {
		const post = await postModel.findPost('slug', slug);
		if (post === null) {
			throw new Error("Post doesn't exist");
		}
		return res.status(200).json(post);
	} catch (err: any) {
		return res.status(400).json({ message: err.message });
	}
};

const updatePost: NextApiHandler = async (req, res) => {
	const slug = req.query.slug as string;
	const post = await postModel.findPost('slug', slug);
	if (!post) return res.status(404).json({ error: 'Post not found!' });

	const { files, body } = await readFile<UpdateObj>(req);

	let newTags: string[] = [];
	let oldTags: Tag[] = post.tags;
	// // tags will be in string form so converting to array
	if (body.tags) newTags = JSON.parse(body.tags as string);

	const thumbnail = files.thumbnail as formidable.File;

	try {
		const updatedPost = await postModel.updatePost(
			thumbnail,
			body,
			slug,
			newTags,
			oldTags
		);
		res.status(201).json(updatedPost);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};
const deletePost: NextApiHandler = async (req, res) => {
	const slug = req.query.slug as string;
	const post = await postModel.findPost('slug', slug);
	if (!post) return res.status(404).json({ error: 'Post not found!' });

	try {
		const deletedPost = await postModel.deletePost(post.thumbnailId, slug);
		res.status(200).json(deletedPost);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

export default handler;
