import formidable from 'formidable';
export type PostObject = {
	body: {
		tags?: string;
		categoryName: string;
		title: string;
		content: string;
		slug: string;
		meta: string;
		image: string;
		authorId: string;
		published?: boolean;
	};
	files: formidable.Files;
};

export interface UpdateObj {
	title: string;
	content: string;
	slug: string;
	published: boolean;
	meta: string;
	tags?: string | string[];
	categoryName: string | null;
	id: number;
	createdAt: Date;
	updatedAt: Date;
	authorId: number;
	thumbnailUrl: string;
	thumbnailId: string;
}

export type UserObject = {
	name: string;
	role: string;
	displayName: string;
	email: string;
	password: string;
};

export interface FinalPost extends SeoResult {
	title: string;
	content: String;
	authorId: String;
	thumbnail?: File | string;
}

export interface SeoResult {
	meta: string;
	slug: string;
	tags: string;
	categoryName: string;
}

export interface ImageSelectionResult {
	src: string;
	altText: string;
}

export type LinkOption = {
	url: string;
	openInNewTab: boolean;
};

export interface SeoResult {
	meta: string;
	slug: string;
	tags: string;
}
