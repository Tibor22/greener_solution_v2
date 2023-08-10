import { GetStaticPaths, GetStaticProps } from 'next';
import { FC } from 'react';
import prisma from '../../../lib/prisma';
import { generateHTML, generateJSON } from '@tiptap/html';
import React, { useMemo } from 'react';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Bold from '@tiptap/extension-bold';
import Text from '@tiptap/extension-text';
import parse from 'html-react-parser';
import styled from 'styled-components';
import { fonts } from '@/styles/common';

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
	return <RichText>{parse(article.content)}</RichText>;
};

const RichText = styled.div`
	margin: 0 auto;
	padding: 15px;
	max-width: 60%;
	& h1 {
		font-size: 3.693rem;
	}

	p {
		font-size: ${fonts.regular};
	}

	img {
		margin-bottom: 3rem;
	}
`;

export default Article;
