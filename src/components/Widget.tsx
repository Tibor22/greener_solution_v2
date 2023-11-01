import { palette } from '@/styles/common';
import { Heading, Text } from '@/styles/sharedStyles';
import { FC } from 'react';
import { GiSpeedometer } from 'react-icons/gi';
import { BsThermometerSun } from 'react-icons/bs';
import styled, { keyframes } from 'styled-components';
import { device } from '@/styles/device';

interface Props {
	location: string;
	data: string;
	type: string;
}

const Widget: FC<Props> = ({ location, data, type }): JSX.Element => {
	const icon =
		type === 'temperature' ? (
			<BsThermometerSun
				color='#f9d71c'
				style={{ display: 'block', margin: '1.5rem 0rem' }}
				size={'5rem'}
			/>
		) : (
			<GiSpeedometer
				color={`${palette.red}`}
				style={{ display: 'block', margin: '1.5rem 0rem' }}
				size={'5rem'}
			/>
		);

	return (
		<Wrapper>
			<Live>
				<Dot></Dot>Live
			</Live>
			<Heading style={{ marginBlockStart: '0px', marginBlockEnd: '0px' }}>
				{`${type === 'temperature' ? 'HOTTEST PLACE' : 'WORST AIR'}`}
			</Heading>
			{icon}
			<span style={{ fontSize: '3rem', fontWeight: 'bold' }}>{data}</span>

			<Text>{location}</Text>
		</Wrapper>
	);
};

const pulse = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const Dot = styled.div`
	background: #c33;
	width: 8px;
	height: 8px;
	border-radius: 50%;
	animation: ${pulse} 2s infinite;
	align-self: center;
`;

const Live = styled.div`
	position: absolute;
	top: 8px;
	right: 10px;
	display: flex;
	gap: 6px;
	font-size: 1.3rem;
	text-transform: uppercase;
	font-weight: bold;
	align-items: center;
	line-height: 8px;
`;

const Wrapper = styled.div`
	padding: 2rem 2rem 1rem 2rem;
	max-width: 200px;
	border-radius: 8px;
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	height: auto;
	background: white;
	box-shadow: ${palette.shadow};
	@media (min-width: 500px) {
		width: 200px;
	}
	& svg {
		width: 5rem;
		height: 5rem;
	}

	${device.tablet} {
		width: 30rem;
		max-width: 30rem;
		padding: 2rem 0rem 1rem 0rem;

		& svg {
			width: 7rem;
			height: 7rem;
		}
	}
`;

export default Widget;
