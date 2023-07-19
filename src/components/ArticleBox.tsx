import { Dispatch, SetStateAction, useState } from 'react';
import { UpdateObj } from '../../types/types';
import styled from 'styled-components';
import Button from './Button';
import { fonts, palette } from '@/styles/common';
import Image from 'next/image';
import { client } from '../../clientHelpers/helpers';
import { API_URL, MAIN_URL } from '../../config/config';
import Loading from './Loading';
import { useRouter } from 'next/router';
import { FaCrown } from 'react-icons/fa';
import { GiCrownOfThorns } from 'react-icons/gi';

interface Props {
	post: UpdateObj;
	setPosts: Dispatch<SetStateAction<UpdateObj[]>>;
}

const ArticleBox = ({ post, setPosts }: Props): JSX.Element => {
	const [deleting, setDeleting] = useState(false);
	const [loading, setLoading] = useState({ hero: false, featured: false });
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

	const handleHero = async () => {
		setLoading({ ...loading, hero: true });
		const article = await client.PATCH(`${API_URL}/articles/${post.slug}`, {
			hero: !post.hero,
		});
		if (article) {
			setPosts((prevPosts) => {
				return prevPosts.map((p) => {
					if (p.id === post.id) {
						return { ...post, hero: article.hero };
					}

					return p;
				});
			});
			setLoading({ ...loading, hero: false });
		}
		setLoading({ ...loading, hero: false });
	};

	const handleFeatured = async () => {
		setLoading({ ...loading, featured: true });
		const article = await client.PATCH(`${API_URL}/articles/${post.slug}`, {
			featured: !post.featured,
		});
		if (article) {
			setPosts((prevPosts) => {
				return prevPosts.map((p) => {
					if (p.id === post.id) {
						return { ...post, featured: article.featured };
					}

					return p;
				});
			});
			setLoading({ ...loading, featured: false });
		}
		setLoading({ ...loading, featured: false });
	};
	return (
		<OuterWrapper>
			<IconWrapper>
				{post.hero && <FaCrown color='gold' size={28} />}
				{post.featured && <GiCrownOfThorns color='green' size={28} />}
			</IconWrapper>
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
			<BtnWrapper>
				<Button stretchMobile ifClicked={handleEdit} type='primary'>
					Edit
				</Button>
				<Button stretchMobile ifClicked={handleDelete} type='primary'>
					Delete
				</Button>
				<Button
					busy={loading.hero}
					stretchMobile
					ifClicked={handleHero}
					type='clear'
				>
					{post.hero ? 'Remove Hero' : 'Add Hero'}
				</Button>
				<Button
					busy={loading.featured}
					stretchMobile
					ifClicked={() => handleFeatured()}
					type='clear'
				>
					{post.featured ? 'Remove Featured' : 'Add Featured'}
				</Button>
			</BtnWrapper>
		</OuterWrapper>
	);
};

const IconWrapper = styled.div`
	position: absolute;
	top: -12px;
	right: -3px;
	transform: rotateZ(30deg);
`;

const BtnWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;
`;

const OuterWrapper = styled.div`
	position: relative;
	display: grid;
	align-items: center;
	width: 100%;
	gap: 2rem;

	padding: 1rem;
	border-radius: ${palette.radius};
	box-shadow: ${palette.shadow};
	background-color: white;
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
	background: ${palette.light_brown};
	color: ${palette.grey_light2};
	text-align: center;
	padding: 0.5rem 3rem;
`;
const BoxWrapper = styled.div``;

export default ArticleBox;
