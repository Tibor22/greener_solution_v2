import Newsletter from '@/components/Newsletter';
import { FC } from 'react';

interface Props {}

const Subscribe: FC<Props> = (props): JSX.Element => {
	return (
		<div
			style={{
				padding: '0px 15px',
				maxWidth: '1500px',
				margin: '120px auto 50px auto',
			}}
		>
			<Newsletter></Newsletter>
		</div>
	);
};

export default Subscribe;
