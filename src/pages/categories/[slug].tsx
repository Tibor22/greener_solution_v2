import { FC, useRef, useState } from 'react';

import type { GetStaticProps, GetStaticPaths } from 'next';
import { client } from '../../../clientHelpers/helpers';
import prisma from '../../../lib/prisma';
import { FeaturedType } from '../../../types/types';
import styled from 'styled-components';
import { Container, Heading } from '@/styles/sharedStyles';
import FeaturedArticle from '@/components/FeaturedArticle';
import ArticleUiBox from '@/components/ArticleUiBox';
import { device } from '@/styles/device';
import { palette } from '@/styles/common';
import { Text } from '@/styles/sharedStyles';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Link from 'next/link';
import { MAIN_URL } from '../../../config/config';
import slugify from 'slugify';

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

	const allCategories = await prisma.category.findMany({});

	console.log(allCategories);

	return {
		props: {
			...(featuredArticles && { featured: featuredArticles }),
			...(articles && { articles: articles }),
			slug,
			category,
			allCategories: allCategories.map((category) => category.name),
		},
		revalidate: 10,
	};
};

const Category: FC<Props> = ({
	featured,
	articles,
	category,
	allCategories,
}: Props): JSX.Element => {
	console.log('ALL CATEGORIES:', allCategories);
	const [scrollEnd, setScrollEnd] = useState<{
		right: boolean;
		left: boolean;
	}>({
		right: allCategories.length < 5 ? false : true,
		left: false,
	});

	const slider = useRef<HTMLDivElement>(null);
	let isDown = false;
	let startX: number;
	let scrollLeft: number;
	const slideBy: number = 200;
	const handleMouseDown = (e: MouseEvent): any => {
		isDown = true;
		startX = e.pageX - slider.current!.offsetLeft;
		scrollLeft = slider.current!.scrollLeft;
	};

	const handleMouseLeave = () => {
		isDown = false;
	};

	const handleMouseUp = () => {
		isDown = false;
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (!isDown) return;
		e.preventDefault();
		const x = e.pageX - slider.current!.offsetLeft;
		const walk = x - startX;
		slider.current!.scrollLeft = scrollLeft - walk;

		setTimeout(
			() =>
				setScrollEnd({
					left: !(scrollLeft - walk <= 0),
					right:
						scrollLeft - walk + slider.current!.clientWidth <=
						slider.current!.scrollWidth,
				}),
			300
		);
	};
	return (
		<Wrapper>
			<SliderOuterWrapper>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					{scrollEnd.left && (
						<AiOutlineArrowLeft
							// size={32}
							onClick={() => {
								slider.current!.scrollLeft -= slideBy;
								setScrollEnd({
									left: !(slider.current!.scrollLeft - slideBy <= 0),
									right:
										slider.current!.scrollLeft -
											slideBy +
											slider.current!.clientWidth <=
										slider.current!.scrollWidth,
								});
							}}
						/>
					)}
					<TopicsSlider
						onMouseLeave={handleMouseLeave}
						onMouseDown={handleMouseDown}
						onMouseUp={handleMouseUp}
						onMouseMove={handleMouseMove}
						ref={slider}
					>
						{allCategories &&
							allCategories.map((c) => (
								<TopicContainer key={c} xsmall active={c === category}>
									<Link
										href={`${MAIN_URL}/categories/${slugify(c.toLowerCase())}`}
									>
										{c}
									</Link>
								</TopicContainer>
							))}
					</TopicsSlider>
					{scrollEnd.right && (
						<AiOutlineArrowRight
							// size={32}
							onClick={() => {
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
							}}
						/>
					)}
				</div>
			</SliderOuterWrapper>

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

const SliderOuterWrapper = styled.div`
	z-index: 10;
	position: sticky;
	top: 80px;
	background: white;
	margin: 0px -15px;
	padding: 0px 15px;
	font-size: 4rem;

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
