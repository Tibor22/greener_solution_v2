import { Article, Tag } from '@prisma/client';
import cloudinary from '../lib/cloudinary';
import prisma from '../lib/prisma';
import { PostObject, UpdateObj } from '../types/types';
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
					...(obj.excerpt && {
						excerpt: obj.excerpt,
					}),
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

			return article;
		} catch (e) {
			return null;
		}
	}
	async updatePost(
		thumbnail: formidable.File,
		obj: UpdateObj,
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

		const tagsFound = await checkTags(tags);

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
					...(obj.excerpt && {
						excerpt: obj.excerpt,
					}),
					...(obj.categoryName && {
						category: {
							connect: {
								name: obj.categoryName,
							},
						},
					}),
					...(tagsFound &&
						tagsFound?.length > 0 && {
							tags: {
								disconnect: oldTags.map((tag) => ({ id: tag.id })),
								connect: tagsFound?.map((tag: any) => ({ id: tag.id })),
							},
						}),
					...(typeof obj.hero == 'boolean' && { hero: obj.hero }),
					...(typeof obj.featured == 'boolean' && { featured: obj.featured }),
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

const checkTags = async function (tags: string[]) {
	try {
		const tagsFound = await prisma.tag.findMany({
			where: {
				OR: tags.map((tagName) => ({ name: tagName })),
			},
		});

		return tagsFound;
	} catch (e: any) {
		console.log(e.message);
	}
};

const postModel = new PostModel();

export default postModel;
