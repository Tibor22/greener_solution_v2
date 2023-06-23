import { FC, ReactNode } from 'react';
import NavBar from './NavBar';
import AdminNav from './AdminNav';
import { useSession } from 'next-auth/react';

interface Props {
	children: ReactNode;
}
const Layout: FC<Props> = ({ children }): JSX.Element => {
	const { data: session, status, update } = useSession();
	return (
		<div
			style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
		>
			<NavBar />
			<main style={{ display: 'flex', flex: 1, position: 'relative' }}>
				{session && <AdminNav />}
				{children}
			</main>
			{/* <Footer /> */}
		</div>
	);
};

export default Layout;
