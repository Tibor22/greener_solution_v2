import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Editor } from '@tiptap/react';
import Dropdown from '@/components/DropDown';
import { getFocusedEditor } from '../../../../clientHelpers/helpers';
import { AiFillCaretDown } from 'react-icons/ai';
import { RiDoubleQuotesL } from 'react-icons/ri';
import {
	BsTypeBold,
	BsTypeStrikethrough,
	BsCode,
	BsListOl,
	BsListUl,
	BsTypeItalic,
	BsTypeUnderline,
	BsImageFill,
} from 'react-icons/bs';
import { LinkOption } from '../../../../types/types';
import styled from 'styled-components';
import { palette } from '@/styles/common';
import InsertLink from '../Link/InsertLink';
import LinkForm, { linkOption } from '../Link/LinkForm';
import EmbedYoutube from './EmbedYoutube';

interface Props {
	editor: Editor | null;
	onOpenImageClick(): void;
	setEditorHeight: Dispatch<SetStateAction<number>>;
}

const ToolBar: FC<Props> = ({
	editor,
	onOpenImageClick,
	setEditorHeight,
}): JSX.Element | null => {
	if (!editor) return null;

	const options = [
		{
			label: 'Paragraph',
			onClick: () => getFocusedEditor(editor).setParagraph().run(),
		},
		{
			label: 'Heading 1',
			onClick: () => getFocusedEditor(editor).toggleHeading({ level: 1 }).run(),
		},
		{
			label: 'Heading 2',
			onClick: () => getFocusedEditor(editor).toggleHeading({ level: 2 }).run(),
		},
		{
			label: 'Heading 3',
			onClick: () => getFocusedEditor(editor).toggleHeading({ level: 3 }).run(),
		},
	];

	const Head = () => {
		return (
			<DropDownHeader>
				<p>{getLabel()}</p>
				<AiFillCaretDown />
			</DropDownHeader>
		);
	};

	const getLabel = (): string => {
		if (editor.isActive('heading', { level: 1 })) return 'Heading 1';
		if (editor.isActive('heading', { level: 2 })) return 'Heading 2';
		if (editor.isActive('heading', { level: 3 })) return 'Heading 3';
		return 'Paragraph';
	};
	const [visible, setVisible] = useState(false);
	const handleLinkSubmit = ({ url, openInNewTab }: LinkOption) => {
		if (!url.trim()) return setVisible(false);
		setVisible(false);
		editor.commands.setLink({
			href: url,
			...(openInNewTab && { target: '_blank' }),
		});
	};

	const handleEmbedYoutube = (url: string) => {
		editor.chain().focus().setYoutubeVideo({ src: url }).run();
		setEditorHeight((prevHeight) => (prevHeight > 300 ? 400 : 700));
	};

	return (
		<ToolBarWrapper>
			<Dropdown options={options} head={<Head />} />
			<Flex>
				<Button
					active={editor.isActive('bold')}
					onClick={() => getFocusedEditor(editor).toggleBold().run()}
				>
					<BsTypeBold />
				</Button>
				<Button
					active={editor.isActive('italic')}
					onClick={() => getFocusedEditor(editor).toggleItalic().run()}
				>
					<BsTypeItalic />
				</Button>
				<Button
					active={editor.isActive('underline')}
					onClick={() => getFocusedEditor(editor).toggleUnderline().run()}
				>
					<BsTypeUnderline />
				</Button>
				<Button
					active={editor.isActive('strike')}
					onClick={() => getFocusedEditor(editor).toggleStrike().run()}
				>
					<BsTypeStrikethrough />
				</Button>
			</Flex>
			<Flex>
				<Button
					active={editor.isActive('blockquote')}
					onClick={() => getFocusedEditor(editor).toggleBlockquote().run()}
				>
					<RiDoubleQuotesL />
				</Button>
				<Button
					active={editor.isActive('code')}
					onClick={() => getFocusedEditor(editor).toggleCode().run()}
				>
					<BsCode />
				</Button>
				<InsertLink visible={visible} setVisible={setVisible}>
					<LinkForm onSubmit={handleLinkSubmit} visible={visible} />
				</InsertLink>
				<Button
					active={editor.isActive('orderedList')}
					onClick={() => getFocusedEditor(editor).toggleOrderedList().run()}
				>
					<BsListOl />
				</Button>
				<Button
					active={editor.isActive('bulletList')}
					onClick={() => getFocusedEditor(editor).toggleBulletList().run()}
				>
					<BsListUl />
				</Button>
			</Flex>
			<Flex>
				<EmbedYoutube onSubmit={handleEmbedYoutube} />

				<Button
					style={{ marginRight: '0rem' }}
					onClick={() => onOpenImageClick()}
				>
					<BsImageFill />
				</Button>
			</Flex>
		</ToolBarWrapper>
	);
};

const Flex = styled.div`
	display: flex;
`;
const DropDownHeader = styled.div`
	display: flex;
	gap: 0.5rem;
	align-items: center;
	padding: 0.3rem 1rem;
	cursor: pointer;
`;

const Button = styled.button<{ active?: boolean }>`
	padding: 1.5rem;
	margin-right: 0.5rem;
	background: ${palette.silver_light};
	color: white;
	font-size: 2.2rem;
	border: none;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 8px;
	cursor: pointer;
	transition: all 0.15s;
	&:hover {
		scale: 0.96;
	}
`;

const ToolBarWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 2rem;
	align-items: center;
	margin-top: 2rem;
	margin-bottom: 2rem;
`;

export default ToolBar;
