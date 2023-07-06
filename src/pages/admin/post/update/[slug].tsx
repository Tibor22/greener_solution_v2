import { Container } from '@/styles/sharedStyles';
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { client, generateFormData } from '../../../../../clientHelpers/helpers';
import { API_URL } from '../../../../../config/config';
import { useRouter } from 'next/router';
import Editor from '@/components/editor';
import { FinalPost, UpdateObj } from '../../../../../types/types';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Loading from '@/components/Loading';

interface Props {}

const UpdatePost: FC<Props> = (props): JSX.Element => {
	const router = useRouter();
	const [loading, isLoading] = useState(false);
	const [post, setPost] = useState<FinalPost | null>(null);
	const [creating, setCreating] = useState(false);
	const { data: session } = useSession();
	console.log(router);

	const handleSubmit = async (post: FinalPost) => {
		setCreating(true);
		try {
			// we have to generate FormData

			delete post.category;
			const formData = generateFormData({
				...post,
				authorId: session!.user.id,
			});
			// submit our post
			const { data } = await client.PATCH(
				`${API_URL}/articles/${router.query.slug}`,
				formData
			);
			router.push('/admin/posts');
		} catch (error: any) {
			console.log(error.response.data);
		}
		setCreating(false);
	};

	useEffect(() => {
		const fetchPost = async () => {
			isLoading(true);
			const post = await client.GET(`${API_URL}/articles/${router.query.slug}`);
			setPost({
				...post,
				thumbnail: post.thumbnailUrl,
				tags: post.tags.map((tag: any) => tag.name).toString(),
			});
			isLoading(false);
		};
		fetchPost();
	}, [router.isReady]);

	console.log('POST:', post);

	return (
		<CContainer>
			{loading && <Loading />}
			{!loading && (
				<Editor initialValue={post} onSubmit={handleSubmit} busy={creating} />
			)}
		</CContainer>
	);
};

export default UpdatePost;

const CContainer = styled(Container)`
	margin-bottom: 20rem;
`;
