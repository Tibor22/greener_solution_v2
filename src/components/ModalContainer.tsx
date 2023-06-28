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
		console.log('TARGETID:', target.id, 'CONTAINERID:', containerId);
		if (target.id === containerId) handleClose();
	};

	useEffect(() => {
		const closeModal = ({ key }: any) => key === 'Escape' && handleClose();

		document.addEventListener('keydown', closeModal);
		return () => document.removeEventListener('keydown', closeModal);
	}, []);

	if (!visible) return null;

	return (
		<Modal id={containerId} onClick={handleClick}>
			{children}
		</Modal>
	);
};

const Modal = styled.div`
	position: fixed;
	display: grid;
	place-items: center;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	blur: 1;
`;

export default ModalContainer;
