import { NextApiHandler } from 'next';
import prisma from '../../../../lib/prisma';

const handler: NextApiHandler = async (req, res) => {
	const { method } = req;
	switch (method) {
		case 'GET':
			return getAllTags(req, res);
			break;
		case 'POST':
			return createNewTag(req, res);
			break;
	}
};

const createNewTag: NextApiHandler = async (req, res) => {
	const { name } = req.body;
	if (!name) return res.status(400).json({ error: 'Provide name' });
	const tag = await prisma.tag.findUnique({
		where: {
			name: name,
		},
	});
	if (tag) return res.status(400).json({ error: 'name needs to be unique' });

	try {
		const createdTag = await prisma.tag.create({
			data: {
				name: name,
			},
		});
		res.status(201).json(createdTag);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};
const getAllTags: NextApiHandler = async (req, res) => {
	try {
		const allTags = await prisma.tag.findMany();
		res.status(200).json(allTags);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

export default handler;
