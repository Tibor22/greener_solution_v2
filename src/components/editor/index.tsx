import { ChangeEventHandler, FC, useEffect, useState } from 'react';
import { useEditor, EditorContent, getMarkRange, Range } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ToolBar from './ToolBar';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import TipTapImage from '@tiptap/extension-image';
import ListItem from '@tiptap/extension-list-item';
import {
	SeoResult,
	FinalPost,
	ImageSelectionResult,
} from '../../../types/types';
// import EditLink from './Link/EditLink';
// import GalleryModal from './GalleryModal';
// import { ImageSelectionResult } from './GalleryModal';
import axios from 'axios';
import styled from 'styled-components';
import { fonts } from '@/styles/common';
import { merriweather } from '@/styles/fonts';
import HardBreak from '@tiptap/extension-hard-break';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Blockquote from '@tiptap/extension-blockquote';
// import SEOForm, { SeoResult } from './SEOForm';
// import ActionButton from '../common/ActionButton';
// import ThumbnailSelector from './ThumbnailSelector';

interface Props {
	initialValue?: FinalPost;
	btnTitle?: string;
	busy?: boolean;
	onSubmit(post: FinalPost): void;
}

const Editor: FC<Props> = ({
	onSubmit,
	initialValue,
	btnTitle = 'Submit',
	busy = false,
}): JSX.Element => {
	const [selectionRange, setSelectionRange] = useState<Range>();
	const [showGallery, setShowGallery] = useState(false);
	const [images, setImages] = useState<{ src: string }[]>([]);
	const [seoInitialValue, setSeoInitialValue] = useState<SeoResult>();
	const [uploading, setUploading] = useState(false);
	const [post, setPost] = useState<FinalPost>({
		title: '',
		content: '',
		meta: '',
		tags: '',
		slug: '',
	});

	const fetchImages = async () => {
		const { data } = await axios('/api/image');
		setImages(data.images);
	};

	const handleImageUpload = async (image: File) => {
		setUploading(true);
		const formData = new FormData();
		formData.append('image', image);
		const { data } = await axios.post('/api/image', formData);
		setImages((prevImages) => [...prevImages, data]);
		setUploading(false);
	};

	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Link.configure({
				autolink: false,
				linkOnPaste: false,
				openOnClick: false,
				HTMLAttributes: {
					target: '',
				},
			}),
			Placeholder.configure({
				placeholder: 'Type something',
			}),
			HardBreak.extend({
				addKeyboardShortcuts() {
					return {
						ArrowDown: () => this.editor.commands.setHardBreak(),
					};
				},
			}),

			// Youtube.configure({
			// 	width: 840,
			// 	height: 472.5,
			// 	HTMLAttributes: {
			// 		class: 'mx-auto rounded',
			// 	},
			// }),
			// TipTapImage.configure({
			// 	HTMLAttributes: {
			// 		class: 'mx-auto',
			// 	},
			// }),
		],
		editorProps: {
			handleClick(view, pos, event) {
				const { state } = view;
				const selectionRange = getMarkRange(
					state.doc.resolve(pos),
					state.schema.marks.link
				);
				if (selectionRange) setSelectionRange(selectionRange);
			},

			// attributes: {
			// 	class:
			// 		'prose prose-lg focus:outline-none dark:prose-invert max-w-full mx-auto h-full',
			// },
		},
	});

	console.log('EDITOR:', editor);

	const handleImageSelection = (result: ImageSelectionResult) => {
		editor
			?.chain()
			.focus()
			.setImage({ src: result.src, alt: result.altText })
			.run();
	};

	useEffect(() => {
		if (editor && selectionRange) {
			editor.commands.setTextSelection(selectionRange);
		}
	}, [editor, selectionRange]);
	useEffect(() => {
		fetchImages();
	}, []);
	useEffect(() => {
		if (initialValue) {
			setPost({ ...initialValue });
			editor?.commands.setContent(initialValue.content);

			const { meta, slug, tags } = initialValue;
			setSeoInitialValue({ meta, slug, tags });
		}
	}, [initialValue, editor]);

	const updateTitle: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
		setPost((prevPost) => ({ ...prevPost, title: target.value }));
	};
	const updateSEOValue = (result: SeoResult) => {
		setPost((prevPost) => ({ ...prevPost, ...result }));
	};
	const updateThumbnail = (file: File) => {
		setPost((prevPost) => ({ ...prevPost, thumbnail: file }));
	};

	const handleSubmit = () => {
		if (!editor) return;
		onSubmit({ ...post, content: editor.getHTML() });
	};

	return (
		<>
			<EditorContainer>
				<EditorNav>
					<div>
						{/* <ThumbnailSelector
							initialValue={post.thumbnail as string}
							onChange={updateThumbnail}
						/> */}
						<div className='inline-block'>
							{/* <ActionButton
								busy={busy}
								onClick={handleSubmit}
								title={btnTitle}
							/> */}
						</div>
					</div>
					<Title
						value={post.title}
						onChange={updateTitle}
						type='text'
						placeholder='Title'
					/>
					<ToolBar
						editor={editor}
						onOpenImageClick={() => setShowGallery(true)}
					/>
					{/* SPACER */}
				</EditorNav>
				{/* {editor ? <EditLink editor={editor} /> : null} */}
				<CEditorContent editor={editor} />
				{/* SPACER */}
				{/* <SEOForm
					onChange={updateSEOValue}
					title={post.title}
					initialValue={seoInitialValue}
				/> */}
			</EditorContainer>
			{/* {showGallery && (
				<GalleryModal
					images={images}
					visible={showGallery}
					onClose={() => setShowGallery(false)}
					onSelect={handleImageSelection}
					onFileSelect={handleImageUpload}
					uploading={uploading}
				/>
			)} */}
		</>
	);
};

