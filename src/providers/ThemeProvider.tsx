import { FC, ReactNode } from 'react';
import GlobalCSS from '../styles/globals';
import Layout from '../components/Layout';

interface Props {
	children: ReactNode;
}

const ThemeProvider: FC<Props> = ({ children }): JSX.Element => {
	return (
		<Layout>
			<GlobalCSS />
			{children}
		</Layout>
	);
};

export default ThemeProvider;
