import { Article } from '@prisma/client';
import cloudinary from '../lib/cloudinary';
import prisma from '../lib/prisma';
import { PostObject } from '../types/types';
import formidable from 'formidable';

class PostModel {
	async createPost(thumbnail: formidable.File, obj: PostObject['body']) {
		if (thumbnail) {
			const { secure_url: url, public_id } = await cloudinary.uploader.upload(
				thumbnail.filepath,
				{
					folder: 'test',
				}
			);
			const articleCreated = await prisma.article.create({
				data: {
					title: obj.title,
					content: obj.content,
					slug: obj.slug,
					authorId: Number(obj.authorId),
					published: false,
					meta: obj.meta,
					thumbnailUrl: url,
					thumbnailId: public_id,
				},
			});

			return articleCreated;
		} else {
			throw new Error('Missing thumbnail');
		}
	}

	async findPost(key: string, value: string) {
		// try {
		const article = await prisma.article.findUnique({
			where: {
				[key]: value,
			},
		});

		return article;
	}
	async updatePost(thumbnail: formidable.File, obj: Article) {
		if (thumbnail) {
			const { secure_url: url, public_id } = await cloudinary.uploader.upload(
				thumbnail.filepath,
				{
					folder: 'test',
				}
			);

			// #1-cond. => the post can already have thumbnail
			// so remove old, upload new image and then update record inside DB.
			const publicId = obj?.thumbnailId as string;
			if ('thumbnailId' in obj) await cloudinary.uploader.destroy(publicId);

			const updateArticle = await prisma.article.update({
				where: {
					id: Number(obj.id),
				},
				data: {
					title: obj.title,
					content: obj.content,
					slug: obj.slug,
					published: false,
					meta: obj.meta,
					thumbnailUrl: url,
					thumbnailId: public_id,
				},
			});

			return updateArticle;
		} else {
			const updateArticle = await prisma.article.update({
				where: {
					id: Number(obj.id),
				},
				data: {
					title: obj.title,
					content: obj.content,
					slug: obj.slug,
					published: false,
					meta: obj.meta,
				},
			});
			return updateArticle;
		}
	}
}

const postModel = new PostModel();

export default postModel;
