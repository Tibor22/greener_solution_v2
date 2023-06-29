// import Editor, { FinalPost } from '@/components/editor';
import { NextPage } from 'next';
// import AdminLayout from '@/components/common/layout/AdminLayout';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Container } from '@/styles/sharedStyles';
import styled from 'styled-components';
import { generateFormData } from '../../../../../clientHelpers/helpers';
import Editor from '@/components/editor';
import { FinalPost } from '../../../../../types/types';

interface Props {}

const Create: NextPage<Props> = () => {
	const [creating, setCreating] = useState(false);
	const router = useRouter();
	const handleSubmit = async (post: FinalPost) => {
		setCreating(true);
		try {
			// we have to generate FormData
			const formData = generateFormData(post);

			// submit our post
			const { data } = await axios.post('/api/posts', formData);
			router.push('/admin/posts/update/' + data.post.slug);
		} catch (error: any) {
			console.log(error.response.data);
		}
		setCreating(false);
	};
	return (
		// <AdminLayout title='New Post'>
		<CContainer>
			<Editor onSubmit={handleSubmit} busy={creating} />
			EDITOR PAGE
		</CContainer>
		// </AdminLayout>
	);
};

const CContainer = styled(Container)`
	// background: red;
	margin-bottom: 20rem;
`;

export default Create;
