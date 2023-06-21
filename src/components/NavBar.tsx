import { FC, useState } from 'react';
import { Container } from '@/styles/sharedStyles';
import styled from 'styled-components';
import { palette } from '@/styles/common';
import Link from 'next/link';
import Image from 'next/image';
interface Props {}

const NavBar: FC<Props> = (props): JSX.Element => {
	const [coordinates, setCoordinates] = useState<{ x: number; y: number }>({
		x: 0,
		y: 0,
	});
	const handleSlider = (e: any) => {
		setCoordinates({
			x: e.target.offsetLeft + e.target.clientWidth / 2,
			y: e.clientY,
		});
	};

	return (
		<Container as={`header`}>
			<InnerContainer>
				<LogoContainer>
					<Image
						alt='greener solution logo'
						height={75}
						width={200}
						src='/logo/logo.png'
					/>
				</LogoContainer>
				<ListContainer>
					<Link onClick={(e) => handleSlider(e)} href={'/'}>
						<ListItem>Home</ListItem>
					</Link>
					<Link onClick={(e) => handleSlider(e)} href={'/categories'}>
						<ListItem>Categories</ListItem>
					</Link>
					<Link onClick={(e) => handleSlider(e)} href={'/contact'}>
						<ListItem>Contact</ListItem>
					</Link>
					<Link onClick={(e) => handleSlider(e)} href={'/subscribe'}>
						<ListItem>Subscribe</ListItem>
					</Link>
				</ListContainer>

				<SearchContainer>
					<input type='text' />
				</SearchContainer>

				<Slider xcoordinates={coordinates.x} />
			</InnerContainer>
		</Container>
	);
};

const Slider = styled.div<{ xcoordinates: number }>`
	width: 0;
	height: 0;
	border-left: 7.5px solid transparent;
	border-right: 7.5px solid transparent;
	border-bottom: 15px solid #fff;
	z-index: 1;
	position: absolute;
	bottom: -0px;
	left: ${({ xcoordinates }) => `${xcoordinates - 7.5}px;`};
	transition: all 0.2s;
	opacity: ${({ xcoordinates }) => `${xcoordinates === 0 ? 0 : 1}`};
`;

const InnerContainer = styled.nav`
	position: relative;
	display: grid;
	justify-content: center;
	align-items: center;
	background-color: ${palette.light_brown};
	grid-template-columns: auto 1fr auto;
	padding: 0rem 4rem 0rem 1rem;
`;
const ListContainer = styled.ul`
	display: flex;
	justify-content: center;
	gap: 8rem;
	list-style: none;
	padding: 0.5rem 0rem;
`;
const SearchContainer = styled.div`
	display: flex;
	justify-content: center;
`;
const LogoContainer = styled.div`
	background-color: ${palette.light_brown};
	margin-top: 2px;
`;

const ListItem = styled.li`
	text-transform: uppercase;
	font-weight: 500;
	color: ${palette.white};
	letter-spacing: 0.85px;
	font-size: 1.8rem;
	cursor: pointer;
	transition: color 0.2s;
	&:hover {
		color: ${palette.light_green};
		transition: color 0.2s;
	}
`;

export default NavBar;
