import { NextApiHandler } from 'next';
import { UserObject } from '../../../../types/types';
import { compare } from 'bcrypt';
import userModel from '../../../../models/UserModel';

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
		default:
			return res.status(404).send('Not found!');
	}
};

const getUser: NextApiHandler = async (req, res) => {
	const email = req.query.email as string;
	if (!email) return res.status(400).json({ error: 'Invalid email' });

	try {
		const user = await userModel.getUser('email', email);
		res.status(200).json(user);
	} catch (err) {
		res.status(500).json({ error: err });
	}
};
const deleteUser: NextApiHandler = async (req, res) => {
	const { email, password }: UserObject = req.body;
	const userToDelete = await userModel.getUser('email', email);

	if (!userToDelete) {
		res.status(404).json({ error: 'User not found.' });
		return;
	}
	const user = userToDelete as UserObject;
	const isPasswordValid = await compare(password, user.password);

	if (!isPasswordValid) {
		res.status(404).json({ error: 'Wrong Password.' });
		return;
	}
	const deletedUser = await userModel.deleteUser('email', email);
	res.status(202).json(deletedUser);
};

export default handler;
