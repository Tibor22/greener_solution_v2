import Hero from '@/components/Hero';
import { Container } from '@/styles/sharedStyles';
import styled from 'styled-components';

import { HeroType } from '../../types/types';
import prisma from '../../lib/prisma';

declare type Props = {
	data: {
		hero: HeroType;
	};
};

export async function getStaticProps() {
	try {
		const hero = await prisma.article.findMany({
			where: {
				hero: true,
			},
			select: {
				slug: true,
				title: true,
				thumbnailUrl: true,
				authorId: true,
				hero: true,
				category: true,
				excerpt: true,
			},
		});
		console.log('HERO:', hero);
		return { props: { data: { hero: hero[0] } }, revalidate: 1 };
	} catch (error) {
		console.log(error);
	}
}

export default function Home({ data }: Props) {
	console.log('HERO', data.hero);
	return (
		<>
			<HeroSection>
				<Hero hero={data.hero} />
			</HeroSection>
		</>
	);
}

const HeroSection = styled.section`
	height: 70vh;
	width: 100%;
`;
