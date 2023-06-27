import {
	FC,
	MouseEventHandler,
	ReactNode,
	useCallback,
	useEffect,
	useId,
} from 'react';
import styled from 'styled-components';

export interface ModalProps {
	visible?: boolean;
	onClose?(): void;
}
interface Props extends ModalProps {
	children: ReactNode;
}

const ModalContainer: FC<Props> = ({
	visible,
	children,
	onClose,
}): JSX.Element | null => {
	const containerId = useId();
	const handleClose = useCallback(() => {
		onClose && onClose();
	}, [onClose]);

	const handleClick = ({ target }: any) => {
		if (target.id === containerId) handleClose();
	};

	useEffect(() => {
		const closeModal = ({ key }: any) => key === 'Escape' && handleClose();

		document.addEventListener('keydown', closeModal);
		return () => document.removeEventListener('keydown', closeModal);
	}, []);

	if (!visible) return null;

	return (
		<Modal
			id={containerId}
			onClick={handleClick}
			className='fixed inset-0 bg-primary dark:bg-primary-dark dark:bg-opacity-5 bg-opacity-5 backdrop-blur-[2px] z-50 flex items-center justify-center'
		>
			{children}
		</Modal>
	);
};

const Modal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 50;
`;

export default ModalContainer;
