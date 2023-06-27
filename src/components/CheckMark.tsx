import { FC } from 'react';
import { BsCheckLg } from 'react-icons/bs';

interface Props {
	visible: boolean;
}

const CheckMark: FC<Props> = ({ visible }: Props): JSX.Element | null => {
	console.log('SELECTED:', visible);

	return (
		<>
			{visible && (
				<div className='bg-action p-2 text-primary rounded-full bg-opacity-70 backdrop-blur-sm'>
					<BsCheckLg />
				</div>
			)}
		</>
	);
};

export default CheckMark;
