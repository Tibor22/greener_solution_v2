import { FC, ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

const ThemeProvider: FC<Props> = ({ children }): JSX.Element => {
	return <div>{children}</div>;
};

export default ThemeProvider;
