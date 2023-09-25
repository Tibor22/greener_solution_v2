import Newsletter from '@/components/Newsletter';
import { NextSeo } from 'next-seo';
import { FC } from 'react';

interface Props {}

const Subscribe: FC<Props> = (props): JSX.Element => {
	return (
		<>
			<NextSeo
				title='Subscribe to Our Newsletter | Environmental News'
				description='Stay updated with the latest environmental news, climate change updates, and energy developments by subscribing to our newsletter.'
				openGraph={{
					images: [
						{
							url: '/newsletter2.jpg',
							width: 1200,
							height: 627,
						},
					],
				}}
			/>

			<div
				style={{
					padding: '0px 15px',
					maxWidth: '1500px',
					margin: '120px auto 50px auto',
				}}
			>
				<Newsletter></Newsletter>
			</div>
		</>
	);
};

export default Subscribe;
