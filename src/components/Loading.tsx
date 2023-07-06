import { fonts, palette } from '@/styles/common';
import { FC } from 'react';
import styled, { keyframes } from 'styled-components';

interface Props {}

const Loading: FC<Props> = (props): JSX.Element => {
	return (
		<LoadingWrapper>
			<Spinner>
				<div></div>
				<div></div>
				<div></div>
			</Spinner>
		</LoadingWrapper>
	);
};

export default Loading;

const loadingAnimation = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  25% {
    opacity: 0.5;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
  75% {
    opacity: 0.5;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;
const spinnerAnimation = keyframes`
0% {
  top: 8px;
  height: 64px;
}
50%, 100% {
  top: 24px;
  height: 32px;
}
`;

const LoadingWrapper = styled.div`
	display: grid;
	place-items: center;
	width: 100%;
	height: 100%;
	font-size: ${fonts.mediumLarge};
	text-align: center;
	animation: ${loadingAnimation} 4.8s ease-in-out infinite;
`;

const Spinner = styled.div`
	display: inline-block;
	position: relative;
	width: 80px;
	height: 80px;

	& div {
		display: inline-block;
		position: absolute;
		left: 8px;
		width: 16px;
		background: ${palette.medium_green};
		animation: ${spinnerAnimation} 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;

		&:nth-child(1) {
			left: 8px;
			animation-delay: -0.24s;
		}
		&:nth-child(2) {
			left: 32px;
			animation-delay: -0.12s;
		}
		&:nth-child(3) {
			left: 56px;
			animation-delay: 0;
		}
	}
`;
