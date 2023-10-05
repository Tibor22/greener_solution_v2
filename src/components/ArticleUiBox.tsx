import { FC, memo } from 'react';
import Image from 'next/image';
import { Heading, Label, Text } from '@/styles/sharedStyles';
import styled from 'styled-components';
import { palette } from '@/styles/common';
import Link from 'next/link';
import { MAIN_URL } from '../../config/config';
interface Props {
	article: {
		category: string;
		title: string;
		thumbnailUrl: string;
		slug: string;
	};
}

const ArticleUiBox: FC<Props> = memo(({ article }): JSX.Element => {
	return (
		<Wrapper href={`${MAIN_URL}/article/${article.slug}`}>
			<ImageWrapper>
				<Image
					style={{ objectFit: 'cover' }}
					fill
					alt={article.title}
					src={article.thumbnailUrl}
				/>
			</ImageWrapper>
			<Desc>
				<LabelWrapper>
					<Label color='medium_brown'>{article.category}</Label>
				</LabelWrapper>

				<Heading level={2}>{article.title}</Heading>
			</Desc>
		</Wrapper>
	);
});
const LabelWrapper = styled.div`
	position: absolute;
	top: 0.5rem;
	right: 0.5rem;
	white-space: nowrap;
`;
const Desc = styled.div`
	flex-basis: 70%;
	display: flex;
	align-items: center;
	padding: 2rem 2rem 2rem 0rem;
`;

const Wrapper = styled(Link)`
	position: relative;
	display: flex;
	min-height: 16rem;
	background: white;
	gap: 3rem;
	box-shadow: ${palette.shadow};
	border-radius: ${palette.radius};
	transition: transform 0.2s ease-out;
	&:hover {
		transform: translateY(-4px);
		cursor: pointer;
	}
`;

const ImageWrapper = styled.div`
	position: relative;
	flex-basis: 30%;
	& img {
		border-radius: ${palette.radius};
	}
`;

export default ArticleUiBox;
