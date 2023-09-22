import { Heading, Text } from '@/styles/sharedStyles';
import styled from 'styled-components';
import { FC } from 'react';
import { device } from '@/styles/device';
import Link from 'next/link';
import { MAIN_URL } from '../../../config/config';

interface Props {}

const Privacy: FC<Props> = (props): JSX.Element => {
	return (
		<Wrapper>
			<Heading style={{ marginTop: '12rem' }} level={2}>
				Privacy Policy
			</Heading>

			<Text style={{ margin: '3rem 0rem 3rem 0rem' }}>
				At Greener Solution ("the Website"), we are committed to protecting your
				privacy. This Privacy Policy explains how we collect, use, and safeguard
				your personal information. By using the Website, you consent to the
				practices described in this policy.
			</Text>
			<CHeading level={3}>1. Information We Collect</CHeading>
			<Text>
				1.1. Information You Provide: We may collect email addresses that you
				voluntarily provide when you interact with the Website, such as when you
				subscribe to newsletters. Currently, we do not use these email addresses
				for email marketing.
			</Text>
			<Text style={{ marginTop: '1rem' }}>
				1.2. Automatically Collected Information: We may collect certain
				information automatically, such as your IP address, browser type, and
				usage data. This information helps us improve the Website and enhance
				your user experience.
			</Text>
			<CHeading level={3}>2. Use of Your Information</CHeading>
			<Text>
				2.1. We collect email addresses for the purpose of sending newsletters
				and updates, which are not currently in use. If we decide to use these
				email addresses for email marketing in the future, we will update this
				Privacy Policy and provide you with the option to opt-in or opt-out of
				such email marketing.
			</Text>
			<Text style={{ marginTop: '1rem' }}>
				2.2. We also use the information we collect to respond to your inquiries
				or comments and to analyze user trends to improve the Website's content
				and functionality.
			</Text>
			<CHeading level={3}>3. Data Security</CHeading>
			<Text style={{ marginTop: '1rem' }}>
				3.1. We take reasonable precautions to protect your personal information
				from unauthorized access, disclosure, or alteration. However, please be
				aware that no method of transmission over the internet or electronic
				storage is entirely secure, and we cannot guarantee the absolute
				security of your data.
			</Text>
			<CHeading level={3}>4. Cookies and Tracking Technologies</CHeading>
			<Text>
				4.1. We may use cookies and similar tracking technologies to enhance
				your experience on the Website. These technologies allow us to recognize
				and remember your preferences and provide customized content.
			</Text>
			<CHeading level={3}>5. Third-Party Links</CHeading>
			<Text style={{ marginTop: '1rem' }}>
				5.1. The Website may contain links to third-party websites or services.
				We are not responsible for the content or privacy practices of these
				third parties. We encourage you to review the privacy policies of any
				linked websites.
			</Text>

			<CHeading level={3}>6. Changes to this Privacy Policy</CHeading>
			<Text>
				6.1. We may update this Privacy Policy to reflect changes to our data
				collection practices or legal requirements. Any updates will be posted
				on this page, and the "Last Updated" date will be revised accordingly.
				If we decide to use the collected email addresses for email marketing in
				the future, we will update this policy accordingly
			</Text>
			<CHeading level={3}>7. Your Choices</CHeading>
			<Text>
				7.1. You can choose not to provide us with your email address, although
				this may limit your ability to subscribe to newsletters or receive
				updates.
			</Text>
			<CHeading level={3}>8. Contact Us</CHeading>
			<Text style={{ marginTop: '1rem' }}>
				If you have any questions or concerns about this Privacy Policy, please{' '}
				<Link href={`${MAIN_URL}/contact`}>contact us.</Link>
			</Text>
			<Text>
				Thank you for your trust in Greener Solution and your commitment to a
				greener and more sustainable future!
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

export default Privacy;
