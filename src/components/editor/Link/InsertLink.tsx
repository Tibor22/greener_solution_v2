import { FC, useState } from 'react';
import { BsLink45Deg } from 'react-icons/bs';

import LinkForm, { linkOption } from './LinkForm';
import styled from 'styled-components';
import { palette } from '@/styles/common';

interface Props {
	onSubmit(link: linkOption): void;
}

const InsertLink: FC<Props> = ({ onSubmit }) => {
	const [visible, setVisible] = useState(false);
	const handleSubmit = (link: linkOption) => {
		if (!link.url.trim()) return setVisible(false);
		onSubmit(link);
		setVisible(false);
	};
	return (
		<div
			onKeyDown={({ key }) => (key === 'Escape' ? setVisible(false) : '')}
			className='relative'
		>
			<Button onClick={() => setVisible(!visible)}>
				<BsLink45Deg />
			</Button>
			<LinkFormContainer>
				<LinkForm onSubmit={handleSubmit} visible={visible} />
			</LinkFormContainer>
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
