import { FC } from 'react';
import NextImage from 'next/image';
import CheckMark from '@/components/CheckMark';
import styled from 'styled-components';

interface Props {
	src: string;
	selected?: boolean;
	onClick?(): void;
}

const Image: FC<Props> = ({ src, selected, onClick }): JSX.Element => {
	return (
		<ImageContainer onClick={onClick}>
			<NextImage
				style={{ objectFit: 'cover' }}
				fill
				src={src}
				alt='gallery'
				className='bg-secondary-light hover:scale-110 transition'
			/>
			<CheckMarContainer>
				<CheckMark visible={selected || false} />
			</CheckMarContainer>
		</ImageContainer>
	);
};

const CheckMarContainer = styled.div`
	position: absolute;
	left: 1rem;
	top: 1rem;
`;

const ImageContainer = styled.div`
	height: 200px;
	position: relative;

	& img {
		border-radius: 8px;
	}
`;

export default Image;
