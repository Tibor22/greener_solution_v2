import { palette } from '@/styles/common';
import { AiOutlineClockCircle } from 'react-icons/ai';
import styled from 'styled-components';

import React from 'react';
import {
	FacebookShareButton,
	FacebookIcon,
	TwitterShareButton,
	TwitterIcon,
	WhatsappShareButton,
	WhatsappIcon,
	LinkedinShareButton,
	LinkedinIcon,
} from 'next-share';
import { device } from '@/styles/device';

declare type Props = {
	date: string;
	readingTime?: number | string;
	rawDate: string;
	excerpt?: string;
	url: string;
};

export default function ArticleHeadingDetails({
	date,
	readingTime,
	rawDate,
	excerpt,
	url,
}: Props) {
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
				<FacebookShareButton url={url} quote={excerpt}>
					<FacebookIcon size={32} round />
				</FacebookShareButton>
				<TwitterShareButton title={excerpt} url={url}>
					<TwitterIcon size={32} round />
				</TwitterShareButton>
				<WhatsappShareButton url={url}>
					<WhatsappIcon size={32} round />
				</WhatsappShareButton>
				<LinkedinShareButton url={url}>
					<LinkedinIcon size={32} round />
				</LinkedinShareButton>
			</SocialWrapper>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	margin-bottom: 4.5rem;

	${device.mobileXL} {
		flex-direction: row;
		gap: 0rem;
		justify-content: space-between;
		align-items: center;
	}
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
