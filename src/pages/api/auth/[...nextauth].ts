import NextAuth, { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../../lib/prisma';
import { compare } from 'bcrypt';

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',

			credentials: {
				email: {
					label: 'email',
					type: 'text',
					placeholder: 'jsmith@gmail.com',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials): Promise<User | null> {
				if (!credentials?.email || !credentials.password) {
					return null;
				}

				const { email, password } = credentials as {
					email: string;
					password: string;
				};
				const user = await prisma.user.findUnique({
					where: {
						email: email,
					},
				});
				if (!user) {
					return null;
				}

				const isPasswordValid = await compare(password, user.password);

				if (!isPasswordValid) {
					return null;
				}

				return {
					...user,
					id: String(user.id), // Convert the id to a string
				};
			},
		}),
	],
	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) {
				token.email = user.email;
				token.name = user.name;
				token.role = user.role;
				token.id = user.id;
			}

			return token;
		},
		session: ({ session, token }) => {
			if (token && session.user) {
				session.user.email = token.email;
				session.user.name = token.name;
				session.user.role = token.role;
				session.user.id = token.id;
			}
			return session;
		},
	},
	secret: process.env.JWT_API_SECRET,
	session: {
		strategy: 'jwt',
		maxAge: 1592000,
	},
};

export default NextAuth(authOptions);
