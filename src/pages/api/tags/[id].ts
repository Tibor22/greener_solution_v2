import { NextApiHandler } from 'next';
import prisma from '../../../../lib/prisma';

const handler: NextApiHandler = async (req, res) => {
	const { method } = req;
	switch (method) {
		case 'DELETE':
			return deleteTag(req, res);
			break;
		default:
			res.status(404).send('Not found!');
	}
};

const deleteTag: NextApiHandler = async (req, res) => {
	const id = req.query.id;
	if (!id) return res.status(400).json({ error: 'Missing ID' });
	try {
		const deletedTag = await prisma.tag.delete({
			where: {
				id: Number(id),
			},
		});
		res.status(202).json(deletedTag);
	} catch (err: any) {
		res.status(500).json({ error: 'Tag not found' });
	}
};

export default handler;
