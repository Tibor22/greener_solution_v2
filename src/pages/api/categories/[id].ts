import { NextApiHandler } from 'next';
import prisma from '../../../../lib/prisma';

const handler: NextApiHandler = async (req, res) => {
	const { method } = req;
	switch (method) {
		case 'DELETE':
			return deleteCategory(req, res);
			break;
		default:
			res.status(404).send('Not found!');
	}
};

const deleteCategory: NextApiHandler = async (req, res) => {
	const id = req.query.id;
	if (!id) return res.status(400).json({ error: 'Missing ID' });
	try {
		const deletedCategory = await prisma.category.delete({
			where: {
				id: Number(id),
			},
		});
		res.status(202).json(deletedCategory);
	} catch (err: any) {
		res.status(500).json({ error: 'Category not found' });
	}
};

export default handler;
