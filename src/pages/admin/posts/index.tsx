import { FC } from 'react';
import { UpdateObj } from '../../../../types/types';
import prisma from '../../../../lib/prisma';
import ArticleBox from '@/components/ArticleBox';
import { NextApiRequest, NextApiResponse } from 'next';
import styled from 'styled-components';

export async function getStaticProps(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const posts = await prisma.article.findMany({
		select: {
			title: true,
			slug: true,
			published: true,
			tags: true,
			categoryName: true,
			id: true,
			authorId: true,
			thumbnailUrl: true,
		},
	});

	return { props: { posts: posts }, revalidate: 10 };
}

const Index: FC<{ posts: UpdateObj[] }> = ({ posts }): JSX.Element => {
	console.log('posts:', posts);
	return (
		<Wrapper>
			<ArticlesContainer>
				{posts.map((post: UpdateObj) => {
					return <ArticleBox post={post} />;
				})}
			</ArticlesContainer>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
`;

const ArticlesContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	width: 100%;
	padding: 2rem;
	max-width: 800px;
`;

export default Index;
