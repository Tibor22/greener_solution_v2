import { FC } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { MAIN_URL } from '../../config/config';
import { Heading, Text } from '@/styles/sharedStyles';
import Button from './Button';
import { palette } from '@/styles/common';

interface Props {}

const Newsletter: FC<Props> = (props): JSX.Element => {
	return (
		<Container>
			<ImageWrapper>
				<Image
					style={{ objectFit: 'cover' }}
					alt='newsletter'
					fill
					src={`${MAIN_URL}/newsletter2.jpg`}
				/>
			</ImageWrapper>
			<Content>
				<Heading level={1}>Want to help change the world?</Heading>
				<Text margin='-3rem 0rem 4rem 0rem'>
					Be an Earth Hero: Stay Informed with Our Eco-Friendly Newsletter!
				</Text>
				<Input type='email' placeholder='Enter your email' />
				{/* <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}> */}
				<Button padding='2.5rem' stretchMobile type='primary'>
					I'M IN
				</Button>
				{/* </div> */}
			</Content>
		</Container>
	);
};

const Input = styled.input`
	padding: 1.5rem;
`;
const Content = styled.div`
	width: 80%;
	display: flex;
	flex-direction: column;
	height: 100%;
	gap: 2rem;
`;

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	justify-items: center;
	background: white;
	box-shadow: ${palette.shadow};
	border-radius: ${palette.radius};
	height: 40rem;
`;
const ImageWrapper = styled.div`
	position: relative;
	height: 100%;
	width: 100%;
	border-radius: ${palette.radius};

	& img {
		border-radius: ${palette.radius};
	}
`;

export default Newsletter;
