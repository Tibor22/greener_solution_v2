import { FC } from 'react';
import { UpdateObj } from '../../../../types/types';
import prisma from '../../../../lib/prisma';
import ArticleBox from '@/components/ArticleBox';

export async function getStaticProps() {
	const posts = await prisma.article.findMany();
	const serializedPosts = posts.map((post) => ({
		...post,
		createdAt: post.createdAt.toISOString(),
		updatedAt: post.createdAt.toISOString(),
	}));

	// Props returned will be passed to the page component
	return { props: { posts: serializedPosts }, revalidate: 10 };
}

const Index: FC<{ posts: UpdateObj[] }> = ({ posts }): JSX.Element => {
	console.log('posts:', posts);
	return (
		<div>
			{posts.map((post: UpdateObj) => {
				return <ArticleBox post={post} />;
			})}
		</div>
	);
};

export default Index;
