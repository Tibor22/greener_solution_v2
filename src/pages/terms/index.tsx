import { Heading, Text } from '@/styles/sharedStyles';
import styled from 'styled-components';
import { FC } from 'react';
import { device } from '@/styles/device';
import Link from 'next/link';
import { MAIN_URL } from '../../../config/config';

interface Props {}

const Terms: FC<Props> = (props): JSX.Element => {
	return (
		<Wrapper>
			<Heading style={{ marginTop: '12rem' }} level={2}>
				Terms of Use
			</Heading>
			<CHeading level={3}>1. Acceptance of Terms</CHeading>
			<Text>
				Welcome to Greener Solution ("the Website"). By accessing or using this
				Website, you agree to comply with and be bound by these Terms of Use. If
				you do not agree to these Terms of Use, please do not use the Website.
			</Text>
			<CHeading level={3}>2. Use of the Website</CHeading>
			<Text>
				2.1. You agree to use the Website for lawful and environmentally
				responsible purposes only. You must not use the Website for any unlawful
				or harmful activities.
			</Text>
			<CHeading level={3}>3. Intellectual Property</CHeading>
			<Text>
				3.1. The content on this Website, including but not limited to text,
				graphics, logos, images, and software, is protected by copyright and
				other intellectual property laws. You may not use, reproduce, or
				distribute any content from this Website without our prior written
				consent.
			</Text>
			<Text style={{ marginTop: '1rem' }}>
				3.2. Greener Solution may contain trademarks, logos, and other
				proprietary information owned by us or third parties. You may not use
				these trademarks without our written permission.
			</Text>
			<CHeading level={3}>4. User-Generated Content</CHeading>
			<Text style={{ marginTop: '1rem' }}>
				4.1. If you submit any content, comments, or materials to the Website,
				you grant Greener Solution a non-exclusive, worldwide, royalty-free, and
				perpetual license to use, display, and distribute your content in
				connection with the Website.
			</Text>
			<Text>
				4.2. You are solely responsible for the content you submit, and it must
				not violate any third-party rights or be offensive, illegal, or harmful.
			</Text>
			<CHeading level={3}>5. Privacy</CHeading>
			<Text>
				Your use of the Website is also governed by our Privacy Policy, which
				can be found <Link href={`${MAIN_URL}/privacy`}>here</Link>
			</Text>
			<CHeading level={3}>6. Disclaimer</CHeading>
			<Text style={{ marginTop: '1rem' }}>
				6.1. Greener Solution provides information and resources related to
				environmental solutions and sustainability. However, we do not guarantee
				the accuracy, completeness, or suitability of the information on the
				Website for your specific needs.
			</Text>
			<Text>
				6.2. Your use of any information or materials on this Website is
				entirely at your own risk. Greener Solution shall not be liable for any
				damage or loss resulting from the use of this Website.
			</Text>
			<CHeading level={3}>7. Links to Third-Party Websites</CHeading>
			<Text>
				The Website may contain links to third-party websites. These links are
				provided for your convenience, and Greener Solution does not endorse or
				have any control over the content or practices of these third-party
				websites. Your use of linked websites is at your own risk.
			</Text>
			<CHeading level={3}>8. Modifications</CHeading>
			<Text>
				Greener Solution reserves the right to modify or update these Terms of
				Use at any time without prior notice. It is your responsibility to
				review these terms periodically for any changes.
			</Text>
			<CHeading level={3}>9. Contact Information</CHeading>
			<Text style={{ marginTop: '1rem' }}>
				If you have any questions or concerns about these Terms of Use, please{' '}
				<Link href={`${MAIN_URL}/contact`}>contact us.</Link>
			</Text>
			<Text>
				By using Greener Solutions, you agree to abide by these Terms of Use.
				Thank you for your commitment to greener and more sustainable solutions!
			</Text>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	max-width: 1500px;
	margin: 0 auto;
	padding: 0px 15px;
	margin-bottom: 4rem;

	${device.tablet} {
		max-width: 80%;
	}
	${device.laptop} {
		max-width: 60%;
	}
`;

const CHeading = styled(Heading)`
	margin: 3rem 0rem 2rem 0rem;
`;

export default Terms;
