import { NextPage } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Container } from '@/styles/sharedStyles';
import styled from 'styled-components';
import { generateFormData } from '../../../../../clientHelpers/helpers';
import Editor from '@/components/editor';
import { FinalPost } from '../../../../../types/types';
import { useSession } from 'next-auth/react';

interface Props {}

const Create: NextPage<Props> = () => {
	const [creating, setCreating] = useState(false);
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
			console.log('FORM DATA:', formData);
			const { data } = await axios.post('/api/articles', formData);
			router.push('/admin/posts');
		} catch (error: any) {
			console.log(error.response?.data || error);
		}
		setCreating(false);
	};
	return (
		<CContainer>
			<Editor onSubmit={handleSubmit} busy={creating} />
		</CContainer>
	);
};

const CContainer = styled(Container)`
	margin-bottom: 20rem;
`;

export default Create;
