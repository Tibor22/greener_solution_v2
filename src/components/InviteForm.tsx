import { FC, FormEventHandler, useState } from 'react';
import { client } from '../../clientHelpers/helpers';
import styled from 'styled-components';
import { Heading, Error, Success } from '@/styles/sharedStyles';
import Button from './Button';
import { palette } from '@/styles/common';
import Loading from '@/components/Loading';
interface Props {}

const InviteForm: FC<Props> = (props): JSX.Element => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<{ error: null | string }>({ error: null });
	const [success, setSuccess] = useState<{ msg: null | string }>({ msg: null });
	const [userData, setUserData] = useState({
		email: '',
		name: '',
		password: '',
		displayName: '',
		role: 'ADMIN',
	});

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		setLoading(true);
		const returnedUser = await client.POST('/api/users', {
			...userData,
		});
		if (returnedUser.status === 400) {
			setError({ error: 'email or display name taken ' });
			setTimeout(() => setError({ error: null }), 3000);
		} else {
			setSuccess({ msg: 'user successfully created' });
			setTimeout(() => setSuccess({ msg: null }), 3000);
		}
		setUserData({
			email: '',
			name: '',
			password: '',
			displayName: '',
			role: 'ADMIN',
		});
		setLoading(false);
	};
	return (
		<Form
			onSubmit={(e) => handleSubmit(e)}
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '2rem',
				justifyContent: 'space-around',
			}}
		>
			<Heading isCentered level={2}>
				INVITE ADMIN
			</Heading>
			<Label>
				Email:
				<Input
					onChange={(e) =>
						setUserData((prevData) => ({
							...prevData,
							email: e.target.value,
						}))
					}
					value={userData.email}
					type='email'
				/>
			</Label>
			<Label>
				Name:
				<Input
					onChange={(e) =>
						setUserData((prevData) => ({
							...prevData,
							name: e.target.value,
						}))
					}
					value={userData.name}
					type='text'
				/>
			</Label>
			<Label>
				Display Name:
				<Input
					onChange={(e) =>
						setUserData((prevData) => ({
							...prevData,
							displayName: e.target.value,
						}))
					}
					value={userData.displayName}
					type='text'
				/>
			</Label>
			<Label>
				Password:
				<Input
					onChange={(e) =>
						setUserData((prevData) => ({
							...prevData,
							password: e.target.value,
						}))
					}
					type='password'
					autoComplete='current password'
					value={userData.password}
				/>
			</Label>
			{!error.error && !success.msg && <div style={{ height: '2rem' }}></div>}
			{error.error && <Error position='relative'>{error.error}</Error>}
			{success.msg && <Success position='relative'>{success.msg}</Success>}
			<Button busy={loading} type='primary'>
				SUBMIT
			</Button>
		</Form>
	);
};

const Input = styled.input`
	display: block;
	margin-top: 0.8rem;
	padding: 0.6rem 1rem;
	outline: none;
	border: none;
`;

const Label = styled.label`
	font-size: 1.6rem;
`;

const Form = styled.form`
	padding: 4rem;
	background: ${palette.grey_light2};
	box-shadow: ${palette.shadow};
	position: relative;
`;

export default InviteForm;
