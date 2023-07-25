import { Heading, Text } from '@/styles/sharedStyles';
import { FC } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { FeaturedType } from '../../types/types';
import Image from 'next/image';

interface Props {
	article: FeaturedType;
	index: number;
}

const Featured: FC<Props> = ({ article, index }): JSX.Element => {
	console.log('ARTICLE:', article);
	return (
		<Container index={index}>
			<Image
				style={{ objectFit: 'cover' }}
				alt={article.title}
				fill
				src={article.thumbnailUrl}
			/>

			<Label>{article.category.name}</Label>
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
		</Container>
	);
};

const InnerWrapper = styled.div`
	position: relative;
`;

const Container = styled.div<{ index: number }>`
	display: flex;
	flex-direction: column;
	justify-content: end;
	position: relative;
	border-radius: 12px;
	padding: 1.5rem;
	grid-column: ${({ index }) =>
		index === 0 ? '1/3' : index === 3 ? '2/4' : 'auto'};
	& img {
		border-radius: 12px;
	}
	transition: transform 0.3s ease-out;
	cursor: pointer;
	&:hover {
		transform: translateY(-5px);
	}
`;

const Label = styled.div``;

export default Featured;
