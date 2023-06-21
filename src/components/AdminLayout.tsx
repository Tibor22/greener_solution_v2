import { FC, ReactNode } from 'react';
import AdminNav from './AdminNav';
import {
	AiOutlineContainer,
	AiOutlineDashboard,
	AiOutlineFileAdd,
	AiOutlineMail,
	AiOutlineTeam,
} from 'react-icons/ai';
import Link from 'next/link';

interface Props {
	children: ReactNode;
	title?: string;
}

const AdminLayout: FC<Props> = ({ children, title }): JSX.Element => {
	const navItems = [
		{ href: '/admin', icon: AiOutlineDashboard, label: 'Dashboard' },
		{ href: '/admin/posts', icon: AiOutlineContainer, label: 'Posts' },
		{ href: '/admin/users', icon: AiOutlineTeam, label: 'Users' },
		{ href: '/admin/comments', icon: AiOutlineMail, label: 'Comments' },
	];
	return (
		<div>
			<AdminNav navItems={navItems} />
			<div>{children}</div>
			{/* create button */}
			<Link href='/admin/post/create'>
				<AiOutlineFileAdd size={24} />
			</Link>
		</div>
	);
};

export default AdminLayout;
