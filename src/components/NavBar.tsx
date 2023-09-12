import {
	Dispatch,
	FC,
	SetStateAction,
	memo,
	useEffect,
	useRef,
	useState,
} from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Container } from '@/styles/sharedStyles';
import styled from 'styled-components';
import { palette } from '@/styles/common';
import Link from 'next/link';
import Image from 'next/image';
import { device } from '@/styles/device';
import { MAIN_URL } from '../../config/config';
interface Props {
	setNavbarHeight: Dispatch<SetStateAction<number>>;
}

const NavBar: FC<Props> = memo(({ setNavbarHeight }): JSX.Element => {
	const [coordinates, setCoordinates] = useState<{ x: number; y: number }>({
		x: 0,
		y: 0,
	});

	const [close, setClose] = useState<boolean>(true);

	const navbar: any = useRef(null);
	const handleSlider = (e: any) => {
		setCoordinates({
			x: e.target.offsetLeft + e.target.clientWidth / 2,
			y: e.clientY,
		});
	};

	useEffect(() => {
		setNavbarHeight(navbar?.current?.clientHeight);
	}, [navbar]);

	return (
		<CContainer ref={navbar} as={`header`} close={close}>
			<SwitchBtn
				close={close}
				onClick={() => setClose((prevClose) => !prevClose)}
			>
				{close ? <GiHamburgerMenu /> : <AiOutlineClose />}
			</SwitchBtn>
			<InnerContainer>
				<LogoContainer href={`${MAIN_URL}`}>
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
					<Link onClick={(e) => handleSlider(e)} href={'/categories/all'}>
						<ListItem>Categories</ListItem>
					</Link>
					<Link onClick={(e) => handleSlider(e)} href={'/contact'}>
						<ListItem>Contact</ListItem>
					</Link>
					<Link onClick={(e) => handleSlider(e)} href={'/subscribe'}>
						<ListItem>Subscribe</ListItem>
					</Link>
				</ListContainer>

				{/* <SearchContainer>
					<input type='text' />
				</SearchContainer> */}

				<Slider xcoordinates={coordinates.x} />
			</InnerContainer>
		</CContainer>
	);
});

const SwitchBtn = styled.div<{ close: boolean }>`
	position: absolute;
	top: 2rem;
	padding: 3rem;
	background-color: ${palette.light_brown};
	${({ close }) => (close ? 'left:-8rem' : 'right:2rem')};
	z-index: 10;
	color: white;
	font-size: 28px;
	border-radius: 50%;
	cursor: pointer;
	& svg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;

const CContainer = styled(Container)<{ close: boolean }>`
	position: fixed;
	top: 0;
	right: 0;
	height: 100vh;
	width: 50vw;
	z-index: 9;
	margin: unset;
	transform: ${({ close }) => (close ? 'translateX(100%)' : 'translateX(0%)')};
	transition: transform 0.3s ease-out;
	${device.laptop} {
		position: sticky;
		height: auto;
		margin: 0 auto;
		width: 100%;
		transform: translateX(0px);
	}
`;

const InnerContainer = styled.nav`
	position: relative;
	background-color: ${palette.light_brown};
	height: 100%;
	z-index: 9;
	${device.laptop} {
		height: unset;
		display: grid;
		justify-content: center;
		align-items: center;
		grid-template-columns: auto 1fr auto;
		padding: 0rem 4rem 0rem 1rem;
	}
`;

const ListContainer = styled.ul`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 3rem;
	margin-top: 5rem;
	list-style: none;
	${device.laptop} {
		margin-top: 0rem;
		display: flex;
		justify-content: center;
		flex-direction: row;
		gap: 8rem;
		padding: 0.5rem 0rem;
	}
`;

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

const SearchContainer = styled.div`
	display: flex;
	justify-content: center;
`;
const LogoContainer = styled(Link)`
	background-color: ${palette.light_brown};
	padding-top: 1rem;
	${device.laptop} {
		padding-top: 2px;
	}
`;

const ListItem = styled.li`
	text-transform: uppercase;
	font-weight: 500;
	color: ${palette.white};
	letter-spacing: 0.85px;

	cursor: pointer;
	transition: color 0.2s;
	&:hover {
		color: ${palette.light_green};
		transition: color 0.2s;
	}
	font-size: 2rem;
	${device.laptop} {
		font-size: 1.8rem;
	}
`;

export default NavBar;
