import { palette } from '@/styles/common';
import { FC } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import styled from 'styled-components';

interface Props {
	visible: boolean;
}

const CheckMark: FC<Props> = ({ visible }: Props): JSX.Element | null => {
	return (
		<>
			{visible && (
				<CheckMarkContainer className='bg-action p-2 text-primary rounded-full bg-opacity-70 backdrop-blur-sm'>
					<BsCheckLg size={15} />
				</CheckMarkContainer>
			)}
		</>
	);
};

const CheckMarkContainer = styled.div`
	background-color: ${palette.light_green};
	width: 3rem;
	height: 3rem;
	border-radius: 50%;
	display: grid;
	place-items: center;
`;

export default CheckMark;
