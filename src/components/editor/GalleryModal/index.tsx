import ModalContainer, { ModalProps } from '@/components/ModalContainer';
import { ChangeEventHandler, FC, useCallback, useState } from 'react';
import Gallery from './Gallery';
import Image from 'next/image';

import { AiOutlineCloudUpload } from 'react-icons/ai';
import styled from 'styled-components';
import { fonts, palette } from '@/styles/common';
import Button from '@/components/Button';

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
						<div className='div'>
							<input
								onChange={handleOnImageChange}
								hidden
								type='file'
								id='image-input'
							/>
							<label htmlFor='image-input'>
								<UploadContainer>
									<AiOutlineCloudUpload />
									<span> Upload Image</span>
								</UploadContainer>
							</label>
						</div>
						{selectedImage.length > 0 && (
							<>
								<TextArea
									placeholder='Alt text'
									value={altText}
									onChange={({ target }) => setAltText(target.value)}
								></TextArea>

								<Button
									large
									stretchMobile
									type='primary'
									ifClicked={handleSelection}
									busy={uploading}
								>
									Select
								</Button>
								<SelectedImageContainer>
									<Image
										alt='selected image'
										src={selectedImage}
										fill
										style={{ objectFit: 'contain' }}
									/>
								</SelectedImageContainer>
							</>
						)}
					</SelectorContainer>
				</Grid>
			</OuterWrapper>
		</ModalContainer>
	);
};

const TextArea = styled.textarea`
	resize: none;
	height: 5rem;
	padding: 0.5rem;
	outline: none;
	border-radius: 4px;
`;

const SelectedImageContainer = styled.div`
	position: relative;
	height: 100px;
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: minmax(550px, 3fr) 200px;
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
	display: flex;
	flex-direction: column;
	gap: 2rem;
`;

const OuterWrapper = styled.div`
	max-width: 90rem;
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
