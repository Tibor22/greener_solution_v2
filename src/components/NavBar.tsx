import { FC } from 'react';
import { Container } from '@/styles/sharedStyles';
import styled from 'styled-components';
import { palette } from '@/styles/common';
import Link from 'next/link';

interface Props {}

const NavBar: FC<Props> = (props): JSX.Element => {
	return (
		<Container as={`header`}>
			<InnerContainer>
				<LogoContainer></LogoContainer>
				<ListContainer>
					<Link href={'/'}>
						<ListItem>Home</ListItem>
					</Link>
					<Link href={'/categories'}>
						<ListItem>Categories</ListItem>
					</Link>
					<Link href={'/contact'}>
						<ListItem>Contact</ListItem>
					</Link>
					<Link href={'/subscribe'}>
						<ListItem>Subscribe</ListItem>
					</Link>

					{/* <ListItem>
						<SearchContainer></SearchContainer>
					</ListItem> */}
				</ListContainer>
			</InnerContainer>
		</Container>
	);
};

const InnerContainer = styled.nav`
	display: grid;
	align-items: center;
	background-color: ${palette.light_brown};
	grid-template-columns: 100px 1fr;
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
