import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { RiMenuFoldFill, RiMenuUnfoldFill } from 'react-icons/ri';

import {
	AiOutlineContainer,
	AiOutlineDashboard,
	AiOutlineFileAdd,
	AiOutlineTeam,
} from 'react-icons/ai';
import { ImStatsBars2 } from 'react-icons/im';
import styled, { keyframes, css } from 'styled-components';
import { palette, fonts } from '@/styles/common';

const navItems = [
	{ href: '/admin', icon: AiOutlineDashboard, label: 'Dashboard' },
	{ href: '/admin/posts', icon: AiOutlineContainer, label: 'Posts' },
	{ href: '/admin/users', icon: AiOutlineTeam, label: 'Users' },
	{ href: '/admin/statistics', icon: ImStatsBars2, label: 'Statistics' },
];

const AdminNav: FC = (): JSX.Element => {
	const [visible, setVisible] = useState<boolean | null>(null);
	const [delayedVisible, setDelayedVisible] = useState<boolean | null>(null);

	useEffect(() => {
		const storedNavOpen = localStorage.getItem('navOpen');
		setVisible((storedNavOpen === 'false' ? false : true) || false);
	}, []);

	useEffect(() => {
		setTimeout(
			() => {
				setDelayedVisible(visible);
			},
			visible === false ? 0 : 200
		);
	}, [visible]);

	return (
		<>
			{visible !== null && (
				<Nav visible={visible}>
					<LinkContainer>
						{navItems.map((item) => {
							return (
								<LinkItems delayedVisible={delayedVisible}>
									<Link key={item.href} href={item.href}>
										<item.icon size={35} />
										<span>{item.label}</span>
									</Link>
								</LinkItems>
							);
						})}
					</LinkContainer>
					<Button>
						{visible ? (
							<RiMenuFoldFill
								onClick={() => {
									setVisible(false),
										localStorage.setItem('navOpen', JSON.stringify(false));
								}}
								size={25}
							/>
						) : (
							<RiMenuUnfoldFill
								onClick={() => {
									setVisible(true),
										localStorage.setItem('navOpen', JSON.stringify(true));
								}}
								size={25}
							/>
						)}
					</Button>
				</Nav>
			)}
		</>
	);
};

const Button = styled.button`
	background: none;
	outline: none;
	color: white;
	border: none;
	cursor: pointer;
	align-self: flex-end;
	position: absolute;
	bottom: 1rem;
	right: 1rem;
`;

const Nav = styled.nav<{ visible: boolean }>`
	background-color: ${palette.light_brown};
	padding: 3rem ${({ visible }) => (visible ? 3 : 1)}rem 0rem 1rem;
	position: relative;
	transition: width 0.3s;
	width: ${({ visible }) => (visible ? 16 : 3.5)}rem;
`;

const LinkContainer = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 3rem;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const LinkItems = styled.li<{ delayedVisible: boolean | null }>`
	display: block;
	transition: scale 0.15s;
	& a {
		color: white;
		display: flex;
		align-items: center;
		gap: 1rem;
		font-size: ${fonts.medium};
		& span {
			display: ${({ delayedVisible }) => (delayedVisible ? 'unset' : 'none')};
			animation: ${({ delayedVisible }) =>
				delayedVisible
					? css`
							${fadeIn} 200ms ease-in-out
					  `
					: 'none'};
		}
	}

	&:hover {
		scale: 0.98;
	}

	& svg {
		fill: white;
	}
`;

export default AdminNav;
