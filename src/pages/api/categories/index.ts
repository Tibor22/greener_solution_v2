import { NextApiHandler } from 'next';
import prisma from '../../../../lib/prisma';

const handler: NextApiHandler = async (req, res) => {
	const { method } = req;
	switch (method) {
		case 'POST':
			return createNewCategory(req, res);
			break;
		case 'GET':
			return getAllCategories(req, res);
			break;
		default:
			return res.status(404).send('Not found!');
	}
};

const createNewCategory: NextApiHandler = async (req, res) => {
	const { name } = req.body;
	console.log('NAME:', name);
	if (!name) return res.status(400).json({ error: 'Provide name' });
	const category = await prisma.category.findUnique({
		where: {
			name: name,
		},
	});
	if (category)
		return res.status(400).json({ error: 'name needs to be unique' });

	try {
		const createdCategory = await prisma.category.create({
			data: {
				name: name,
			},
		});
		res.status(201).json(createdCategory);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};
const getAllCategories: NextApiHandler = async (req, res) => {
	try {
		const allCategory = await prisma.category.findMany();
		res.status(200).json(allCategory);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

export default handler;
