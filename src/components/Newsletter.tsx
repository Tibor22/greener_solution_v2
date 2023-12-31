import { FC, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { API_URL } from '../../config/config';
import { Heading, Text } from '@/styles/sharedStyles';
import Button from './Button';
import { palette } from '@/styles/common';
import { device } from '@/styles/device';
import { client } from '../../clientHelpers/helpers';

interface Props {}

const Newsletter: FC<Props> = (props): JSX.Element => {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [thankYouText, setThankYouText] = useState(false);

	const onSubmit = async () => {
		setLoading(true);
		const res = await client.POST(`${API_URL}/email/signup`, {
			email,
		});
		setLoading(false);
		setThankYouText(true);
	};
	return (
		<Container>
			<ImageWrapper>
				<Image
					style={{ objectFit: 'cover' }}
					alt='newsletter'
					fill
					src={`/newsletter2.jpg`}
				/>
			</ImageWrapper>
			<Content>
				{thankYouText === false ? (
					<>
						<Heading level={2} looksLike={1}>
							Want to help change the world?
						</Heading>
						<Text margin='-3rem 0rem 1rem 0rem'>
							Be an Earth Hero: Stay Informed with Our Eco-Friendly Newsletter!
						</Text>
						<Input
							onChange={(e) => setEmail(e.target.value)}
							type='email'
							placeholder='Enter your email'
						/>

						<Button
							busy={loading}
							ifClicked={() => onSubmit()}
							padding='2.5rem'
							stretchMobile
							type='primary'
						>
							<p style={{ fontSize: '1.5rem' }}> I'M IN</p>
						</Button>
					</>
				) : (
					<>
						<Heading level={1}>
							Thank you for subscribing to our newsletter!
						</Heading>
						<Text margin='-3rem 0rem 4rem 0rem'>
							You gonna receive an email shortly!
						</Text>
					</>
				)}
			</Content>
		</Container>
	);
};

const Input = styled.input`
	padding: 1.5rem;
`;
const Content = styled.div`
	width: 90%;
	display: flex;
	flex-direction: column;
	gap: 2.2rem;
	justify-content: center;

	${device.laptop} {
		height: 100%;
		width: 80%;
	}
`;

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	justify-items: center;
	background: white;
	box-shadow: ${palette.shadow};
	border-radius: ${palette.radius};
	height: fit-content;
	grid-template-rows: auto auto;
	padding-bottom: 3rem;

	${device.laptop} {
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto;
		height: 40rem;
		padding-bottom: 0rem;
	}
`;
const ImageWrapper = styled.div`
	position: relative;
	height: 30rem;
	width: 100%;
	border-radius: ${palette.radius};
	${device.laptop} {
		height: 100%;
	}
	& img {
		border-radius: ${palette.radius};
	}
`;

export default Newsletter;
