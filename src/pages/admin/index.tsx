// import AdminLayout from '@/components/AdminLayout';
import Button from '@/components/Button';
import { fonts, palette } from '@/styles/common';
import { Heading, Text } from '@/styles/sharedStyles';
import Link from 'next/link';
import { ChangeEventHandler, FC, useState } from 'react';
import { AiOutlineFileAdd } from 'react-icons/ai';
import styled from 'styled-components';
import { client } from '../../../clientHelpers/helpers';
import { API_URL } from '../../../config/config';
import Loading from '@/components/Loading';

interface Props {}

const Admin: FC<Props> = (props): JSX.Element => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({ category: '', tag: '' });
	const [error, setError] = useState({ category: null, tag: null });
	const [added, setAdded] = useState<null | string>(null);

	const handleAdd = async (name: string) => {
		let names = name === 'category' ? 'categories' : 'tags';
		setLoading(true);
		const res = await client.POST(`${API_URL}/${names}`, {
			// @ts-ignore
			name: data[name],
		});
		if (res.msg) {
			setError({ ...error, [name]: res.msg });
		}
		if (!res.msg) {
			setAdded(` new ${name} added`);
		}
		setLoading(false);
		setData({ category: '', tag: '' });

		setTimeout(() => {
			setError({ category: null, tag: null });
			setAdded(null);
		}, 5000);
	};

	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setData((prevData) => ({ ...prevData, [name]: value }));
	};

	return (
		<Wrapper>
			<InputController>
				{added && <Added>{added}</Added>}
				<Heading level={2}>Create new categories and tags</Heading>
				{loading && <Loading />}
				{!loading && (
					<>
						<Add>
							{error.category && <Error>{error.category}</Error>}
							<label> NEW CATEGORY:</label>

							<Input
								name='category'
								value={data.category}
								onChange={handleChange}
								type='text'
							/>
							<Button ifClicked={() => handleAdd('category')} type='primary'>
								Add
							</Button>
						</Add>
						<Add>
							{error.tag && <Error>{error.tag}</Error>}
							<label>NEW TAG:</label>

							<Input
								onChange={handleChange}
								name='tag'
								value={data.tag}
								type='text'
							/>
							<Button
								onChange={handleChange}
								ifClicked={() => handleAdd('tag')}
								type='primary'
							>
								Add
							</Button>
						</Add>
					</>
				)}
			</InputController>
			<CLink href='/admin/post/create'>
				<AiOutlineFileAdd size={24} />
			</CLink>
		</Wrapper>
	);
};

const Added = styled(Text)`
	position: absolute;
	top: 0.5rem;
	left: 50%;
	transform: translateX(-50%);
	font-size: ${fonts.xsmall};
	padding: 0.5rem 1rem;
	background: ${palette.medium_green};
	color: white;
	text-transform: uppercase;
	border-radius: 8px;
`;
const Error = styled(Text)`
	position: absolute;
	bottom: 0.5rem;
	left: 50%;
	transform: translateX(-50%);
	font-size: ${fonts.xsmall};
	padding: 0.5rem 1rem;
	background: #ea3223;
	color: white;
	text-transform: uppercase;
	border-radius: 8px;
`;

const Add = styled.div`
	position: relative;
	font-size: ${fonts.medium};
	padding: 6rem 3rem;
	background: ${palette.grey_light};
	display: flex;
	align-items: center;
	gap: 1rem;
`;

const InputController = styled.div`
	position: relative;
	text-align: center;
	display: flex;
	flex-direction: column;
	gap: 2rem;
	padding: 4rem;
	background: ${palette.grey_light2};
	box-shadow: ${palette.shadow};
`;

const Input = styled.input`
	margin-left: 1rem;
	padding: 0.5rem 1rem;
	flex-grow: 2;
	border: none;
	outline: none;
`;

const Wrapper = styled.div`
	padding: 1rem;
`;

const CLink = styled(Link)`
	padding: 2rem;
	background-color: ${palette.medium_green};
	display: grid;
	place-items: center;
	border-radius: 80rem;
	position: absolute;
	right: 3rem;
	bottom: 3rem;
	& svg {
		fill: white;
	}
`;

export default Admin;