const CEditorContent = styled(EditorContent)<{ editor: any }>`
	margin-top: 1rem;
	& .ProseMirror {
		min-height: 300px;
		font-size: ${fonts.regular};
		max-width: 100%;
		padding: 0.75rem;
		color: black;
	}

	& .ProseMirror p.is-editor-empty:first-child::before {
		color: #adb5bd;
		content: attr(data-placeholder);
		float: left;
		height: 0;
		pointer-events: none;
	}
`;

const Title = styled.input`
	width: 100%;
	margin-top: 2rem;
	font-size: 1.8rem;
	border: none;
	border-bottom: 1px solid grey;
	outline: none;
	padding: 1rem 0rem 1rem 1rem;
	&::placeholder {
		font-size: 1.8rem;
		letter-spacing: 2px;
	}
`;

const CustomBLockQuote = styled.blockquote`
	margin-block-start: 0px;
	margin-block-end: 0px;
	margin-inline-start: 0px;
	margin-inline-end: 0px;
	padding: 15px;
	background: #eee;
	border-radius: 5px;
`;

const EditorContainer = styled.div`
	overflow-x: hidden;
`;

const EditorNav = styled.div``;
export default Editor;

// import { Color } from '@tiptap/extension-color';
// import ListItem from '@tiptap/extension-list-item';
// import TextStyle from '@tiptap/extension-text-style';
// import { EditorContent, useEditor } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import React from 'react';

// export const Editor = () => {
// 	const editor = useEditor({
// 		extensions: [
// 			StarterKit,
// 			Underline,
// 			Link.configure({
// 				autolink: false,
// 				linkOnPaste: false,
// 				openOnClick: false,
// 				HTMLAttributes: {
// 					target: '',
// 				},
// 			}),
// 			Placeholder.configure({
// 				placeholder: 'Type something',
// 			}),
// 			HardBreak.extend({
// 				addKeyboardShortcuts() {
// 					return {
// 						ArrowDown: () => this.editor.commands.setHardBreak(),
// 					};
// 				},
// 			}),

// 			// Youtube.configure({
// 			// 	width: 840,
// 			// 	height: 472.5,
// 			// 	HTMLAttributes: {
// 			// 		class: 'mx-auto rounded',
// 			// 	},
// 			// }),
// 			// TipTapImage.configure({
// 			// 	HTMLAttributes: {
// 			// 		class: 'mx-auto',
// 			// 	},
// 			// }),
// 		],
// 		// editorProps: {
// 		// 	handleClick(view, pos, event) {
// 		// 		const { state } = view;
// 		// 		const selectionRange = getMarkRange(
// 		// 			state.doc.resolve(pos),
// 		// 			state.schema.marks.link
// 		// 		);
// 		// 		if (selectionRange) setSelectionRange(selectionRange);
// 		// 	},

