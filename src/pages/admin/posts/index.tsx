import { FC, useEffect, useState } from 'react';
import { UpdateObj } from '../../../../types/types';
import ArticleBox from '@/components/ArticleBox';
import styled from 'styled-components';
import { client } from '../../../../clientHelpers/helpers';
import { API_URL } from '../../../../config/config';

const Index: FC<{ initialPosts: UpdateObj[] }> = ({
	initialPosts,
}): JSX.Element => {
	const [posts, setPosts] = useState(initialPosts);

	useEffect(() => {
		const getPosts = async () => {
			const data = await client.GET(`${API_URL}/fetchers/article`);

			setPosts(data.posts);
		};
		getPosts();
	}, [posts]);

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
