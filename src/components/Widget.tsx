import { palette } from '@/styles/common';
import { Heading, Text } from '@/styles/sharedStyles';
import { FC } from 'react';
import { IconType } from 'react-icons';
import { MdSavings } from 'react-icons/md';
import { GiSpeedometer } from 'react-icons/gi';
import { BsThermometerSun } from 'react-icons/bs';
import styled from 'styled-components';
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
			<Heading style={{ marginBlockStart: '0px', marginBlockEnd: '0px' }}>
				{`${
					type === 'temperature' ? 'HOTTEST PLACE TODAY' : 'WORST AIR TODAY'
				}`}
			</Heading>
			{icon}
			<span style={{ fontSize: '3rem', fontWeight: 'bold' }}>{data}</span>
			{/* {type === 'temperature' ? (
				<span style={{ fontSize: '4rem', fontWeight: 'bold' }}>&#8451;</span>
			) : (
				<span></span>
			)} */}
			<Text>{location}</Text>
		</Wrapper>
	);
};

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
