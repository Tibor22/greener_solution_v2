import { palette } from '@/styles/common';
import { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';

interface Props {
	options: { label: string; onClick(): void }[];
	head: ReactNode;
}

const DropDown: FC<Props> = ({ head, options }): JSX.Element => {
	const [showOptions, setShowOptions] = useState(false);

	return (
		<button
			style={{
				position: 'relative',
				border: 'none',
				backgroundColor: `${palette.silver_light}`,
				color: 'white',
			}}
			onBlur={() => setShowOptions(false)}
			onMouseDown={() => setShowOptions(!showOptions)}
		>
			{head}
			{showOptions && (
				<ListContainer>
					{options.map(({ label, onClick }, index) => {
						return (
							<ListItem key={label + index} onMouseDown={onClick}>
								{label}
							</ListItem>
						);
					})}
				</ListContainer>
			)}
		</button>
	);
};

const ListContainer = styled.ul`
	position: absolute;
	top: 100%;
	width: 100%;
	left: 0;
	border: none;
	background-color: ${palette.silver_light};
	cursor: pointer;
	z-index: 1;
`;
const ListItem = styled.li`
	padding: 1rem 0rem;
	border-top: 1px solid ${palette.grey_light};
	color: white;
	font-size: 1.5rem;

	&:hover {
		background-color: ${palette.grey_light};
		color: ${palette.grey_dark};
	}
`;

export default DropDown;
