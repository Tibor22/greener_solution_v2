import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
	interface Session {
		user: {
			role: any;
			id: any;
		} & DefaultSession['user'];
	}
	interface User {
		role: string;
	}
}
