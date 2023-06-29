import Image from 'next/image';
import { ChangeEventHandler, FC, useEffect, useState } from 'react';
import styled from 'styled-components';

interface Props {
	initialValue?: string;
	onChange(file: File): void;
}

const ThumbnailSelector: FC<Props> = ({
	initialValue,
	onChange,
}): JSX.Element => {
	const [selectedThumbnail, setSelectedThumbnail] = useState('');
	const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
		const { files } = target;

		if (!files) return;

		const file = files[0];
		setSelectedThumbnail(URL.createObjectURL(file));
		onChange(file);
	};

	useEffect(() => {
		if (typeof initialValue === 'string') setSelectedThumbnail(initialValue);
	}, [initialValue]);
	return (
		<ImageContainer>
			<input
				type='file'
				hidden
				accept='image/jpg, image/png, image/jpeg'
				id='thumbnail'
				onChange={handleChange}
			/>
			<label htmlFor='thumbnail'>
				{selectedThumbnail ? (
					<Image
						style={{ objectFit: 'cover', borderRadius: '8px' }}
						fill
						src={selectedThumbnail}
						alt=''
					/>
				) : (
					<PosterUI label='Thumbnail' />
				)}
			</label>
		</ImageContainer>
	);
};

const PosterUI: FC<{ label: string }> = ({ label }) => {
	return (
		<ThumbnailWrapper>
			<span>{label}</span>
		</ThumbnailWrapper>
	);
};

export default ThumbnailSelector;

const ImageContainer = styled.div`
	position: relative;
	height: 80px;
	aspect-ratio: 16/9;
	display: flex;
	align-items: center;
	border-radius: 8px;
`;

const ThumbnailWrapper = styled.div`
	padding: 1rem 2rem;
	border: 1px dashed grey;
	cursor: pointer;
`;
