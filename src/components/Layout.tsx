import { FC, ReactNode } from 'react';
import NavBar from './NavBar';

interface Props {
	children: ReactNode;
}

const Layout: FC<Props> = ({ children }): JSX.Element => {
	return (
		<>
			{/* <Navbar /> */}
			<NavBar />
			<main>{children}</main>
			{/* <Footer /> */}
		</>
	);
};

export default Layout;
