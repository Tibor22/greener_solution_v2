import { FC, useState } from 'react';
import { UpdateObj } from '../../../../types/types';
import prisma from '../../../../lib/prisma';
import ArticleBox from '@/components/ArticleBox';
import styled from 'styled-components';

export async function getStaticProps() {
	const posts = await prisma.article.findMany({
		orderBy: {
			updatedAt: 'desc',
		},
		select: {
			title: true,
			slug: true,
			published: true,
			tags: true,
			categoryName: true,
			id: true,
			authorId: true,
			thumbnailUrl: true,
			hero: true,
			featured: true,
		},
	});

	return { props: { initialPosts: posts } };
}

const Index: FC<{ initialPosts: UpdateObj[] }> = ({
	initialPosts,
}): JSX.Element => {
	const [posts, setPosts] = useState(initialPosts);

	return (
		<Wrapper>
			<ArticlesContainer>
				{posts &&
					posts.map((post: UpdateObj) => {
						return (
							<ArticleBox setPosts={setPosts} key={post.title} post={post} />
						);
					})}
			</ArticlesContainer>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	margin-top: 100px;
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
