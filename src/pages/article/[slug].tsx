import { GetStaticPaths, GetStaticProps } from 'next';
import { FC } from 'react';
import prisma from '../../../lib/prisma';
import React from 'react';
import parse from 'html-react-parser';
import styled from 'styled-components';
import { fonts } from '@/styles/common';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Container } from '@/styles/sharedStyles';
import { useRouter } from 'next/router';
import { device } from '@/styles/device';

interface Props {
	article: {
		content: string;
		title: string;
		meta: string;
	};
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
		},
	});
	return {
		props: {
			slug,
			article,
		},
		revalidate: 10,
	};
};

const Article: FC<Props> = ({ article, slug }: Props): JSX.Element => {
	const router = useRouter();
	return (
		<div style={{ position: 'relative', width: '100%' }}>
			<BackButton role='button' onClick={() => router.back()}>
				<AiOutlineArrowLeft />
			</BackButton>
			<RichText>{parse(article.content)}</RichText>
		</div>
	);
};

const BackButton = styled.div`
	font-size: 3rem;
	left: 2rem;
	${device.laptop} {
		font-size: 3rem;
		left: 2rem;
	}
	position: absolute;
	top: 3rem;

	cursor: pointer;
`;

const RichText = styled.div`
	margin: 4rem auto;
	${device.laptop} {
		margin: 0 auto;
		max-width: 60%;
	}

	padding: 15px;

	& h1 {
		font-size: 3.693rem;
	}
	& h2 {
		font-size: 2.8rem;
	}

	p {
		font-size: ${fonts.regular};
	}

	img {
		margin-bottom: 3rem;
	}
`;

export default Article;
