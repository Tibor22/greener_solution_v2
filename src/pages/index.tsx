import Hero from '@/components/Hero';
import { Text } from '@/styles/sharedStyles';
import styled from 'styled-components';
import CategoryLabel from '@/components/CategoryLabel';
import {
	FeaturedType,
	HeroType,
	PollutionData,
	WeatherData,
} from '../../types/types';
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
import { device } from '@/styles/device';
import { palette } from '@/styles/common';
import { NextSeo } from 'next-seo';
import Widget from '@/components/Widget';

declare type Props = {
	data: {
		hero: HeroType | null;
		featuredArticles: FeaturedType[] | [];
		articles: FeaturedType[] | [];
		worldNews: FeaturedType;
		weather: WeatherData;
		pollution: PollutionData;
	};
};

export async function getStaticProps() {
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
		// take: 5,
	});
	const worldNews = await prisma.article.findFirst({
		where: {
			category: {
				is: {
					name: 'world',
				},
			},
		},
		orderBy: {
			createdAt: 'desc',
		},
		select: {
			slug: true,
			title: true,
			thumbnailUrl: true,
			authorId: true,
			category: true,
			excerpt: true,
		},
		take: 1,
	});

	const weather = await prisma.weather.findUnique({
		where: {
			id: 1,
		},
		select: {
			location: true,
			temperature: true,
		},
	});
	const pollution = await prisma.pollution.findUnique({
		where: {
			id: 1,
		},
		select: {
			location: true,
			data: true,
		},
	});

	return {
		props: {
			data: {
				hero: hero[0] ? hero[0] : null,
				featuredArticles: featuredArticles || [],
				articles: articles || [],
				weather: weather ? weather : null,
				pollution: pollution ? pollution : null,
				worldNews: worldNews || [],
			},
		},
		revalidate: 1,
	};
}

export default function Home({ data }: Props) {
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
		<Wrapper>
			<meta
				name='facebook-domain-verification'
				content='2kjfrr37cj54nsosguqtfxclg5wttb'
			/>
			<NextSeo
				title='Climate Change & Energy News | Your Source for Environmental Updates'
				description='Stay informed about the latest developments in climate change and energy on our environmental news platform.'
				openGraph={{
					images: [
						{
							url: `/newsletter2.jpg`,
							width: 1200,
							height: 627,
						},
					],
				}}
			/>
			<HeroSection>{data.hero && <Hero hero={data.hero} />}</HeroSection>

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
							style={{ justifySelf: 'center' }}
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
			{data?.worldNews && data?.weather && data?.pollution && (
				<WorldSection>
					<Heading family={'montserrat'} level={2}>
						FROM AROUND THE WORLD
					</Heading>
					<WorldSectionWrapper>
						<FeaturedWrapper>
							{data.worldNews && (
								<Featured
									article={{
										...data.worldNews,
									}}
									index={2}
								></Featured>
							)}
						</FeaturedWrapper>
						<Widget
							type='temperature'
							data={data.weather.temperature}
							location={data.weather.location}
						/>

						<Widget
							type='pollution'
							data={`${data.pollution.data} AQI`}
							location={data.pollution.location}
						/>
					</WorldSectionWrapper>
				</WorldSection>
			)}
			<FeaturedSection>
				<CategoriesHeading>
					<Heading family={'montserrat'} level={2}>
						TOP ARTICLES
					</Heading>
				</CategoriesHeading>
				{data.featuredArticles.length > 0 && (
					<FeaturedContainer>
						{data.featuredArticles.slice(0, 4).map((article, i) => (
							<Featured key={article.title} index={i} article={article} />
						))}
					</FeaturedContainer>
				)}
			</FeaturedSection>
			<NewsletterSection>
				<Newsletter />
			</NewsletterSection>
			<ArticlesSection>
				<div>
					<Heading family={'montserrat'} level={2}>
						RECENT ARTICLES
					</Heading>
					{data.articles.length > 0 && (
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
					)}
				</div>
				{data.featuredArticles.length > 0 && (
					<FeaturedC>
						<Heading family={'montserrat'} level={2}>
							FEATURED
						</Heading>
						<FeaturedArticle
							article={[...data.featuredArticles].pop() as FeaturedType}
						/>
					</FeaturedC>
				)}
			</ArticlesSection>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	width: 100%;
	max-width: 1500px;
	margin: 0 auto;
	padding: 0px 15px;
	background: ${palette.light_gradient};
`;

const WorldSectionWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: auto auto;
	gap: 2rem;
	row-gap: 4rem;
	@media (min-width: 500px) {
		justify-items: center;
		gap: 6rem;
		row-gap: 6rem;
	}
	${device.tablet} {
		justify-items: center;
		gap: 6rem;
	}
	${device.laptop} {
		grid-template-columns: 1fr 30rem 30rem;
	}
`;

const FeaturedWrapper = styled.div`
	grid-column: 1 / -1;
	justify-self: stretch;

	${device.laptop} {
		grid-column: 1 / 2;
	}
`;

const WorldSection = styled.section`
	margin: 6rem 0rem 4rem 0rem;
`;

const FeaturedC = styled.div`
	display: none;
	${device.tablet} {
		display: unset;
	}
`;

const ArticlesContainer = styled.div`
	margin-top: 3rem;
	display: grid;
	grid-auto-rows: 1fr;
	gap: 3rem;
`;

const ArticlesSection = styled.section`
	margin-bottom: 5rem;
	${device.tablet} {
		margin-bottom: 10rem;
		display: grid;
		grid-template-columns: 4fr 2fr;
		gap: 20%;
	}
`;

const NewsletterSection = styled.section`
	margin: 8rem 0rem;
`;
const FeaturedContainer = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr;
	grid-auto-rows: 1fr;
	gap: 5rem;
	margin: 0rem 0rem 3rem 0rem;
	${device.tablet} {
		grid-template-columns: 1fr 1fr 1fr;
	}
`;

const FeaturedSection = styled.div``;

const Labels = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 3rem;

	${device.tablet} {
		grid-template-columns: 1fr 1fr;
	}

	${device.laptop} {
		grid-template-columns: 1fr 1fr 1fr 1fr;
		gap: 0rem;
	}
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
