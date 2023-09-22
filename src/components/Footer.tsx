import { palette } from '@/styles/common';
import { FC, memo, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Heading, Text } from '@/styles/sharedStyles';
import Button from './Button';
import { device } from '@/styles/device';
import { client } from '../../clientHelpers/helpers';
import { API_URL, MAIN_URL } from '../../config/config';
import Link from 'next/link';
interface Props {}

const Footer: FC<Props> = memo((props: Props): JSX.Element => {
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
		<FooterWrapper>
			<div>
				<Logo>
					<Image
						alt='greener solution logo'
						height={75}
						width={200}
						src='/logo/logo.png'
					/>
				</Logo>
				<Text color='white' small>
					© 2023 Greener Solution. All Rights Reserved.
				</Text>
			</div>
			<Subscribe>
				<Heading level={3} color='white'>
					Subscribe to our news letter !
				</Heading>
				<SubscribeWrap>
					{thankYouText ? (
						<>
							<Heading style={{ marginBottom: '1rem' }} level={3} color='white'>
								Thank you!
							</Heading>
							<Text color='white'>You will receive our email soon!</Text>
						</>
					) : (
						<>
							<Input
								onChange={(e) => setEmail(e.target.value)}
								type='email'
								placeholder='Enter your email'
							></Input>
							<Button ifClicked={onSubmit} busy={loading} large type='primary'>
								Subscribe
							</Button>
						</>
					)}
				</SubscribeWrap>
			</Subscribe>
			<Links>
				<ListItem>
					<Link href={`${MAIN_URL}/terms`}>
						<Text color='white'>Terms of use</Text>
					</Link>
				</ListItem>
				<ListItem>
					<Link href={`${MAIN_URL}/privacy`}>
						<Text color='white'>Privacy Policy</Text>
					</Link>
				</ListItem>
				<ListItem>
					<Text>Partnership</Text>
				</ListItem>
			</Links>
		</FooterWrapper>
	);
});

const SubscribeWrap = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	& button {
		width: 100%;
	}
	${device.tablet} {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		& button {
			width: fit-content;
		}
	}
`;

const ListItem = styled.li`
	list-style-type: none;
	color: white;
`;
const Input = styled.input`
	padding: 1rem 0.8rem;
	width: 30rem;
	border: none;
	outline: none;
	border-radius: ${palette.radius};
	font-size: 1.5rem;
`;

const Logo = styled.div``;

const Subscribe = styled.div``;

const Links = styled.ul``;

const FooterWrapper = styled.footer`
	height: content-fit;
	display: flex;
	flex-direction: column-reverse;
	background: ${palette.grey_dark2};
	align-items: center;
	padding: 15px;
	justify-content: center;
	text-align: center;
	gap: 3rem;

	${device.laptop} {
		text-align: left;
		flex-direction: row;
		justify-content: space-around;
		height: 20rem;
	}
`;

export default Footer;
