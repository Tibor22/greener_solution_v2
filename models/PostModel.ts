import { Article, Tag } from '@prisma/client';
import cloudinary from '../lib/cloudinary';
import prisma from '../lib/prisma';
import { PostObject } from '../types/types';
import formidable from 'formidable';

class PostModel {
	async createPost(
		thumbnail: formidable.File,
		obj: PostObject['body'],
		tags: string[]
	) {
		if (thumbnail) {
			const { secure_url: url, public_id } = await cloudinary.uploader.upload(
				thumbnail.filepath,
				{
					folder: 'test',
				}
			);
			const categoryFound = await prisma.category.findUnique({
				where: {
					name: obj.categoryName,
				},
			});
			const tagsFound = await prisma.tag.findMany({
				where: {
					OR: tags.map((tagName) => ({ name: tagName })),
				},
			});

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
					...(categoryFound && {
						categoryName: obj.categoryName,
					}),
					tags: {
						...(tagsFound.length > 0 && {
							connect: tagsFound.map((tag: any) => ({ id: tag.id })),
						}),
					},
				},

				include: {
					tags: true,
				},
			});
			console.log('ARTICLE CREATED:', articleCreated);
			return articleCreated;
		} else {
			throw new Error('Missing thumbnail');
		}
	}

	async findPost(key: string, value: string | number) {
		try {
			const article = await prisma.article.findUnique({
				where: {
					[key]: value,
				},
				include: {
					category: true,
					tags: true,
				},
			});
			console.log('ARTICLE:', article);
			return article;
		} catch (e) {
			return null;
		}
	}
	async updatePost(
		thumbnail: formidable.File,
		obj: Article,
		slug: string,
		tags: string[],
		oldTags: Tag[]
	) {
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

		const tagsFound: Tag[] = await prisma.tag.findMany({
			where: {
				OR: tags.map((tagName) => ({ name: tagName })),
			},
		});

		try {
			const updateArticle = await prisma.article.update({
				where: {
					slug: slug,
				},
				data: {
					...(obj.title && { title: obj.title }),
					...(obj.content && { content: obj.content }),
					...(obj.slug && { slug: obj.slug }),
					...(obj.meta && { meta: obj.meta }),
					published: Boolean(obj.published) || false,
					...(obj.thumbnailUrl && { thumbnailUrl: obj.thumbnailUrl }),
					...(obj.thumbnailId && { thumbnailId: obj.thumbnailId }),
					...(obj.categoryName && {
						category: {
							connect: {
								name: obj.categoryName,
							},
						},
					}),
					tags: {
						...(tagsFound.length > 0 && {
							disconnect: oldTags.map((tag) => ({ id: tag.id })),
							connect: tagsFound.map((tag: any) => ({ id: tag.id })),
						}),
					},
				},
				include: {
					tags: true,
				},
			});
			return updateArticle;
		} catch (e: any) {
			console.error(e.message);
		}
	}

	async deletePost(thumbnailId: string | null, slug: string) {
		if (thumbnailId) {
			await cloudinary.uploader.destroy(thumbnailId);
		}

		const deletedPost = await prisma.article.delete({
			where: {
				slug: slug,
			},
		});
		return deletedPost;
	}
}

const postModel = new PostModel();

export default postModel;
