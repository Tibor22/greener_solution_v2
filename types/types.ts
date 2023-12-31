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
		excerpt?: string;
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
	hero: boolean;
	featured: boolean;
	excerpt?: string;
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
	content: string;
	authorId: string;
	excerpt: string;
	category?: string;
	thumbnail?: File | string;
}

export interface SeoResult {
	meta: string;
	slug: string;
	tags: string[] | null;
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

export type HeroType = {
	slug: string;
	title: string;
	thumbnailUrl: string;
	authorId: number;
	hero: boolean;
	excerpt: string;
	category: {
		id: number;
		name: string;
	};
};
export type FeaturedType = {
	slug: string;
	title: string;
	thumbnailUrl: string;
	authorId: number;
	excerpt?: string;
	category: {
		id: number;
		name: string;
	};
};

export interface SeoResult {
	meta: string;
	slug: string;
	tags: string[] | null;
}

export type WeatherData = {
	location: string;
	temperature: string;
};
export type PollutionData = {
	location: string;
	data: string;
};
