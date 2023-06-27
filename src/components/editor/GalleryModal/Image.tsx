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
			<div className='absolute top-2 left-2'>
				<CheckMark visible={selected || false} />
			</div>
		</ImageContainer>
	);
};

const ImageContainer = styled.div`
	width: 200px;
	height: 200px;
	position: relative;
`;

export default Image;
