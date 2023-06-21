// import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';
import { FC } from 'react';
import { AiOutlineFileAdd } from 'react-icons/ai';

interface Props {}

const Admin: FC<Props> = (props): JSX.Element => {
	return (
		<>
			<div>ADMIN MAIN PAGE</div>
			<Link href='/admin/post/create'>
				<AiOutlineFileAdd size={24} />
			</Link>
		</>
	);
};

export default Admin;
