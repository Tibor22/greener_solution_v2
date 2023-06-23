// import AdminLayout from '@/components/AdminLayout';
import { palette } from '@/styles/common';
import Link from 'next/link';
import { FC } from 'react';
import { AiOutlineFileAdd } from 'react-icons/ai';
import styled from 'styled-components';

interface Props {}

const Admin: FC<Props> = (props): JSX.Element => {
	return (
		<>
			<CLink href='/admin/post/create'>
				<AiOutlineFileAdd size={24} />
			</CLink>
		</>
	);
};

const CLink = styled(Link)`
	padding: 2rem;
	background-color: ${palette.medium_green};
	display: grid;
	place-items: center;
	border-radius: 80rem;
	position: absolute;
	right: 3rem;
	bottom: 3rem;
	& svg {
		fill: white;
	}
`;

export default Admin;
