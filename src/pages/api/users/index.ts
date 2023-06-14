import { NextApiHandler } from 'next';
import { readFile } from '../../../../utils/utils';
import prisma from '../../../../lib/prisma';
import { Role } from '@prisma/client';

type UserObject = {
	name: string;
	role: string;
	displayName: string;
	email: string;
	password: string;
};

const handler: NextApiHandler = async (req, res) => {
	const { method } = req;
	switch (method) {
		// case 'GET':
		// 	{
		// 		await dbConnect();
		// 		res.json({ ok: true });
		// 	}
		// 	break;
		case 'POST':
			return createNewUser(req, res);
			break;
	}
};

const createNewUser: NextApiHandler = async (req, res) => {
	const { name, role, displayName, email, password }: UserObject = req.body;

	// // tags will be in string form so converting to array

	// uploading thumbnail if there is any

	const userCreated = await prisma.user.create({
		data: {
			name: name,
			role: role as Role,
			displayName: displayName,
			email: email,
			password: password,
		},
	});
	res.status(201).json(userCreated);
};

export default handler;
