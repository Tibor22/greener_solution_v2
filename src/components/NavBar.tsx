import { FC, useState } from 'react';
import { Container } from '@/styles/sharedStyles';
import styled from 'styled-components';
import { palette } from '@/styles/common';
import Link from 'next/link';
import dynamic from 'next/dynamic';
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
				<LogoContainer></LogoContainer>
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

					{/* <ListItem>
						<SearchContainer></SearchContainer>
					</ListItem> */}
				</ListContainer>
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
`;

const InnerContainer = styled.nav`
	position: relative;
	display: grid;
	align-items: center;
	background-color: ${palette.light_brown};
	grid-template-columns: 100px 1fr;
`;
const ListContainer = styled.ul`
	// overflow-y: hidden;
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
	width: 100px;
	background: yellow;
	height: 100%;
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
