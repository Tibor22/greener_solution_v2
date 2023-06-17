import { NextApiHandler } from 'next';
import { UserObject } from '../../../../types/types';
import prisma from '../../../../lib/prisma';

const handler: NextApiHandler = async (req, res) => {
	const { method } = req;
	switch (method) {
		case 'GET':
			{
				return getUser(req, res);
			}
			break;
		case 'POST':
			{
				return deleteUser(req, res);
			}
			break;
	}
};

const getUser: NextApiHandler = async (req, res) => {
	// const { email, password }: UserObject = req.body;
	console.log('CALL RECIEVED');
	console.log('EMAIL:', req.query.email);
	const email = req.query.email as string;
	if (!email) return res.status(400).json({ error: 'Invalid email' });

	try {
		const user = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});
		res.status(200).json(user);
	} catch (err) {
		res.status(500).json({ error: err });
	}
};
const deleteUser: NextApiHandler = async (req, res) => {
	const { email, password }: UserObject = req.body;
	console.log(req.body);
	const id = req.query.id;
	const userToDelete = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});
	if (!userToDelete) {
		res.status(404).json({ error: 'User not found.' });
		return;
	}

	// Verify the user's password here (e.g., using bcrypt.compare)
	const userCreated = await prisma.user.delete({
		where: {
			email: email,
		},
	});
	res.status(202).json(userCreated);
};

export default handler;
