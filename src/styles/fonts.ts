import { Montserrat, Playfair_Display, Merriweather } from 'next/font/google';

export const montserrat = Montserrat({
	subsets: ['latin'],
	display: 'swap',
});

export const playfair_display = Playfair_Display({
	subsets: ['latin'],
	display: 'swap',
});
export const merriweather = Merriweather({
	subsets: ['latin'],
	display: 'swap',
	weight: ['300', '400', '700'],
});
