import ModalContainer, { ModalProps } from '@/components/ModalContainer';
import { ChangeEventHandler, FC, useCallback, useState } from 'react';
import Gallery from './Gallery';
import Image from 'next/image';

import { AiOutlineCloudUpload } from 'react-icons/ai';
import styled from 'styled-components';
import { fonts, palette } from '@/styles/common';

export interface ImageSelectionResult {
	src: string;
	altText: string;
}

interface Props extends ModalProps {
	onFileSelect(image: File): void;
	onSelect(result: ImageSelectionResult): void;
	images: { src: string }[];
	uploading?: boolean;
}

const GalleryModal: FC<Props> = ({
	images,
	visible,
	onFileSelect,
	onSelect,
	onClose,
	uploading,
}): JSX.Element => {
	console.log('GALLERY MODAL:', {
		images,
		visible,
		onFileSelect,
		onSelect,
		onClose,
		uploading,
	});
	const [selectedImage, setSelectedImage] = useState('');
	const [altText, setAltText] = useState('');

	const handleClose = useCallback(() => {
		onClose && onClose();
	}, [onClose]);

	const handleOnImageChange: ChangeEventHandler<HTMLInputElement> = ({
		target,
	}) => {
		const { files } = target;
		if (!files) return;

		const file = files[0];
		if (!file.type.startsWith('image')) return onClose && onClose();

		onFileSelect(file);
	};

	const handleSelection = () => {
		if (!selectedImage) return handleClose();
		onSelect({ src: selectedImage, altText: altText });
		handleClose();
	};

	return (
		<ModalContainer visible onClose={onClose}>
			<OuterWrapper>
				<Grid>
					<GalleryWrapper>
						<Gallery
							images={images}
							onSelect={(src) => setSelectedImage(src)}
							selectedImage={selectedImage}
							uploading={uploading}
						/>
					</GalleryWrapper>
					<SelectorContainer>
						<div className='space-y-4'>
							<div className='div'>
								<input
									onChange={handleOnImageChange}
									hidden
									type='file'
									id='image-input'
								/>
								<label htmlFor='image-input'>
									<UploadContainer className='w-full border-2 border-action text-action flex items-center justify-center space-x-2 p-2 cursor-pointer rounded'>
										<AiOutlineCloudUpload />
										<span> Upload Image</span>
									</UploadContainer>
								</label>
							</div>
							{selectedImage.length > 0 && (
								<>
									<textarea
										className='resize-none w-full rounded bg-secondary-dark focus:ring-1 focus:border-secondary-dark text-primary dark:text-primary-dark h-32 p-1 placeholder-white placeholder-opacity-75'
										placeholder='Alt text'
										value={altText}
										onChange={({ target }) => setAltText(target.value)}
									></textarea>
									<button onClick={handleSelection} title='Select' />
									<SelectedImageContainer className='relative aspect-video'>
										<Image
											alt='selected image'
											src={selectedImage}
											fill
											style={{ objectFit: 'contain' }}
										/>
									</SelectedImageContainer>
								</>
							)}
						</div>
					</SelectorContainer>
				</Grid>
			</OuterWrapper>
		</ModalContainer>
	);
};

const SelectedImageContainer = styled.div`
	position: relative;
	height: 100px;
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: 3fr 1fr;
	gap: 2rem;
`;

const UploadContainer = styled.div`
	border-radius: 8px;
	border: 1px solid white;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem 1.5rem;
	transition: all 0.2s;
	font-size: ${fonts.regular};
	gap: 0.5rem;
	&:hover {
		background: ${palette.grey_light2};
		color: black;
		transition: all 0.2s;
		cursor: pointer;
	}
`;

const SelectorContainer = styled.div`
	border: 1px solid red;
`;

const OuterWrapper = styled.div`
	max-width: 90rem;
	border: 2px solid grey;
	border-radius: 12px;
	padding: 2rem;
	background-color: ${palette.grey_dark2};
	color: white;
`;

const GalleryWrapper = styled.div`
	max-height: 45rem;
	overflow-y: auto;
`;

export default GalleryModal;
