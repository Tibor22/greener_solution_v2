import { ChangeEventHandler, FC, useEffect, useState } from 'react';
import slugify from 'slugify';
import { SeoResult } from '../../../types/types';
import styled from 'styled-components';
import { fonts, palette } from '@/styles/common';
import { Heading } from '@/styles/sharedStyles';
import Select, { GroupBase, OptionsOrGroups } from 'react-select';
import axios from 'axios';
import GroupedOption from 'react-select';
import useFetch from '@/hooks/useFetch';
import { API_URL } from '../../../config/config';
import { client } from '../../../clientHelpers/helpers';

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
	const [values, setValues] = useState({
		meta: '',
		slug: '',
		tags: '',
		categoryName: '',
	});

	const [options, setOptions] = useState([{ value: '', label: '' }]);
	const [tagOptions, setTagOptions] = useState([]);
	// const { data: tagOptions, loading } = useFetch(`${API_URL}/tags`);

	const handleChange: ChangeEventHandler<
		HTMLInputElement | HTMLTextAreaElement
	> = (e) => {
		let { name, value } = e.target;
		if (name === 'meta') value = value.substring(0, 150);

		setValues((prevValues) => ({ ...prevValues, [name]: value }));
		onChange({ ...values, [name]: value });
	};

	const handleSelectChange = (selectedOption: any) => {
		setValues((prevValues) => ({
			...prevValues,
			categoryName: selectedOption.label,
		}));
		onChange({ ...values, categoryName: selectedOption.label });
	};

	useEffect(() => {
		const slug = slugify(title.toLowerCase());
		setValues((prevValues) => ({ ...prevValues, slug }));
		onChange({ ...values, slug });
	}, [title]);

	useEffect(() => {
		const getCategories = async () => {
			const categories = await axios.get('/api/categories');
			if (!200) return;
			setOptions(
				categories.data.map((category: any) => ({
					value: category.name,
					label: category.name,
				}))
			);
		};

		getCategories();
	}, []);
	useEffect(() => {
		const getTags = async () => {
			const tags = await axios.get('/api/tags');
			console.log('TAGS:', tags);
			if (!200) return;
			setTagOptions(
				tags.data.map((tag: { id: number; name: string }) => ({
					value: tag.name,
					label: tag.name,
				}))
			);
		};

		getTags();
	}, []);

	console.log('TAG AOPTIONS:', tagOptions);

	useEffect(() => {
		if (initialValue) {
			console.log('IITIAL VALUE:', initialValue);
			setValues({ ...initialValue, slug: slugify(initialValue.slug) });
		}
	}, [initialValue]);

	const { meta, slug, tags, categoryName } = values;

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

			{/* <Input
				value={tags}
				name='tags'
				placeholder='Heating, Energy'
				label='Tags:'
				onChange={handleChange}
			/> */}
			<Select
				defaultValue={tags}
				isMulti
				name='tags'
				options={tagOptions.length > 0 ? tagOptions : []}
				className='basic-multi-select'
				classNamePrefix='select'
			/>

			<SelectWrapper>
				<span>Category:</span>
				<Select
					value={{
						value: values.categoryName
							? values.categoryName
							: 'select category',
						label: values.categoryName
							? values.categoryName
							: 'select category',
					}}
					options={options}
					onChange={handleSelectChange}
				></Select>
			</SelectWrapper>

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

const SelectWrapper = styled.div`
	display: flex;
	gap: 2rem;
	font-size: ${fonts.mediumLarge};
	align-items: center;
`;

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
