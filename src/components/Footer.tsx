import { palette } from '@/styles/common';
import { FC, memo } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Heading, Text } from '@/styles/sharedStyles';
import Button from './Button';
import { device } from '@/styles/device';
interface Props {}

const Footer: FC<Props> = memo((props: Props): JSX.Element => {
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
					{' '}
					<Input type='text'></Input>
					<Button large type='primary'>
						Subscribe
					</Button>
				</SubscribeWrap>
			</Subscribe>
			<Links>
				<ListItem>
					<Text>Terms of use</Text>
				</ListItem>
				<ListItem>
					<Text>Privacy Policy</Text>
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
