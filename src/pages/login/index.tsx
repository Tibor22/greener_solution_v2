import { FC, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Container, Heading } from '@/styles/sharedStyles';
import Button from '@/components/Button';

interface Props {}

const Login: FC<Props> = (props): JSX.Element => {
	const { data: session } = useSession();

	useEffect(() => {
		if (session === null) {
			signIn(undefined, { callbackUrl: '/' });
		}
	}, [session]);

	if (session) {
		return (
			<Container style={{ display: 'grid', placeItems: 'center' }}>
				<Heading level={1}>Welcome back {session.user.name}</Heading>
				<Button type='primary' ifClicked={() => signOut()}>
					Sign out
				</Button>
			</Container>
		);
	}
	return <></>;
};

export default Login;
