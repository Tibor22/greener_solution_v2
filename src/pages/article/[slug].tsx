import { GetStaticPaths, GetStaticProps } from 'next';
import { FC } from 'react';
import prisma from '../../../lib/prisma';

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
	return <div></div>;
};

export default Article;
