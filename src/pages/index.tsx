import Hero from '@/components/Hero';
import { Text } from '@/styles/sharedStyles';
import styled from 'styled-components';
import CategoryLabel from '@/components/CategoryLabel';
import { HeroType } from '../../types/types';
import prisma from '../../lib/prisma';
import { MdEnergySavingsLeaf, MdSavings } from 'react-icons/md';
import { RiRecycleFill } from 'react-icons/ri';
import { FaThermometerThreeQuarters } from 'react-icons/fa';
import { Heading } from '@/styles/sharedStyles';
import Link from 'next/link';
import { MAIN_URL } from '../../config/config';
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

		return { props: { data: { hero: hero[0] } }, revalidate: 1 };
	} catch (error) {
		console.log(error);
	}
}

export default function Home({ data }: Props) {
	console.log('HERO', data.hero);

	const categories = [
		{
			icon: <MdEnergySavingsLeaf color='white' size={'50%'} />,
			name: 'Energy',
			bgColor: ' #EBE444',
		},
		{
			icon: <RiRecycleFill color='white' size={'50%'} />,
			name: 'Recycle',
			bgColor: '#BFC677',
		},
		{
			icon: <MdSavings color='white' size={'50%'} />,
			name: 'Savings',
			bgColor: '#C477C6',
		},
		{
			icon: <FaThermometerThreeQuarters color='white' size={'50%'} />,
			name: 'Climate',
			bgColor: '#77C1C6',
		},
	];
	return (
		<div style={{ width: '100%', padding: '0px 15px' }}>
			<HeroSection>
				<Hero hero={data.hero} />
			</HeroSection>
			<CategoriesSection>
				<CategoriesHeading>
					<Heading family={'montserrat'} level={2}>
						CATEGORIES
					</Heading>
					<Link href={`${MAIN_URL}/categories/all`}>
						<Text color='black'>VIEW ALL</Text>
					</Link>
				</CategoriesHeading>
				<Labels>
					{categories.map((category) => (
						<Link
							href={`${MAIN_URL}/categories/${category.name.toLowerCase()}`}
						>
							<CategoryLabel
								bgColor={category.bgColor}
								name={category.name}
								type='column'
							>
								{category.icon}
							</CategoryLabel>
						</Link>
					))}
				</Labels>
			</CategoriesSection>
		</div>
	);
}

const Labels = styled.div`
	display: flex;
	justify-content: space-around;
`;

const CategoriesHeading = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 2rem;
`;

const HeroSection = styled.section`
	height: 70vh;
	width: 100%;
`;

const CategoriesSection = styled.section`
	margin: 3rem 0rem;
`;
