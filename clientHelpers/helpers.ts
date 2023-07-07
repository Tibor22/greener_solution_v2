import axios, { CancelTokenSource } from 'axios';
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

export const client = {
	GET: async (url: string | undefined, source: CancelTokenSource) => {
		try {
			if (!url) throw new Error(`url is required`);

			const data = await axios.get(url, { cancelToken: source.token });
			if (data.status === 200) {
				return data.data;
			}
		} catch (e: any) {
			return { msg: e.message };
		}
	},
	DELETE: async (url: string | undefined) => {
		try {
			if (!url) throw new Error(`url is required`);
			const data = await axios.delete(url);
			if (data.status === 200) {
				return data.data;
			}
		} catch (e: any) {
			return { msg: e.message };
		}
	},
	POST: async (url: string | undefined, formData: any) => {
		try {
			if (!url) throw new Error(`url is required`);
			const data = await axios.post(url, formData);
			if (data.status === 201) {
				return data.data;
			}
		} catch (e: any) {
			return { msg: e.message };
		}
	},
	PATCH: async (url: string | undefined, formData: any) => {
		try {
			if (!url) throw new Error(`url is required`);
			const data = await axios.patch(url, formData);
			if (data.status === 201) {
				return data.data;
			}
		} catch (e: any) {
			return { msg: e.message };
		}
	},
};
