import { FC } from 'react';
import styled from 'styled-components';

import { Heading } from '@/styles/sharedStyles';
import { palette } from '@/styles/common';
import { device } from '@/styles/device';
interface Props {
	type: string; //row or column
	children: React.ReactNode;
	name: string;
	bgColor: string;
}

const CategoryLabel: FC<Props> = ({
	type,
	children,
	name,
	bgColor,
}: Props): JSX.Element => {
	return (
		<Label bgColor={bgColor} type={type}>
			{children}
			<Heading color='white' style={{ textTransform: 'uppercase' }} level={3}>
				{name}
			</Heading>
		</Label>
	);
};

const Label = styled.div<{ type: string; bgColor: string }>`
	display: flex;
	flex-direction: ${({ type }) => type};
	align-items: center;
	justify-content: center;
	width: 35vw;
	height: 35vw;
	border-radius: 50%;
	background-color: ${({ bgColor }) => bgColor};
	color: white;
	box-shadow: ${palette.shadow};
	transition: transform 0.25s ease-out;
	&:hover {
		transform: translateY(-3px);
	}

	${device.tablet} {
		width: 25vw;
		height: 25vw;
	}

	${device.laptop} {
		width: 15vw;
		height: 15vw;
	}
`;

export default CategoryLabel;
