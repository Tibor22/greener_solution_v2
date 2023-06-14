import formidable from 'formidable';
export type PostObject = {
	body: {
		tags?: string;
		categories?: string;
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
	tags: string;
	categories: string;
	id: number;
	createdAt: Date;
	updatedAt: Date;
	authorId: number;
	thumbnailUrl: string;
	thumbnailId: string;
}
