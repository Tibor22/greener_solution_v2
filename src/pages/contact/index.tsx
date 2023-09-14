import Image from 'next/image';
import { FC } from 'react';
import styled from 'styled-components';

interface Props {}

const Index: FC<Props> = (props): JSX.Element => {
	return (
		<div style={{ position: 'relative', width: '100%' }}>
			<ImgWrapper>
				<Image
					style={{ objectFit: 'cover' }}
					src={'/contact_us.jpg'}
					fill
					alt='contact us'
				/>
			</ImgWrapper>
		</div>
	);
};

const ImgWrapper = styled.div`
	height: 60vh;
	width: 100%;
`;

export default Index;
