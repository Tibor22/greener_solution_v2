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
		<>
			<NavBar />
			<main>
				{session && <AdminNav />}
				{children}
			</main>
			{/* <Footer /> */}
		</>
	);
};

export default Layout;
