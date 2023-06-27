import { FC } from 'react';
import { BsLink45Deg } from 'react-icons/bs';

import styled from 'styled-components';
import { palette } from '@/styles/common';

interface Props {
	children: any;
	visible: boolean;
	setVisible(visible: boolean): void;
}

const InsertLink: FC<Props> = ({ visible, setVisible, children }) => {
	return (
		<div
			onKeyDown={({ key }) => (key === 'Escape' ? setVisible(false) : '')}
			className='relative'
		>
			<Button onClick={() => setVisible(!visible)}>
				<BsLink45Deg />
			</Button>
			<LinkFormContainer>{children}</LinkFormContainer>
		</div>
	);
};

const LinkFormContainer = styled.div`
	position: absolute;
	margin-top: 1rem;
	z-index: 1;
`;

const Button = styled.button<{ active?: boolean }>`
	padding: 1.5rem;
	margin-right: 0.5rem;
	background: ${palette.silver_light};
	color: white;
	font-size: 2.2rem;
	border: none;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 8px;
	cursor: pointer;
	transition: all 0.15s;
	&:hover {
		scale: 0.96;
	}
`;

export default InsertLink;
