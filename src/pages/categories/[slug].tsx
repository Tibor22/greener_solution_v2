import { FC } from 'react';

import type { GetStaticProps, GetStaticPaths } from 'next';
import { client } from '../../../clientHelpers/helpers';
import prisma from '../../../lib/prisma';
import { FeaturedType } from '../../../types/types';

interface Props {
	featured: FeaturedType[];
	articles: FeaturedType[];
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

	let articles, featuredArticles;

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
	}
	// create right format
	console.log(' ARTICLES:', articles);

	return {
		props: {
			...(featuredArticles && { featured: featuredArticles }),
			...(articles && { articles: articles }),
		},
	};
};

const Category: FC<Props> = ({ featured, articles }: Props): JSX.Element => {
	console.log('FEATURED:', featured, 'ARTICLES:', articles);
	return <div>Category</div>;
};

export default Category;
