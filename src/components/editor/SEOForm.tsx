import { ChangeEventHandler, FC, useEffect, useState } from 'react';
import slugify from 'slugify';
import { SeoResult } from '../../../types/types';
import styled from 'styled-components';
import { fonts, palette } from '@/styles/common';
import { Heading } from '@/styles/sharedStyles';

interface Props {
	title?: string;
	onChange(result: SeoResult): void;
	initialValue?: SeoResult;
}

const Input: FC<{
	name?: string;
	value?: string;
	placeholder?: string;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	label: string;
}> = ({ name, value, placeholder, label, onChange }) => (
	<label
		style={{
			display: 'flex',
			width: '100%',
			gap: '1rem',
			alignItems: 'center',
		}}
	>
		<Label>{label}</Label>
		<InputStyle
			type='text'
			name={name}
			placeholder={placeholder}
			onChange={onChange}
			value={value}
		/>
	</label>
);

const SEOForm: FC<Props> = ({
	title = '',
	onChange,
	initialValue,
}): JSX.Element => {
	const [values, setValues] = useState({ meta: '', slug: '', tags: '' });

	const handleChange: ChangeEventHandler<
		HTMLInputElement | HTMLTextAreaElement
	> = (e) => {
		let { name, value } = e.target;
		if (name === 'meta') value = value.substring(0, 150);

		setValues((prevValues) => ({ ...prevValues, [name]: value }));
		onChange({ ...values, [name]: value });
	};

	useEffect(() => {
		const slug = slugify(title.toLowerCase());
		setValues((prevValues) => ({ ...prevValues, slug }));
		onChange({ ...values, slug });
	}, [title]);
	useEffect(() => {
		if (initialValue) {
			setValues({ ...initialValue, slug: slugify(initialValue.slug) });
		}
	}, [initialValue]);

	const { meta, slug, tags } = values;
	return (
		<SEOContainer>
			<Heading level={2}>SEO Section</Heading>
			<Input
				value={slug}
				name='slug'
				placeholder='slug-goes-here'
				label='Slug:'
				onChange={handleChange}
			/>
			<Input
				value={tags}
				name='tags'
				placeholder='Heating, Energy'
				label='Tags:'
				onChange={handleChange}
			/>
			<div className='relative'>
				<TextArea
					onChange={handleChange}
					value={meta}
					name='meta'
					placeholder='Meta description 150 characters will be fine'
				></TextArea>
				<p>{meta.length}/150</p>
			</div>
		</SEOContainer>
	);
};

const TextArea = styled.textarea`
	width: 100%;
	min-height: 100px;
	border: 1px dashed ${palette.grey_light};
	padding: 1rem;
	outline: none;
	resize: none;
`;

const SEOContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	width: 60%;
`;
const Label = styled.span`
	font-size: ${fonts.mediumLarge};
`;

const InputStyle = styled.input`
	padding: 0.8rem 1rem;
	outline: none;
	border: none;
	border-bottom: 1px solid ${palette.grey_light};
	width: 100%;
	font-size: ${fonts.small};
	font-style: italic;
`;

export default SEOForm;
