import { Heading, Text } from '@/styles/sharedStyles';
import { FC } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { FeaturedType } from '../../types/types';
import Image from 'next/image';
import { fonts, palette } from '@/styles/common';
import Link from 'next/link';
import { MAIN_URL } from '../../config/config';
import { device } from '@/styles/device';

interface Props {
	article: FeaturedType;
	index: number;
}

const Featured: FC<Props> = ({ article, index }): JSX.Element => {
	return (
		<CLink index={index} href={`${MAIN_URL}/article/${article.slug}`}>
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
`;

const CLink = styled(Link)<{ index: number }>`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: end;
	position: relative;
	border-radius: 12px;
	padding: 1.5rem;
	grid-column: 1fr;
	${device.tablet} {
		grid-column: ${({ index }) =>
			index === 0 ? '1/3' : index === 3 ? '2/4' : 'auto'};
	}

	& img {
		border-radius: 12px;
	}
	transition: transform 0.3s ease-out;
	cursor: pointer;
	&:hover {
		transform: translateY(-5px);
	}
	padding-top: 6rem;
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

export default Featured;
