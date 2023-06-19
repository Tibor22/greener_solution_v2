import { FC, ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

const Layout: FC<Props> = ({ children }): JSX.Element => {
	return (
		<>
			{/* <Navbar /> */}
			<main>{children}</main>
			{/* <Footer /> */}
		</>
	);
};

export default Layout;
