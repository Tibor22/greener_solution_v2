import { ChangeEventHandler, FC, useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent, getMarkRange, Range } from '@tiptap/react';
import TextStyle from '@tiptap/extension-text-style';

import StarterKit from '@tiptap/starter-kit';
import ToolBar from './ToolBar';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import TipTapImage from '@tiptap/extension-image';
import {
	SeoResult,
	FinalPost,
	ImageSelectionResult,
} from '../../../types/types';
import GalleryModal from './GalleryModal';
import axios from 'axios';
import styled from 'styled-components';
import { fonts, palette } from '@/styles/common';
import HardBreak from '@tiptap/extension-hard-break';
import EditLink from './Link/EditLink';
import SEOForm from './SEOForm';
import ThumbnailSelector from './ThumbnailSelector';
import Button from '../Button';
import { Text } from '../../styles/sharedStyles';
import { Extension, CommandProps } from '@tiptap/core';

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
	const [editorHeight, setEditorHeight] = useState(300);
	const [post, setPost] = useState<FinalPost>({
		title: '',
		content: '',
		meta: '',
		tags: [],
		slug: '',
		categoryName: '',
		authorId: '',
		excerpt: '',
	});
	const editorRef = useRef(null);

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

	const CustomTextStyle = Extension.create({
		name: 'customTextStyle',
		defaultOptions: {
			types: ['textStyle'],
		},
		addGlobalAttributes() {
			return [
				{
					types: this.options.types,
					attributes: {
						class: {
							default: null,
							renderHTML: (attributes) => {
								if (attributes?.class?.className) {
									return { class: attributes.class.className };
								} else if (attributes?.class) {
									return { class: attributes.class };
								} else {
									return '';
								}
							},
							parseHTML: (element) => {
								return element.getAttribute('class');
							},
						},
					},
				},
			];
		},
	});

	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			TextStyle,
			CustomTextStyle,
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

			Youtube.configure({
				width: 840,
				height: 472.5,
				HTMLAttributes: {
					style: 'width:100%; border-radius:8px;',
				},
			}),
			TipTapImage.configure({
				HTMLAttributes: {
					style: 'aspect-ratio:16/9;width:100%;border-radius:8px;',
				},
			}),
		],
		editorProps: {
			handleClick(view, pos) {
				const { state } = view;
				const selectionRange = getMarkRange(
					state.doc.resolve(pos),
					state.schema.marks.link
				);
				if (selectionRange) setSelectionRange(selectionRange);
			},
		},
	});

	const handleImageSelection = (result: ImageSelectionResult) => {
		editor
			?.chain()
			.focus()
			.setImage({ src: result.src, alt: result.altText })
			.run();

		setEditorHeight(
			editorRef &&
				// @ts-ignore:next-line
				editorRef.current?.editorContentRef.current.clientHeight + 300
		);
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

			const { meta, slug, tags, categoryName } = initialValue;
			setSeoInitialValue({ meta, slug, tags, categoryName });
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
				<ThumbnailContainer>
					<ThumbnailSelector
						initialValue={post.thumbnail as string}
						onChange={updateThumbnail}
					/>
					<div className='inline-block'>
						<Button type='primary' busy={busy} ifClicked={handleSubmit}>
							{btnTitle}
						</Button>
					</div>
				</ThumbnailContainer>
				<Title
					value={post.title}
					onChange={updateTitle}
					type='text'
					placeholder='Title'
				/>
				<ToolBar
					editor={editor}
					setEditorHeight={setEditorHeight}
					onOpenImageClick={() => setShowGallery(true)}
				/>
				{/* SPACER */}

				{editor ? <EditLink editor={editor} /> : null}
				<CEditorContent
					editorHeight={editorHeight}
					ref={editorRef}
					editor={editor}
				/>
				{/* SPACER */}
				<label style={{ marginTop: '3rem', display: 'block' }}>
					<Text>Excerpt</Text>

					<TextArea
						onChange={(e) =>
							setPost((prevPost) => ({ ...prevPost, excerpt: e.target.value }))
						}
						value={post.excerpt}
						name='meta'
						placeholder='Short description of the article'
					></TextArea>
				</label>
				<SEOForm
					onChange={updateSEOValue}
					title={post.title}
					initialValue={seoInitialValue}
				/>
			</EditorContainer>
			{showGallery && (
				<GalleryModal
					images={images}
					visible={showGallery}
					onClose={() => setShowGallery(false)}
					onSelect={handleImageSelection}
					onFileSelect={handleImageUpload}
					uploading={uploading}
				/>
			)}
		</>
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
const ThumbnailContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 3rem;
	font-size: ${fonts.regular};
	align-items: center;
`;

const CEditorContent = styled(EditorContent)<{
	editor: any;
	editorHeight: number;
}>`
	margin-top: 1rem;
	margin: 0 auto;
	max-width: 100%;
	& .ProseMirror {
		min-height: ${({ editorHeight }) => editorHeight}px;
		font-size: ${fonts.regular};
		max-width: 100%;
		padding: 0.75rem;
		color: black;
		outline: none;
		border-bottom: 1px solid ${palette.grey_light};
	}
	& .ProseMirror ul,
	ol li {
		margin-left: 40px;
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

const EditorContainer = styled.div`
	max-width: 840px;
	padding: 1rem;
`;

const EditorNav = styled.div``;
export default Editor;
