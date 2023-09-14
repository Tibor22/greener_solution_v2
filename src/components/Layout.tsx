import { FC, ReactNode, useState } from 'react';
import NavBar from './NavBar';
import AdminNav from './AdminNav';
import { useSession } from 'next-auth/react';
import Footer from './Footer';
import { palette } from '@/styles/common';

interface Props {
	children: ReactNode;
}
const Layout: FC<Props> = ({ children }): JSX.Element => {
	const { data: session } = useSession();
	const [navbarHeight, setNavbarHeight] = useState<number>(0);
	return (
		<div
			style={{
				minHeight: '100vh',
				position: 'relative',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			{session && <AdminNav navbarHeight={navbarHeight} />}
			<NavBar setNavbarHeight={setNavbarHeight} />
			<main
				style={{
					display: 'flex',
					flex: 1,
					position: 'relative',
					height: '100%',
					background: `${palette.light_gradient}`,
				}}
			>
				{children}
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