// 		// attributes: {
// 		// 	class:
// 		// 		'prose prose-lg focus:outline-none dark:prose-invert max-w-full mx-auto h-full',
// 		// },
// 		// },
// 	});

// 	console.log('EDITOR INSIDE EDITOR:', editor);

// 	return (
// 		<div>
// 			<MenuBar editor={editor} />
// 			<EditorContent editor={editor} />
// 		</div>
// 	);
// };

// const MenuBar = (editor: any) => {
// 	if (!editor) {
// 		return null;
// 	}
// 	console.log('EDITOR:', editor);
// 	return (
// 		<>
// 			<button
// 				onClick={() => editor.chain().focus().toggleBold().run()}
// 				disabled={!editor.can().chain().focus().toggleBold().run()}
// 				className={editor.isActive('bold') ? 'is-active' : ''}
// 			>
// 				bold
// 			</button>
// 			<button
// 				onClick={() => editor.chain().focus().toggleItalic().run()}
// 				disabled={!editor.can().chain().focus().toggleItalic().run()}
// 				className={editor.isActive('italic') ? 'is-active' : ''}
// 			>
// 				italic
// 			</button>
// 			<button
// 				onClick={() => editor.chain().focus().toggleStrike().run()}
// 				disabled={!editor.can().chain().focus().toggleStrike().run()}
// 				className={editor.isActive('strike') ? 'is-active' : ''}
// 			>
// 				strike
// 			</button>
// 			<button
// 				onClick={() => editor.chain().focus().toggleCode().run()}
// 				disabled={!editor.can().chain().focus().toggleCode().run()}
// 				className={editor.isActive('code') ? 'is-active' : ''}
// 			>
// 				code
// 			</button>
// 			<button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
// 				clear marks
// 			</button>
// 			<button onClick={() => editor.chain().focus().clearNodes().run()}>
// 				clear nodes
// 			</button>
// 			<button
// 				onClick={() => editor.chain().focus().setParagraph().run()}
// 				className={editor.isActive('paragraph') ? 'is-active' : ''}
// 			>
// 				paragraph
// 			</button>
// 			<button
// 				onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
// 				className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
// 			>
// 				h1
// 			</button>
// 			<button
// 				onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
// 				className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
// 			>
// 				h2
// 			</button>
// 			<button
// 				onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
// 				className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
// 			>
// 				h3
// 			</button>
// 			<button
// 				onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
// 				className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
// 			>
// 				h4
// 			</button>
// 			<button
// 				onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
// 				className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
// 			>
// 				h5
// 			</button>
// 			<button
// 				onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
// 				className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
// 			>
// 				h6
// 			</button>
// 			<button
// 				onClick={() => editor.chain().focus().toggleBulletList().run()}
// 				className={editor.isActive('bulletList') ? 'is-active' : ''}
// 			>
// 				bullet list
// 			</button>
// 			<button
// 				onClick={() => editor.chain().focus().toggleOrderedList().run()}
// 				className={editor.isActive('orderedList') ? 'is-active' : ''}
// 			>
// 				ordered list
// 			</button>
// 			<button
// 				onClick={() => editor.chain().focus().toggleCodeBlock().run()}
// 				className={editor.isActive('codeBlock') ? 'is-active' : ''}
// 			>
// 				code block
// 			</button>
// 			<button
// 				onClick={() => editor.chain().focus().toggleBlockquote().run()}
// 				className={editor.isActive('blockquote') ? 'is-active' : ''}
// 			>
// 				blockquote
// 			</button>
// 			<button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
// 				horizontal rule
// 			</button>
// 			<button onClick={() => editor.chain().focus().setHardBreak().run()}>
// 				hard break
// 			</button>
// 			<button
// 				onClick={() => editor.chain().focus().undo().run()}
// 				disabled={!editor.can().chain().focus().undo().run()}
// 			>
// 				undo
// 			</button>
// 			<button
// 				onClick={() => editor.chain().focus().redo().run()}
// 				disabled={!editor.can().chain().focus().redo().run()}
// 			>
// 				redo
// 			</button>
// 			<button
// 				onClick={() => editor.chain().focus().setColor('#958DF1').run()}
// 				className={
// 					editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''
// 				}
// 			>
// 				purple
// 			</button>
// 		</>
// 	);
// };
