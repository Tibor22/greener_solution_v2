import { FC, useEffect, useState } from 'react';
import { validateUrl } from '../../../../clientHelpers/helpers';
import styled from 'styled-components';
import { fonts, palette } from '@/styles/common';
import Button from '@/components/Button';

interface Props {
	visible: boolean;
	initialState?: { url: string; openInNewTab: boolean };
	onSubmit(link: linkOption): void;
	onRemove?(): void;
}

export type linkOption = {
	url: string;
	openInNewTab: boolean;
};

const defaultLink = {
	url: '',
	openInNewTab: false,
};

const LinkForm: FC<Props> = ({
	visible,
	initialState,
	onSubmit,
}): JSX.Element | null => {
	const [link, setLink] = useState<linkOption>(defaultLink);
	useEffect(() => {
		if (initialState) setLink({ ...initialState });
	}, [initialState]);

	if (!visible) return null;

	const handleSubmit = (e: any) => {
		validateUrl(link.url);
		onSubmit({ ...link, url: validateUrl(link.url) });
		setLink(defaultLink);
	};

	return (
		<FormContainer>
			<UrlInput
				onChange={(e) =>
					setLink((prevLink) => {
						return { ...prevLink, url: e.target.value };
					})
				}
				value={link.url}
				autoFocus
				type='text'
				placeholder='https://example.com'
			/>

			<FormController>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<CheckBox
						onChange={(e) =>
							setLink((prevLink) => {
								return { ...prevLink, openInNewTab: e.target.checked };
							})
						}
						type='checkbox'
						id='checkbox'
						checked={link.openInNewTab}
					/>
					<Label htmlFor='checkbox'>open in new tab</Label>
				</div>
				<div>
					<Button
						type='primary'
						ifClicked={(e: React.MouseEvent<HTMLElement>) => handleSubmit(e)}
					>
						Apply
					</Button>
				</div>
			</FormController>
		</FormContainer>
	);
};

const UrlInput = styled.input`
	padding: 0.8rem 1rem;
	outline: none;
	border: none;
`;

const Label = styled.label`
	font-size: ${fonts.small};
`;

const CheckBox = styled.input`
	width: 2rem;
	height: 2rem;
	margin-right: 0.5rem;
`;

const FormController = styled.div`
	margin-top: 0.5rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

const FormContainer = styled.div`
	background: ${palette.grey_light2};
	padding: 1.5rem;
	border-radius: 12px;
`;

export default LinkForm;
