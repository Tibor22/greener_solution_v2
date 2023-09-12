import { FC, ReactNode, useState } from 'react';
import NavBar from './NavBar';
import AdminNav from './AdminNav';
import { useSession } from 'next-auth/react';
import Footer from './Footer';

interface Props {
	children: ReactNode;
}
const Layout: FC<Props> = ({ children }): JSX.Element => {
	const { data: session } = useSession();
	const [navbarHeight, setNavbarHeight] = useState<number>(0);
	return (
		<div style={{ minHeight: '100vh' }}>
			<NavBar setNavbarHeight={setNavbarHeight} />
			<main
				style={{
					display: 'flex',
					flex: 1,
					position: 'relative',
					height: '100%',
				}}
			>
				{session && <AdminNav navbarHeight={navbarHeight} />}
				{children}
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
