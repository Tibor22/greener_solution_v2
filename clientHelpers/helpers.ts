import { FinalPost } from '../types/types';
import { Editor } from '@tiptap/react';

export const generateFormData = (post: FinalPost) => {
	const formData = new FormData();
	for (let key in post) {
		const value = (post as any)[key];
		if (key === 'tags' && value.trim()) {
			const tags = value.split(',').map((tag: string) => tag.trim());
			formData.append('tags', JSON.stringify(tags));
		} else formData.append(key, value);
	}

	return formData;
};

export const getFocusedEditor = (editor: Editor) => {
	return editor.chain().focus();
};

export const validateUrl = (url: string) => {
	if (!url.trim()) return '';
	let finalUrl;

	try {
		finalUrl = new URL(url);
	} catch (e) {
		finalUrl = new URL('https://' + url);
	}

	return finalUrl.origin;
};
