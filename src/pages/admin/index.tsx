import AdminLayout from '@/components/AdminLayout';
import { FC } from 'react';

interface Props {}

const Admin: FC<Props> = (props): JSX.Element => {
	return (
		<AdminLayout>
			<div>ADMIN MAIN PAGE</div>
		</AdminLayout>
	);
};

export default Admin;
