import styled from 'styled-components';
import { fonts, palette } from './common';
import { device } from './device';
import React from 'react';
import { playfair_display, montserrat, merriweather } from './fonts';

export const Text = styled.p<any>`
	font-size: ${({ small, medium, xsmall, xxsmall }) =>
		xxsmall
			? fonts.xxsmall
			: xsmall
			? fonts.xsmall
			: small
			? fonts.small
			: medium
			? fonts.regular
			: fonts.medium};
	font-weight: ${({ bold, semibold }) =>
		semibold ? '600' : bold ? 'bold' : 'normal'};
	font-family: ${({ font }) => font || montserrat.style.fontFamily};
	text-decoration: ${({ decoration }) => decoration ?? 'none'};
	color: ${({ color }) => palette[color]};
	margin: ${({ margin }) => `${margin}`};
	text-align: ${({ isCentered }) => (isCentered ? 'center' : 'inherit')};
	display: ${({ inline }) => (inline ? 'inline' : '')};
`;

export const Heading = React.forwardRef(
	({ level = 4, children, looksLike, ...rest }: any) => (
		<CustomHeading as={`h${level}`} level={looksLike || level} {...rest}>
			{children}
		</CustomHeading>
	)
);

const CustomHeading = styled.div<any>`
	white-space: break-spaces;
	letter-spacing: ${({ level }) =>
		level === 1 ? '-0.02em' : level === 5 ? '0.1em' : 'unset'};
	text-transform: ${({ level }) => (level === 5 ? 'uppercase' : 'unset')};
	font-size: ${({ level, supersize, size }) =>
		size || handleHeadingFontSize(level, supersize)};
	color: ${({ color }) => palette[color]};
	margin: ${({ margin }) => `${margin}`};
	${({ strike }) => strike && 'text-decoration: line-through;'}
	max-width: ${({ maxWidth }) => maxWidth};
	text-align: ${({ isCentered }) => (isCentered ? 'center' : 'inherit')};
	font-family: ${({ family }) =>
		montserrat.style.fontFamily || playfair_display.style.fontFamily};
	font-weight: ${({ level, bold }) =>
		bold
			? '700'
			: level === 2
			? 'bold'
			: level === 3
			? 'bold'
			: level === 4
			? 'bold'
			: level === 5
			? 'bold'
			: 'inherit'};
	text-shadow: ${({ hasShadow }) =>
		hasShadow ? `2px 2px ${palette.RL_black}` : 'none'};
	&:hover {
		cursor: ${({ isLink }) => (isLink ? 'pointer' : 'inherit')};
	}
	// &:hover {
	// 	left: 0.3rem;
	// 	color: ${palette.RL_red_main};
	// }
`;

const handleHeadingFontSize = (level: number, supersize: boolean) => {
	switch (level) {
		case 1:
			return supersize ? '5rem' : '3.693rem';
		case 2:
			return '2.5rem';
		case 3:
			return '1.85rem';
		case 4:
			return '1.54rem';
		case 5:
			return '0.93rem';
		default:
			return palette.RL_red_main;
	}
};

export const loadingWrapper = (comparator: any) =>
	!comparator &&
	`background-image: repeating-linear-gradient(90deg, #0000001f, #00000012,#0000001f 100%);
background-repeat-x: repeat;
background-size: 500% 100%;
overflow:hidden;
position:relative;
animation: loading 2s infinite;`;

export const textLoadingWrapper = (
	comparator: any,
	length?: string,
	height?: string
) =>
	!comparator &&
	`width: ${length || '15ch'};
  height: ${height || '1ch'};
  border-radius: 3rem;
  background-image: repeating-linear-gradient(90deg, #0000001f, #00000012,#0000001f 100%);
  background-repeat-x: repeat;
  background-size: 500% 100%;
  margin-bottom:1ch;
  overflow: hidden;
  position: relative;
  animation: loading 2s infinite;`;

export const TextPlaceHolder = styled.div<{ length: string; height: string }>`
	${({ length, height }) => textLoadingWrapper(undefined, length, height)}
`;

export const BoxPlaceHolder = styled.div<{ length: string; height: string }>`
	height: ${({ height }) => height};
	width: ${({ length }) => length};
	${loadingWrapper(undefined)}
`;

// line-height: ${({ small, medium, xsmall }) =>
//     xsmall ? fonts.xsmall : small ? fonts.small : medium ? fonts.regular : fonts.medium};

// ${({ spaced, small, medium, xsmall }) =>
// spaced &&
// `letter-spacing: ${
//   xsmall ? '.25em' : small ? '.1em' : medium ? '.4em' : '.5em'
// };`}

export const Container = styled.div`
	margin: 0 auto;

	@media ${device.mobileS} {
		max-width: 575px;
	}
	@media ${device.mobileM} {
		max-width: 575px;
	}
	@media ${device.mobileL} {
		max-width: 700px;
	}
	@media ${device.tablet} {
		max-width: 1000px;
	}
	@media ${device.laptop} {
		max-width: 1400px;
	}
	@media ${device.laptopL} {
		max-width: 1760px;
	}
	@media ${device.desktop} {
		max-width: 2400px;
	}
	@media ${device.desktopL} {
		max-width: 3000px;
	}
`;

export const Error = styled(Text)<{
	bottom?: string;
	top?: string;
	position?: string;
}>`
	position: ${({ position }) => (position ? position : 'absolute')};
	bottom: ${({ bottom }) => (bottom ? bottom : '0.5rem')};
	left: 50%;
	transform: translateX(-50%);
	font-size: ${fonts.xsmall};
	padding: 0.5rem 1rem;
	background: #ea3223;
	color: white;
	text-transform: uppercase;
	border-radius: 8px;
`;
export const Success = styled(Text)<{
	bottom?: string;
	top?: string;
	position?: string;
}>`
	position: ${({ position }) => (position ? position : 'absolute')};
	bottom: ${({ bottom }) => (bottom ? bottom : '0.5rem')};
	left: 50%;
	transform: translateX(-50%);
	font-size: ${fonts.xsmall};
	padding: 0.5rem 1rem;
	background: ${palette.light_green};
	color: white;
	text-transform: uppercase;
	border-radius: 8px;
`;

export const Label = styled.label<{ color: string }>`
	padding: 1rem 1.5rem;
	font-size: ${fonts.xxsmall};
	text-transform: uppercase;
	background-color: ${({ color }) => palette[color]};
	border-radius: 8px;
	color: white;
	font-family: ${montserrat.style.fontFamily};
`;
