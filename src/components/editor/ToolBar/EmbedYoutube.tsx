import { palette } from '@/styles/common';
import { FC, useState } from 'react';
import { BsYoutube } from 'react-icons/bs';
import Button from '@/components/Button';

import styled from 'styled-components';

interface Props {
	onSubmit(link: string): void;
}

const EmbedYoutube: FC<Props> = ({ onSubmit }) => {
	const [url, setUrl] = useState('');
	const [visible, setVisible] = useState(false);
	const handleSubmit = () => {
		if (!url.trim()) return setVisible(false);
		onSubmit(url);
		setVisible(false);
	};
	return (
		<ButtonContainer
			onKeyDown={({ key }) => (key === 'Escape' ? setVisible(false) : '')}
			className='relative'
		>
			<Btn onClick={() => setVisible(!visible)}>
				<BsYoutube />
			</Btn>
			{visible && (
				<YoutubeWrapper className='absolute top-full mt-4 right-0 border-2 border-solid p-1 z-50'>
					<div className='flex items-center space-x-2'>
						<UrlInput
							onChange={(e) => setUrl(e.target.value)}
							value={url}
							autoFocus
							type='text'
							className='rounded bg-transparent focus:ring-0 focus:border-primary-dark dark:focus:border-primary transition dark:text-primary text-primary-dark p-2 text-sm outline-0'
							placeholder='https://youtube.com'
						/>
						<Button type='primary' ifClicked={handleSubmit}>
							Embed
						</Button>
					</div>
				</YoutubeWrapper>
			)}
		</ButtonContainer>
	);
};

const YoutubeWrapper = styled.div`
	position: absolute;
	margin-top: 3rem;
	z-index: 2;
	background: ${palette.grey_light2};
	padding: 1.5rem;
	border-radius: 12px;
	right: 0;
`;

const UrlInput = styled.input`
	padding: 0.8rem 1rem;
	outline: none;
	border: none;
	margin-bottom: 1rem;
`;

const Btn = styled.button<{ active?: boolean }>`
	padding: 1.5rem;
	margin-right: 0.5rem;
	background: ${palette.silver_light};
	color: white;
	font-size: 2.2rem;
	border: none;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 8px;
	cursor: pointer;
	transition: all 0.15s;
	&:hover {
		scale: 0.96;
	}
`;

const ButtonContainer = styled.div`
	position: relative;
`;

export default EmbedYoutube;
