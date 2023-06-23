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
			style={{ position: 'relative' }}
			onBlur={() => setShowOptions(false)}
			onMouseDown={() => setShowOptions(!showOptions)}
		>
			{head}
			{showOptions && (
				<DropDownContainer>
					<ul>
						{options.map(({ label, onClick }, index) => {
							return (
								<li key={label + index} onMouseDown={onClick}>
									{label}
								</li>
							);
						})}
					</ul>
				</DropDownContainer>
			)}
		</button>
	);
};

const DropDownContainer = styled.div``;

export default DropDown;
