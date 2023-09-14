import { NextPage } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Container, Error } from '@/styles/sharedStyles';
import styled from 'styled-components';
import { client, generateFormData } from '../../../../../clientHelpers/helpers';
import Editor from '@/components/editor';
import { FinalPost } from '../../../../../types/types';
import { useSession } from 'next-auth/react';

interface Props {}

const Create: NextPage<Props> = () => {
	const [creating, setCreating] = useState(false);
	const [error, setError] = useState('');
	const router = useRouter();
	const { data: session } = useSession();
	const handleSubmit = async (post: FinalPost) => {
		setCreating(true);
		try {
			// we have to generate FormData
			const formData = generateFormData({
				...post,
				authorId: session!.user.id,
			});
			// submit our post
			const res = await client.POST('/api/articles', formData);
			if (res.msg) {
				setCreating(false);
				return setError(res.msg);
			}
			router.push('/admin/posts');
		} catch (error: any) {
			setCreating(false);
			console.log(error.response?.data || error);
		}
		setCreating(false);
	};
	return (
		<CContainer>
			<Editor onSubmit={handleSubmit} busy={creating} />
			{error && <Error bottom='90%'>{error}</Error>}
		</CContainer>
	);
};

const CContainer = styled(Container)`
	margin-bottom: 20rem;
	margin-top: 100px;
	position: relative;
`;

export default Create;
