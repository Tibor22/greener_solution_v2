import styled from 'styled-components';
import { palette } from '../styles/common';
import { montserrat } from '../styles/fonts';

function Button({
	ifClicked,
	label,
	type,
	stretchMobile,
	hasShadow,
	hasBorder,
	large,
	small,
	margin,
	width,
	disabled,
	children,
	stretchDesktop,
	inline,
	padding,
}: any) {
	return (
		<Btn
			disabled={disabled}
			type={type}
			onClick={ifClicked}
			large={large}
			small={small}
			hasBorder={hasBorder}
			margin={margin}
			width={width}
			stretchMobile={stretchMobile}
			stretchDesktop={stretchDesktop}
			hasShadow={hasShadow}
			inline={inline}
			hasLabel={!!(label || children)}
			padding={padding}
		>
			{children}
		</Btn>
	);
}

const handleColorType = (type: string) => {
	switch (type) {
		case 'primary':
		case 'secondary':
			return palette.white;
		case 'clear':
			palette.black;
		default:
			return palette.black;
	}
};

const handleBackgroundType = (type: string, index: number) => {
	switch (type) {
		case 'primary':
			return palette.medium_green;
		case 'secondary':
			return palette.dark_green;
		case 'clear':
			return '#F1F1F1';
		default:
			return palette.medium_green;
	}
};

const handleBorderColor = (type: string) => {
	switch (type) {
		case 'primary':
			return palette.medium_green;
		case 'secondary':
			return palette.dark_green;
		case 'clear':
			return '#F1F1F1';
		default:
			return palette.medium_green;
	}
};

// const handleHoverBackgroundType = (type: string) => {
// 	switch (type) {
// 		case 'primary':
// 			return palette.RL_red_main;
// 		case 'secondary':
// 			return palette.RL_grey_dark2;
// 		case 'blue':
// 			return palette.rareBlue;
// 		case 'connect':
// 			return palette.RL_red_main;
// 		case 'clear':
// 			return palette.RL_white;
// 		default:
// 			return palette.RL_red_main;
// 	}
// };

const Btn = styled.button<any>`
	opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
	text-transform: uppercase;
	border: ${({ type }) => `1px solid ${handleBorderColor(type)}`};
	border-radius: 0.462rem;
	padding: ${({ large, small, hasLabel, padding }) =>
		padding ||
		(hasLabel
			? large
				? `1.4rem 1.8rem`
				: small
				? '0.5rem 1rem'
				: '0.65rem 1rem'
			: '0.5rem')};
	height: ${({ large, hasLabel }) =>
		hasLabel ? (large ? `3.7rem` : '3.08rem') : 'auto'};
	color: ${({ type }) => handleColorType(type)};
	background: ${({ type }) =>
		`linear-gradient(180deg,${handleBackgroundType(
			type,
			1
		)} 0%, ${handleBackgroundType(type, 2)} 100%)`};
	box-shadow: ${({ hasShadow }) =>
		hasShadow ? `1px 1px 2px ${palette.RL_black}` : 'none'};
	margin: ${({ margin }) => `${margin}`};
	letter-spacing: ${({ large }) => (large ? `0.1em` : '0.16em')};
	font-weight: 700;
	opacity: ${({ type }) => (type === 'disable' ? '50%' : '')};
	cursor: ${({ disabled }) => (disabled ? 'no-drop' : 'pointer')};
	width: ${({ stretchMobile }) => (stretchMobile ? '100%' : 'min-content')};
	width: ${({ width }) => width};
	white-space: nowrap;
	font-size: ${({ large }) => (large ? `1rem` : '0.93rem')};
	align-items: center;
	position: relative;
	display: ${({ inline }) => (inline ? 'inline' : 'flex')};
	justify-content: center;
	font-family: ${montserrat.style.fontFamily}, serif;
`;

export default Button;
