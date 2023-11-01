import { GetStaticPaths, GetStaticProps } from 'next';
import { FC } from 'react';
import prisma from '../../../lib/prisma';
import React from 'react';
import parse from 'html-react-parser';
import styled from 'styled-components';
import { fonts, palette } from '@/styles/common';
import { Heading } from '@/styles/sharedStyles';
import { device } from '@/styles/device';
import FeaturedArticle from '@/components/FeaturedArticle';
import { FeaturedType } from '../../../types/types';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import ArticleHeadingDetails from '@/components/ArticleHeadingDetails';

interface Props {
	article: {
		content: string;
		title: string;
		meta: string;
		thumbnailUrl: string;
		createdAt: string;
		updatedAt: string;
		rawTime: string;
		excerpt: string;
	};
	readNext: FeaturedType;
	slug: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
	if (process.env.NODE_ENV === 'development') {
		return {
			paths: [],
			fallback: 'blocking',
		};
	}

	const news = await prisma.article.findMany({
		orderBy: {
			createdAt: 'desc',
		},
		select: {
			slug: true,
		},
		take: 10,
	});

	const paths = news.map((item) => ({
		params: { slug: item.slug },
	}));
	return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async (context) => {
	const slug = context.params?.slug as string;

	const article = await prisma.article.findUnique({
		where: {
			slug: slug,
		},
		select: {
			content: true,
			title: true,
			meta: true,
			thumbnailUrl: true,
			createdAt: true,
			excerpt: true,
		},
	});

	const readNext = await prisma.article.findFirst({
		where: {
			slug: {
				not: slug,
			},
		},
		select: {
			slug: true,
			title: true,
			thumbnailUrl: true,
			authorId: true,
			category: true,
			excerpt: true,
		},
	});

	const formattedDate = new Date(article?.createdAt as Date).toLocaleString(
		'en-GB',
		{
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
		}
	);

	return {
		props: {
			slug,
			article: {
				...article,
				createdAt: formattedDate, // Use the formatted date
				rawTime: article?.createdAt.toISOString(),
			},
			readNext,
		},
		revalidate: 10,
	};
};

const Article: FC<Props> = ({
	article,

	readNext,
}: Props): JSX.Element => {
	return (
		<>
			<NextSeo
				title={article.title}
				description={article.meta}
				openGraph={{
					images: [
						{
							url: article.thumbnailUrl,
							width: 1200,
							height: 627,
						},
					],
				}}
			/>
			<Wrapper>
				<RichText>
					{' '}
					{(parse(article.content) as any)?.length > 0
						? (parse(article.content) as any).map(
								(node: React.ReactElement, i: number, arr: any) => {
									if (node.type === 'img') {
										return (
											<div
												style={{
													width: '100%',
													height: 'auto',
													aspectRatio: '16/9',
													position: 'relative',
													marginBottom: '3rem',
												}}
											>
												<Image
													key={node.key}
													src={node.props.src}
													alt={node.props.alt}
													fill
													style={{ borderRadius: '8px' }}
												/>
											</div>
										);
									}
									if (arr[i - 1]?.type === 'h1') {
										return (
											<ArticleHeadingDetails
												date={article.createdAt}
												rawDate={article.rawTime}
												readingTime={3}
												excerpt={article.excerpt}
											/>
										);
									}

									return node;
								}
						  )
						: parse(article.content)}
				</RichText>
				<LineBreak></LineBreak>
				<ReadMore>
					<Heading style={{ margin: '0 0 3rem 0' }} level={2}>
						What to read next
					</Heading>
					{readNext && <FeaturedArticle article={readNext} />}
				</ReadMore>
			</Wrapper>
		</>
	);
};

const Wrapper = styled.div`
	position: relative;
	width: 100%;
	background: ${palette.light_gradient};
	padding: 15px;
	margin-top: 61px;
	${device.laptop} {
		margin-top: 81px;
	}
`;

const LineBreak = styled.div`
	width: 100%;
	height: 2px;
	background: ${palette.grey_light};
	margin: 3rem auto;
	z-index: 1;
`;

const ReadMore = styled.div`
	box-sizing: border-box;
	max-width: 100%;
	${device.laptop} {
		margin: 0 auto;
		max-width: 60%;
	}
	margin: 3rem auto;
	background: ${palette.white};
	padding: 3rem 3rem 3rem 3rem;
	box-shadow: ${palette.shadow};
	border-radius: ${palette.radius};
	z-index: 0;
`;

// const BackButton = styled.div`
// 	position: absolute;
// 	font-size: 3rem;
// 	left: 2rem;
// 	top: 3rem;
// 	${device.laptop} {
// 		position: sticky;
// 		font-size: 3rem;
// 		left: 14rem;
// 		margin-left: 2rem;
// 		top: 10rem;
// 	}

// 	cursor: pointer;
// `;

const RichText = styled.div`
	margin: 4rem auto;
	${device.tablet} {
		margin: 0 auto;
		max-width: 80%;
	}
	${device.laptop} {
		margin: 0 auto;
		max-width: 60%;
	}
	${device.laptopL} {
		margin: 0 auto;
		max-width: 45%;
	}

	& li {
		margin-left: 5rem;
		list-style-type: none;
		position: relative;
		&::before {
			content: '➼';
			font-size: 2.5rem;
			color: ${palette.light_brown};
			left: -4rem;
			top: -0.5rem;
			position: absolute;
		}
	}

	& h1 {
		font-size: 3.693rem;
	}
	& h2 {
		font-size: 3rem;
	}
	& h3 {
		font-size: 2.6rem;
	}

	p {
		font-size: ${fonts.medium};
		line-height: 2.65rem;
		margin-bottom:3rem;
	}

	${device.laptop} {
		& h1 {
			font-size: 3.693rem;
		}
		& h2 {
			font-size: 2.8rem;
		}
		& h3 {
			font-size: 2.3rem;
		}
		& h3 {
			font-size: 2rem;
		}

		p {
			font-size: ${fonts.regular};
		}

		& li {
			&::before {
				top: -0.7rem;
			}
		}
	
	img {
		margin-bottom: 1rem;
	}

	& span.img-text {
		font-size: ${fonts.small};
		margin-top:-2.5rem;
		display:block;
	}
`;

export default Article;
