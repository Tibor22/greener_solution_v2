import { FC } from 'react';

import type { GetStaticProps, GetStaticPaths } from 'next';
import { client } from '../../../clientHelpers/helpers';
import prisma from '../../../lib/prisma';
import { FeaturedType } from '../../../types/types';
import styled from 'styled-components';
import { Container, Heading } from '@/styles/sharedStyles';
import FeaturedArticle from '@/components/FeaturedArticle';
import ArticleUiBox from '@/components/ArticleUiBox';
import { device } from '@/styles/device';

interface Props {
	featured: FeaturedType[];
	articles: FeaturedType[];
	slug: string;
	category: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
	const categories = [
		...(await prisma.article.findMany({
			select: { category: true },
		})),
		{ category: { name: 'all', id: null } },
	];

	return {
		paths: categories.map((category) => {
			return {
				params: {
					slug: category!.category!.name,
				},
			};
		}),

		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	const slug = context.params?.slug as string;

	let articles, featuredArticles, category;

	if (slug !== 'all') {
		featuredArticles = await prisma.category.findMany({
			where: {
				name: {
					contains: slug?.replace(/-/g, ' '),
					mode: 'insensitive',
				},
			},
			include: {
				articles: {
					where: { featured: true },
					select: {
						slug: true,
						title: true,
						thumbnailUrl: true,
						authorId: true,
						category: true,
						excerpt: true,
					},
				},
			},

			take: 2,
		});
		articles = await prisma.category.findMany({
			where: {
				name: {
					contains: slug?.replace(/-/g, ' '),
					mode: 'insensitive',
				},
			},
			include: {
				articles: {
					where: {
						featured: false,
						hero: false,
					},
					select: {
						slug: true,
						title: true,
						thumbnailUrl: true,
						authorId: true,
						category: true,
					},
				},
			},
			take: 8,
		});

		if (articles[0].articles.length > 0) {
			articles = articles[0].articles;
			category = articles[0].category?.name;
		}
		if (featuredArticles.length > 0) {
			featuredArticles = featuredArticles[0].articles;
			category = featuredArticles[0]?.category?.name;
		}

		if (featuredArticles.length === 0) {
			return {
				redirect: {
					permanent: false,
					destination: '/categories/all',
				},
			};
		}
	} else {
		featuredArticles = await prisma.article.findMany({
			where: { featured: true },
			select: {
				slug: true,
				title: true,
				thumbnailUrl: true,
				authorId: true,
				category: true,
				excerpt: true,
			},
			take: 2,
		});

		articles = await prisma.article.findMany({
			where: { featured: false, hero: false },
			select: {
				slug: true,
				title: true,
				thumbnailUrl: true,
				authorId: true,
				category: true,
			},
			take: 8,
		});

		category = slug;
	}

	return {
		props: {
			...(featuredArticles && { featured: featuredArticles }),
			...(articles && { articles: articles }),
			slug,
			category,
		},
		revalidate: 10,
	};
};

const Category: FC<Props> = ({
	featured,
	articles,
	category,
}: Props): JSX.Element => {
	return (
		<Wrapper>
			<Heading margin='7rem 0rem 3rem 0rem' family={'montserrat'} level={2}>
				{`FEATURED IN ${category.toUpperCase()}`}
			</Heading>
			<FeaturedSection length={featured.length}>
				{featured.length > 0 &&
					featured.map((f) => {
						return <FeaturedArticle article={f} />;
					})}
			</FeaturedSection>
			<ArticlesSection>
				<div>
					<Heading margin='7rem 0rem 3rem 0rem' family={'montserrat'} level={2}>
						{`MORE FROM  ${category.toUpperCase()}`}
					</Heading>
					<ArticlesContainer>
						{articles &&
							articles.length > 0 &&
							articles.map((article) => {
								return (
									<ArticleUiBox
										key={article.slug}
										article={{ ...article, category: article.category.name }}
									></ArticleUiBox>
								);
							})}
					</ArticlesContainer>
				</div>
				<div></div>
			</ArticlesSection>
		</Wrapper>
	);
};
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

const FeaturedSection = styled.section<{ length: number }>`
	display: grid;
	width: 100%;
	grid-template-columns: 1fr;
	gap: 5vw;
	min-height: 25vh;
	${device.laptop} {
		height: 40vh;
		grid-template-columns: ${({ length }) =>
			length === 1 ? '1fr' : '1fr 1fr'};
	}
`;

const Wrapper = styled.div`
	max-width: 1500px;
	margin: 0 auto;
	padding: 0px 15px;
	width: 100%;
`;

export default Category;
