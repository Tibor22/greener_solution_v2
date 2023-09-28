import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import ThemeProvider from '@/providers/ThemeProvider';
import { Analytics } from '@vercel/analytics/react';

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	return (
		<SessionProvider session={session}>
			<ThemeProvider>
				<Analytics />
				<Component {...pageProps} />
			</ThemeProvider>
		</SessionProvider>
	);
}
