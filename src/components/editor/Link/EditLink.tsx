import { FC, useCallback, useState } from 'react';
import { BsBoxArrowUpRight, BsPencilSquare } from 'react-icons/bs';
import { BiUnlink } from 'react-icons/bi';
import { BubbleMenu, Editor } from '@tiptap/react';
import LinkForm, { linkOption } from './LinkForm';
import styled from 'styled-components';
import { palette } from '@/styles/common';

interface Props {
	editor: Editor;
}

const EditLink: FC<Props> = ({ editor }: Props): JSX.Element => {
	const [showEditForm, setShowEditForm] = useState(false);

	const handleOnLinkOpenClick = useCallback(() => {
		const { href } = editor.getAttributes('link');

		if (href) {
			window.open(href, '_blank');
		}
	}, [editor]);

	const handleLinkEditClick = () => {
		setShowEditForm(true);
	};

	const handleUnlinkClick = () => {
		editor.commands.unsetLink();
	};

	const handleSubmit = ({ url, openInNewTab }: linkOption) => {
		editor
			.chain()
			.focus()
			.unsetLink()
			.setLink({ href: url, target: openInNewTab ? '_blank' : '' })
			.run();
		setShowEditForm(false);
	};

	const getInitialState = useCallback(() => {
		const { href, target } = editor.getAttributes('link');

		return { url: href, openInNewTab: target ? true : false };
	}, [editor]);

	return (
		<BubbleMenu
			shouldShow={({ editor }) => {
				return editor.isActive('link');
			}}
			editor={editor}
			tippyOptions={{
				onHide: () => {
					setShowEditForm(false);
				},
			}}
		>
			<LinkForm
				visible={showEditForm}
				onSubmit={handleSubmit}
				initialState={getInitialState()}
			/>
			{!showEditForm && (
				<BubbleMenuContainer>
					<button onClick={handleOnLinkOpenClick}>
						<BsBoxArrowUpRight size={16} />
					</button>

					<button onClick={handleLinkEditClick}>
						<BsPencilSquare size={16} />
					</button>

					<button onClick={handleUnlinkClick}>
						<BiUnlink size={16} />
					</button>
				</BubbleMenuContainer>
			)}
		</BubbleMenu>
	);
};

const BubbleMenuContainer = styled.div`
	padding: 0.5rem 1rem;
	background-color: ${palette.grey_light2};
	border-radius: 8px;

	& button {
		background: none;
		border: none;
		cursor: pointer;
		transition: scale 0.15s;
		& svg:hover {
			transition: scale 0.15s;
			scale: 1.1;
			fill: black;
		}
	}
`;

export default EditLink;
