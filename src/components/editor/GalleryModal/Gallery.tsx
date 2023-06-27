import { FC } from 'react';
import Image from './Image';
import { BsCardImage } from 'react-icons/bs';
import styled from 'styled-components';

interface Props {
	images: { src: string }[];
	onSelect(src: string): void;
	uploading?: boolean;
	selectedImage: string;
}

const Gallery: FC<Props> = ({
	images,
	onSelect,
	uploading = false,
	selectedImage = '',
}): JSX.Element => {
	return (
		<Container>
			{uploading && (
				<div className='basis-1/4 p-2 aspect-square flex flex-col items-center justify-center bg-secondary-light text-primary-dark rounded animate-pulse'>
					<BsCardImage size={60} />
					<p>Uploading</p>
				</div>
			)}
			{images.map(({ src }, index) => {
				console.log(selectedImage === src);
				return (
					<div key={index}>
						<Image
							src={src}
							selected={selectedImage === src}
							onClick={() => onSelect(src)}
						/>
					</div>
				);
			})}
		</Container>
	);
};

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
`;

export default Gallery;
