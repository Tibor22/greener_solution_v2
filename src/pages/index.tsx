import Hero from '@/components/Hero';
import { Text } from '@/styles/sharedStyles';
import styled from 'styled-components';
import CategoryLabel from '@/components/CategoryLabel';
import { FeaturedType, HeroType } from '../../types/types';
import prisma from '../../lib/prisma';
import { MdEnergySavingsLeaf, MdSavings } from 'react-icons/md';
import { RiRecycleFill } from 'react-icons/ri';
import { FaThermometerThreeQuarters } from 'react-icons/fa';
import { Heading } from '@/styles/sharedStyles';
import Link from 'next/link';
import { MAIN_URL } from '../../config/config';
import Featured from '@/components/Featured';
import Newsletter from '@/components/Newsletter';
import ArticleUiBox from '@/components/ArticleUiBox';
import FeaturedArticle from '@/components/FeaturedArticle';
declare type Props = {
	data: {
		hero: HeroType;
		featuredArticles: FeaturedType[];
		articles: FeaturedType[];
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

		const featuredArticles = await prisma.article.findMany({
			where: { featured: true },
			select: {
				slug: true,
				title: true,
				thumbnailUrl: true,
				authorId: true,
				category: true,
				excerpt: true,
			},
		});

		const articles = await prisma.article.findMany({
			where: { featured: false, hero: false },
			select: {
				slug: true,
				title: true,
				thumbnailUrl: true,
				authorId: true,
				category: true,
			},
			take: 5,
		});

		return {
			props: { data: { hero: hero[0], featuredArticles, articles } },
			revalidate: 1,
		};
	} catch (error) {
		console.log(error);
	}
}

export default function Home({ data }: Props) {
	// console.log('HERO', data.hero);
	// console.log('Featured article', data.featuredArticles);
	// console.log('normal article', data.articles);

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
		<div
			style={{
				width: '100%',
				padding: '0px 15px',
				maxWidth: '1500px',
				margin: '0 auto',
			}}
		>
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
							key={category.name}
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
			<FeaturedSection>
				<CategoriesHeading>
					<Heading family={'montserrat'} level={2}>
						TOP ARTICLES
					</Heading>
				</CategoriesHeading>
				<FeaturedContainer>
					{data.featuredArticles.slice(0, 4).map((article, i) => (
						<Featured key={article.title} index={i} article={article} />
					))}
				</FeaturedContainer>
			</FeaturedSection>
			<NewsletterSection>
				<Newsletter />
			</NewsletterSection>
			<ArticlesSection>
				<div>
					<Heading family={'montserrat'} level={2}>
						RECENT ARTICLES
					</Heading>
					<ArticlesContainer>
						{data.articles.length > 0 &&
							data.articles.map((article) => {
								return (
									<ArticleUiBox
										article={{ ...article, category: article.category.name }}
									></ArticleUiBox>
								);
							})}
					</ArticlesContainer>
				</div>
				{data.featuredArticles.length > 0 && (
					<div>
						<Heading family={'montserrat'} level={2}>
							FEATURED
						</Heading>
						<FeaturedArticle
							article={[...data.featuredArticles].pop() as FeaturedType}
						/>
					</div>
				)}
			</ArticlesSection>
		</div>
	);
}

const ArticlesContainer = styled.div`
	margin-top: 3rem;
	display: grid;
	grid-auto-rows: 1fr;
	gap: 3rem;
`;

const ArticlesSection = styled.section`
	margin-bottom: 10rem;
	display: grid;
	grid-template-columns: 4fr 2fr;
	gap: 20%;
`;

const NewsletterSection = styled.section`
	margin: 8rem 0rem;
`;
const FeaturedContainer = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-auto-rows: 1fr;
	gap: 5rem;
	margin: 0rem 0rem 3rem 0rem;
`;

const FeaturedSection = styled.div``;

const Labels = styled.div`
	display: flex;
	justify-content: space-around;
`;

const CategoriesHeading = styled.div`
	display: flex;
	justify-content: space-between;
`;

const HeroSection = styled.section`
	height: 70vh;
	width: 100%;
`;

const CategoriesSection = styled.section`
	margin: 3rem 0rem;
`;
