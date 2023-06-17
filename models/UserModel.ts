import { Role, User } from '@prisma/client';
import prisma from '../lib/prisma';
import { UserObject } from '../types/types';
import { userValidationSchema, validateSchema } from '../lib/validators';
import bcrypt from 'bcrypt';

interface SignupResponse {
	error?: string;
	userCreated?: User;
}
class UserModel {
	async signup(obj: UserObject): Promise<SignupResponse> {
		try {
			const hashedPassword = await bcrypt.hash(obj.password, 10);
			if (!hashedPassword) throw new Error('Invalid password hashing');
			const error = validateSchema(userValidationSchema, {
				...obj,
			});
			if (error) throw new Error(error);
			const userCreated = await prisma.user.create({
				data: {
					name: obj.name,
					role: obj.role as Role,
					displayName: obj.displayName,
					email: obj.email,
					password: hashedPassword,
				},
			});
			return { userCreated };
		} catch (e: any) {
			return { error: e.message };
		}
	}

	async getUser(key: string, value: string | number) {
		try {
			const user = await prisma.user.findUnique({
				where: {
					[key]: value,
				},
			});
			return user;
		} catch (err: any) {
			return { message: err.message };
		}
	}
	async deleteUser(key: string, value: string | number) {
		try {
			const user = await prisma.user.delete({
				where: {
					[key]: value,
				},
			});
			return user;
		} catch (err: any) {
			return { message: err.message };
		}
	}
}

const userModel = new UserModel();

export default userModel;
