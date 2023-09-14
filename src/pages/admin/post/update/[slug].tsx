import { Container } from '@/styles/sharedStyles';
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { client, generateFormData } from '../../../../../clientHelpers/helpers';
import { API_URL } from '../../../../../config/config';
import { useRouter } from 'next/router';
import Editor from '@/components/editor';
import { FinalPost } from '../../../../../types/types';
import { useSession } from 'next-auth/react';
import Loading from '@/components/Loading';
import useFetch from '@/hooks/useFetch';

interface Props {}

const UpdatePost: FC<Props> = (props): JSX.Element => {
	const router = useRouter();
	const [creating, setCreating] = useState(false);
	const { data: session } = useSession();
	const { data, loading } = useFetch(
		`${API_URL}/articles/${router.query.slug}`
	);

	const handleSubmit = async (post: FinalPost) => {
		delete post.category;
		setCreating(true);
		try {
			// we have to generate FormData
			const formData = generateFormData({
				...post,
				authorId: session!.user.id,
			});
			// submit our post
			await client.PATCH(`${API_URL}/articles/${router.query.slug}`, formData);
			router.push('/admin/posts');
		} catch (error: any) {
			console.log(error.response.data);
		}
		setCreating(false);
	};

	return (
		<CContainer>
			{loading && <Loading />}
			{!loading && data && !data.msg && (
				<Editor
					initialValue={{
						...data,
						thumbnail: data.thumbnailUrl,
						tags: data.tags.map((tag: any) => tag.name),
					}}
					onSubmit={handleSubmit}
					busy={creating}
				/>
			)}
		</CContainer>
	);
};

export default UpdatePost;

const CContainer = styled(Container)`
	margin-bottom: 20rem;
	margin-top: 100px;
`;
