import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import ThemeProvider from '@/providers/ThemeProvider';

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	return (
		<SessionProvider session={session}>
			<ThemeProvider>
				<Component {...pageProps} />
			</ThemeProvider>
		</SessionProvider>
	);
}
