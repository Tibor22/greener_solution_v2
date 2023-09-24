import { FC, useCallback, useMemo, useRef, useState } from 'react';

import type { GetStaticProps, GetStaticPaths } from 'next';
import prisma from '../../../lib/prisma';
import { FeaturedType } from '../../../types/types';
import styled from 'styled-components';
import { Heading } from '@/styles/sharedStyles';
import FeaturedArticle from '@/components/FeaturedArticle';
import ArticleUiBox from '@/components/ArticleUiBox';
import { device } from '@/styles/device';
import { palette } from '@/styles/common';
import { Text } from '@/styles/sharedStyles';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Link from 'next/link';
import { MAIN_URL } from '../../../config/config';
import slugify from 'slugify';
import { PrismaClient } from '@prisma/client';

interface Props {
	featured: FeaturedType[];
	articles: FeaturedType[];
	slug: string;
	category: string;
	allCategories: string[];
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
				article: {
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
				article: {
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

		if (articles[0].article.length > 0 || articles.length > 0) {
			articles = articles[0].article;
			category = articles[0]?.category?.name;
		}
		if (featuredArticles.length > 0) {
			featuredArticles = featuredArticles[0].article;
			category = category || featuredArticles[0]?.category?.name;
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

	const allCategories = await prisma.category.findMany({});

	if (articles.length === 0 && featuredArticles.length === 0) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			...(featuredArticles && { featured: featuredArticles }),
			...(articles && { articles: articles }),
			slug,
			category,
			allCategories: allCategories.map((category) => category.name),
		},
		revalidate: 1,
	};
};

const Category: FC<Props> = ({
	featured,
	articles,
	category,
	allCategories,
}: Props): JSX.Element => {
	const [scrollEnd, setScrollEnd] = useState<{
		right: boolean;
		left: boolean;
	}>({
		right: allCategories.length < 5 ? false : true,
		left: false,
	});

	const slider = useRef<HTMLDivElement>(null);
	const featuredMemo = useMemo(() => featured, [category]);
	const articlesMemo = useMemo(() => articles, [category]);
	const slideBy: number = 200;

	const handleLeft = useCallback(() => {
		slider.current!.scrollLeft -= slideBy;
		setScrollEnd({
			left: !(slider.current!.scrollLeft - slideBy <= 0),
			right:
				slider.current!.scrollLeft - slideBy + slider.current!.clientWidth <=
				slider.current!.scrollWidth,
		});
	}, [slideBy]);
	const handleRight = useCallback(() => {
		{
			slider.current!.scrollLeft += slideBy;
			setScrollEnd({
				left: !(slider.current!.scrollLeft + slideBy <= 0),
				right:
					slider.current!.scrollLeft +
						slideBy +
						30 + // width of the arrow
						slider.current!.clientWidth <=
					slider.current!.scrollWidth,
			});
		}
	}, [slideBy]);

	return (
		<div
			style={{
				width: '100%',
				margin: '0 auto',
			}}
		>
			<SliderSpread></SliderSpread>
			<Wrapper>
				<SliderOuterWrapper>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						{scrollEnd.left && (
							<AiOutlineArrowLeft onClick={() => handleLeft()} />
						)}
						<TopicsSlider ref={slider}>
							{allCategories &&
								allCategories.map((c) => (
									<TopicContainer key={c} xsmall active={c === category}>
										<Link
											href={`${MAIN_URL}/categories/${slugify(
												c.toLowerCase()
											)}`}
										>
											{c}
										</Link>
									</TopicContainer>
								))}
						</TopicsSlider>
						{scrollEnd.right && (
							<AiOutlineArrowRight onClick={() => handleRight()} />
						)}
					</div>
				</SliderOuterWrapper>

				<Heading margin='12rem 0rem 3rem 0rem' family={'montserrat'} level={2}>
					{`FEATURED IN ${category.toUpperCase()}`}
				</Heading>
				<FeaturedSection length={featuredMemo.length}>
					{featuredMemo.length > 0 &&
						featuredMemo.map((f) => {
							return <FeaturedArticle article={f} />;
						})}
				</FeaturedSection>
				<ArticlesSection>
					<div>
						<Heading
							margin='7rem 0rem 3rem 0rem'
							family={'montserrat'}
							level={2}
						>
							{`MORE FROM  ${category.toUpperCase()}`}
						</Heading>
						<ArticlesContainer>
							{articlesMemo &&
								articlesMemo.length > 0 &&
								articlesMemo.map((article) => {
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
		</div>
	);
};

const SliderSpread = styled.div`
	z-index: 9;
	position: fixed;
	top: 80px;
	background: white;
	width: 100vw;
	height: 58px;
`;

const SliderOuterWrapper = styled.div`
	z-index: 16;
	position: sticky;
	top: 77px;
	background: white;
	margin: 0px -15px;
	padding: 0px 15px;
	font-size: 4rem;

	${device.laptop} {
		top: 80px;
	}

	${device.laptop} {
		font-size: 2rem;
	}
`;

const TopicContainer = styled(Text)<{ active: boolean }>`
	min-width: max-content;
	text-transform: uppercase;
	letter-spacing: 1.3px;

	& a {
		color: ${({ active }) => (active ? palette.red : 'inherit')};
		:hover {
			color: ${palette.red};
			cursor: pointer;
		}
	}

	&:first-child {
		padding-left: 0rem;
	}
	&:last-child {
		padding-right: 0rem;
	}
`;

const TopicsSlider = styled.div<any>`
	display: flex;
	gap: 2rem;
	background: white;
	flex-wrap: nowrap;
	overflow-x: hidden;
	padding: 1rem 0rem;
	transition: scroll-left 0.3s ease-in-out;
	scroll-behavior: smooth;
	margin-left: 1rem;
	margin-right: 1rem;
`;
const ArticlesContainer = styled.div`
	margin-top: 3rem;
	display: grid;
	grid-auto-rows: 1fr;
	gap: 3rem;
`;

const ArticlesSection = styled.section`
	margin-bottom: 10rem;
	display: grid;
	grid-template-columns: 1fr;
	gap: 20%;

	${device.laptop} {
		grid-template-columns: 4fr 2fr;
	}
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
	overflow: clip;
`;

export default Category;
