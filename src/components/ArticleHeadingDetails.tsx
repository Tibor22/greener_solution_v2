import { palette } from '@/styles/common';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { FaFacebook } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { MAIN_URL } from '../../config/config';

declare type Props = {
	date: string;
	readingTime?: number | string;
	rawDate: string;
	excerpt?: string;
};

export default function ArticleHeadingDetails({
	date,
	readingTime,
	rawDate,
	excerpt,
}: Props) {
	const router = useRouter();

	const shareOnFacebook = () => {
		window.open(
			`https://www.facebook.com/sharer/sharer.php?u=${MAIN_URL}/${router.query.slug}`,
			'Share',
			'width=600,height=400'
		);
	};

	const shareOnTwitter = () => {
		window.open(
			`https://twitter.com/intent/tweet?url=${MAIN_URL}/${router.query.slug}&text=${excerpt}`,
			'Share',
			'width=600,height=400'
		);
	};

	return (
		<Wrapper>
			<TimeWrapper>
				<AiOutlineClockCircle
					color={`${palette.silver_light}`}
					size={'1.7rem'}
				/>
				<time dateTime={rawDate}>
					<span style={{ color: palette.silver_light }}>{date}, UK</span>
				</time>
			</TimeWrapper>
			<SocialWrapper>
				<div
					style={{ cursor: 'pointer' }}
					role='button'
					onClick={shareOnFacebook}
				>
					<FaFacebook color={`#0866ff`} size={'2.7rem'} />
				</div>
				<div
					style={{ cursor: 'pointer' }}
					role='button'
					onClick={shareOnTwitter}
				>
					<RiTwitterXFill size={'2.7rem'} />
				</div>
			</SocialWrapper>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 5rem;
	align-items: center;
`;

const SocialWrapper = styled.div`
	display: flex;
	gap: 1.5rem;
`;

const TimeWrapper = styled.div`
	display: flex;
	align-items: center;
	font-size: 1.7rem;
	gap: 1rem;
`;
