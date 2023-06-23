import { FC, SetStateAction } from 'react';
import { Editor } from '@tiptap/react';
import Dropdown from '@/components/DropDown';
import { getFocusedEditor } from '../../../../clientHelpers/helpers';
// import Button from './Button';
import { AiFillCaretDown } from 'react-icons/ai';
import { RiDoubleQuotesL } from 'react-icons/ri';
import {
	BsTypeBold,
	BsTypeStrikethrough,
	BsBraces,
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
// import InsertLink from '../Link/InsertLink';
// import { linkOption } from '../Link/LinkForm';
// import EmbedYoutube from './EmbedYoutube';

interface Props {
	editor: Editor | null;
	onOpenImageClick?(): void;
}

const ToolBar: FC<Props> = ({
	editor,
	onOpenImageClick,
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

	const handleLinkSubmit = ({ url, openInNewTab }: LinkOption) => {
		console.log('URL:', url);
		editor.commands.setLink({
			href: url,
			...(openInNewTab && { target: '_blank' }),
		});
	};

	const handleEmbedYoutube = (url: string) => {
		editor.chain().focus().setYoutubeVideo({ src: url }).run();
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
				<Button
					active={editor.isActive('codeBlock')}
					onClick={() => getFocusedEditor(editor).toggleCodeBlock().run()}
				>
					<BsBraces />
				</Button>
				{/* <InsertLink onSubmit={handleLinkSubmit} /> */}
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
			<div />
			<div>
				{/* <EmbedYoutube onSubmit={handleEmbedYoutube} /> */}
				<Button onClick={() => onOpenImageClick}>
					<BsImageFill />
				</Button>
			</div>
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
`;

const ToolBarWrapper = styled.div`
	display: flex;
	gap: 2rem;
	align-items: center;
	margin-top: 2rem;
`;

export default ToolBar;
