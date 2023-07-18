import { Dispatch, FC, SetStateAction, useState } from 'react';
import { UpdateObj } from '../../types/types';
import styled from 'styled-components';
import Button from './Button';
import { fonts, palette } from '@/styles/common';
import Image from 'next/image';
import { client } from '../../clientHelpers/helpers';
import { API_URL, MAIN_URL } from '../../config/config';
import Loading from './Loading';
import { useRouter } from 'next/router';

interface Props {
	post: UpdateObj;
	setPosts: Dispatch<SetStateAction<UpdateObj[]>>;
}

const ArticleBox = ({ post, setPosts }: Props): JSX.Element => {
	const [deleting, setDeleting] = useState(false);
	const router = useRouter();

	const handleDelete = async () => {
		setDeleting(true);
		const deletedObj = await client.DELETE(`${API_URL}/articles/${post.slug}`);
		setPosts((prevPosts) => {
			return prevPosts.filter((post) => post.slug !== deletedObj.slug);
		});
		setDeleting(false);
	};
	const handleEdit = async () => {
		router.push(`${MAIN_URL}/admin/post/update/${post.slug}`);
	};

	return (
		<OuterWrapper>
			{deleting && <Loading />}
			{!deleting && (
				<InnerWrapper>
					<BoxWrapper>
						<BoxHeader>Id</BoxHeader>
						<Box>{post.id}</Box>
					</BoxWrapper>
					<BoxWrapper>
						<BoxHeader>Thumbnail</BoxHeader>
						<div style={{ padding: '0.5rem 0rem', border: '1px solid grey' }}>
							<BoxImg>
								<Image
									style={{
										objectFit: 'contain',
									}}
									alt={post.title}
									fill
									src={post.thumbnailUrl}
								></Image>
							</BoxImg>
						</div>
					</BoxWrapper>
					<BoxWrapper>
						<BoxHeader>Title</BoxHeader>
						<Box>{post.title}</Box>
					</BoxWrapper>
				</InnerWrapper>
			)}
			<Button ifClicked={handleEdit} type='primary'>
				Edit
			</Button>
			<Button ifClicked={handleDelete} background='red'>
				Delete
			</Button>
		</OuterWrapper>
	);
};

const OuterWrapper = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	gap: 1rem;
`;
const InnerWrapper = styled.div`
	display: grid;
	grid-template-columns: auto auto 1fr;
	width: 100%;
	border-radius: 12px 12px 0px 0px;
	overflow: hidden;
`;

const Box = styled.div`
	font-size: ${fonts.mediumLarge};
	position: relative;
	padding: 0.5rem 2rem;
	height: 4rem;
	border: 1px solid grey;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const BoxImg = styled.div`
	font-size: ${fonts.mediumLarge};
	position: relative;
	height: 4rem;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const BoxHeader = styled.div`
	font-size: ${fonts.medium};
	background: ${palette.medium_brown};
	color: ${palette.grey_light2};
	text-align: center;
	padding: 0.5rem 3rem;
`;
const BoxWrapper = styled.div``;

export default ArticleBox;
