import { FC } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Heading, Label, Text } from '@/styles/sharedStyles';
import Button from './Button';
import { HeroType } from '../../types/types';
import { useRouter } from 'next/router';
import { device } from '@/styles/device';

import { MAIN_URL } from '../../config/config';
import { palette } from '@/styles/common';

interface Props {
	hero: HeroType;
}

const Hero: FC<Props> = ({ hero }: Props): JSX.Element => {
	const router = useRouter();
	return (
		<Wrapper>
			<Image
				style={{ objectFit: 'cover' }}
				fill
				alt={hero.title}
				src={hero.thumbnailUrl}
			/>
			<DetailsContainer>
				<HeadingWrap>
					<Heading margin='0rem' level={1}>
						{hero.title}
					</Heading>
					<Label color='red'>{hero.category.name}</Label>
				</HeadingWrap>

				<Description small>{hero.excerpt}</Description>

				<Button
					ifClicked={() => router.push(`${MAIN_URL}/article/${hero.slug}`)}
					type='primary'
				>
					Read more
				</Button>
			</DetailsContainer>
		</Wrapper>
	);
};

const HeadingWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 2rem;
`;

const DetailsContainer = styled.div`
	position: relative;
	width: calc(100% - 60px);
	margin: 0 auto;

	${device.tablet} {
		width: 50rem;
		margin-left: 15vw;
	}

	background: white;
	padding: 3rem;
	border-radius: 8px 8px 0px 0px;
	z-index: 2;
	transform: translateY(1px);

	${device.tablet} {
		&::after {
			content: '';
			z-index: -1;
			position: absolute;
			background: white;
			opacity: 0.7;
			width: 100%;
			height: 100%;
			top: -18%;
			border-radius: 8px;
			transform: rotateZ(25deg);
		}
	}
`;
const Description = styled(Text)`
	max-width: 80%;
	margin-bottom: 2rem;
`;

const Wrapper = styled.div`
	margin: 0 -15px;
	position: relative;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	${device.laptop} {
		border-radius: 0px 0px 8px 8px;
		shadow: ${palette.shadow};
		& img {
			border-radius: 0px 0px 8px 8px;
		}
	}
`;

export default Hero;
