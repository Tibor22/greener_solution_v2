import { NextApiHandler } from 'next';
import { UserObject } from '../../../../types/types';
import prisma from '../../../../lib/prisma';
import { Role } from '@prisma/client';
import userModel from '../../../../models/UserModel';

const handler: NextApiHandler = async (req, res) => {
	const { method } = req;
	switch (method) {
		case 'GET':
			{
				return getAllUsers(req, res);
			}
			break;
		case 'POST':
			return createNewUser(req, res);
			break;
	}
};

const createNewUser: NextApiHandler = async (req, res) => {
	const { name, role, displayName, email, password }: UserObject = req.body;
	const signupResponse = await userModel.signup({
		name,
		role,
		displayName,
		email,
		password,
	});

	if (signupResponse.error) {
		res.status(400).json({ error: signupResponse.error });
	}

	res.status(201).json(signupResponse.userCreated);
};
const getAllUsers: NextApiHandler = async (req, res) => {
	try {
		const allUsers = await prisma.user.findMany();
		res.status(200).json(allUsers);
	} catch (err) {
		res.status(500).json(err);
	}
};

export default handler;
