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
					categoryName: obj.categoryName,
				},
			});

			return articleCreated;
		} else {
			throw new Error('Missing thumbnail');
		}
	}

	async findPost(key: string, value: string | number) {
		// try {
		const article = await prisma.article.findUnique({
			where: {
				[key]: value,
			},
		});

		return article;
	}
	async updatePost(thumbnail: formidable.File, obj: Article, slug: string) {
		if (thumbnail) {
			const { secure_url: url, public_id } = await cloudinary.uploader.upload(
				thumbnail.filepath,
				{
					folder: 'test',
				}
			);
			const publicId = obj?.thumbnailId as string;
			if ('thumbnailId' in obj) await cloudinary.uploader.destroy(publicId);
			obj.thumbnailId = public_id;
			obj.thumbnailUrl = url;
		}

		const updateArticle = await prisma.article.update({
			where: {
				slug: slug,
			},
			data: {
				...(obj.title && { title: obj.title }),
				...(obj.content && { content: obj.content }),
				...(obj.slug && { slug: obj.slug }),
				...(obj.meta && { meta: obj.meta }),
				published: obj.published || false,
				...(obj.thumbnailUrl && { thumbnailUrl: obj.thumbnailUrl }),
				...(obj.thumbnailId && { thumbnailId: obj.thumbnailId }),
				...(obj.categoryName && {
					category: {
						connect: {
							name: obj.categoryName,
						},
					},
				}),
			},
			include: {
				category: true,
			},
		});
		return updateArticle;
	}
}

const postModel = new PostModel();

export default postModel;
