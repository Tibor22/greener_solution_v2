import { FC } from 'react';
import { Heading, Text } from '@/styles/sharedStyles';
import { FeaturedType } from '../../types/types';
import styled from 'styled-components';
import { fonts, palette } from '@/styles/common';
import Link from 'next/link';
import Image from 'next/image';
import { MAIN_URL } from '../../config/config';
import Button from './Button';
interface Props {
	article: FeaturedType;
}

const FeaturedArticle: FC<Props> = ({ article }): JSX.Element => {
	return (
		<CLink href={`${MAIN_URL}/article/${article.slug}`}>
			<Overlay></Overlay>
			<Image
				style={{ objectFit: 'cover' }}
				alt={article.title}
				fill
				src={article.thumbnailUrl}
			/>
			<div style={{ zIndex: '2' }}>
				<Label>
					<Text bold xxsmall>
						{article.category.name}
					</Text>
				</Label>
				<InnerWrapper>
					<Heading color='white' style={{ position: 'relative' }} level={2}>
						{article.title}
					</Heading>
					{article.excerpt && (
						<Text style={{ position: 'relative' }} color='white'>
							{article.excerpt}
						</Text>
					)}
					<Button type='primary'>Read More</Button>
				</InnerWrapper>
			</div>
			{/* </Container> */}
		</CLink>
	);
};

const Overlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: linear-gradient(
		rgba(254, 254, 254, 0) 0%,
		rgba(9, 9, 9, 0.663) 100%
	);
	z-index: 1;
	border-radius: 12px;
`;

const InnerWrapper = styled.div`
	position: relative;
	margin-top: 5rem;
`;

const CLink = styled(Link)`
	display: flex;
	flex-direction: column;
	justify-content: end;
	position: relative;
	border-radius: 12px;
	padding: 1.5rem;
	box-shadow: ${palette.shadow};
	& img {
		border-radius: 12px;
	}
	transition: transform 0.3s ease-out;
	cursor: pointer;
	&:hover {
		transform: translateY(-5px);
	}
`;

const Label = styled.div`
	padding: 0rem 1rem;
	background-color: ${palette.light_brown};
	color: white;
	position: relative;
	position: absolute;
	top: 1rem;
	right: 1rem;
	border-radius: 12px;
	font-size: ${fonts.xxsmall};
	letter-spacing: 1px;
	font-family: montserrat;
	text-transform: uppercase;
	font-weight: bold;
`;

export default FeaturedArticle;
