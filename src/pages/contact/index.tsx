import Button from '@/components/Button';
import { palette } from '@/styles/common';
import { device } from '@/styles/device';
import { Heading, Text } from '@/styles/sharedStyles';
import Image from 'next/image';
import { FC } from 'react';
import styled from 'styled-components';

interface Props {}

const Index: FC<Props> = (props): JSX.Element => {
	return (
		<div
			style={{
				position: 'relative',
				width: '100%',
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				background: `${palette.light_gradient}`,
				marginBottom: '10rem',
			}}
		>
			<ImgWrapper>
				<Image
					style={{ objectFit: 'cover' }}
					src={'/contact_us.jpg'}
					fill
					alt='contact us'
				/>
			</ImgWrapper>
			<HeadingWrapper>
				<Heading level={2}>Has a unique ideal or product to share ?</Heading>
				<Heading level={2}>
					We would love to hear from <span style={{ color: 'red' }}>you!</span>
				</Heading>
			</HeadingWrapper>
			<TextWrapper>
				<PitchText>
					<Heading level={2}>Join Our Environmental Community</Heading>
					<Text small>
						At <b>Greener Solution</b>, we are passionate about environmental
						news, sustainability, and making a positive impact on our planet. We
						invite you to be a part of our community!
					</Text>
					<Text small>
						Whether you have a unique idea, product, or just want to share your
						thoughts, we would love to hear from you! Together, we can spread
						awareness and take action for a greener future.
					</Text>
				</PitchText>
				<ContactForm>
					<Input type='text' placeholder='Name' />
					<Input type='email' placeholder='Enter your email' />
					<TextArea placeholder='Your message' rows={4} cols={50} />
					<Button type='primary'>Send</Button>
				</ContactForm>
			</TextWrapper>
		</div>
	);
};

const TextArea = styled.textarea`
	padding: 0.7rem;
	resize: none;
	max-width: 350px;
	${device.mobileL} {
		max-width: unset;
	}
	&::placeholder {
		font-family: montserrat;
		letter-spacing: 1.3px;
	}
`;

const Input = styled.input`
	padding: 1.5rem;
	display: block;
	max-width: 350px;
	${device.mobileL} {
		max-width: unset;
	}
`;

const TextWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 5rem;
	max-width: 1500px;
	width: 100%;
	padding: 2rem;
	box-shadow: ${palette.shadow};
	background: white;

	border-radius: none;
	${device.mobileL} {
		width: 95%;
		border-radius: ${palette.radius};
	}
	${device.tablet} {
		padding: 3rem;
		width: 80%;
	}

	${device.laptop} {
		grid-template-columns: 1fr 1fr;
		gap: 15rem;
	}
`;

const ContactForm = styled.div`
	display: flex;
	flex-direction: column;
	gap: 3rem;
	justify-content: center;
	max-width: 100%;
`;

const PitchText = styled.div`
	line-height: 20px;
`;

const HeadingWrapper = styled.div`
	text-align: center;
	margin: 2rem;
`;

const ImgWrapper = styled.div`
	width: 100%;
	height: 60vh;
	position: relative;
`;

export default Index;
