import Joi, { ObjectSchema } from 'joi';

export const errorMessages = {
	INVALID_TITLE: 'Title is missing!',
	INVALID_TAGS: 'Tags must be array of strings!',
	INVALID_CATEGORIES: 'Categories must be array of strings!',
	INVALID_SLUG: 'Slug is missing!',
	INVALID_META: 'Meta description is missing!',
	INVALID_CONTENT: 'Post content is missing!',
	INVALID_AUTHORID: 'Author ID is missing!',
};

export const postValidationSchema = Joi.object().keys({
	title: Joi.string().required().messages({
		'string.empty': errorMessages.INVALID_TITLE,
		'any.required': errorMessages.INVALID_TITLE,
	}),
	content: Joi.string().required().messages({
		'string.empty': errorMessages.INVALID_CONTENT,
		'any.required': errorMessages.INVALID_CONTENT,
	}),
	slug: Joi.string().required().messages({
		'string.empty': errorMessages.INVALID_SLUG,
		'any.required': errorMessages.INVALID_SLUG,
	}),
	meta: Joi.string().required().messages({
		'string.empty': errorMessages.INVALID_META,
		'any.required': errorMessages.INVALID_META,
	}),
	tags: Joi.array().items(Joi.string()).messages({
		'string.base': errorMessages.INVALID_TAGS,
		'string.empty': errorMessages.INVALID_TAGS,
	}),
	categoryName: Joi.string().required().messages({
		'string.base': errorMessages.INVALID_CATEGORIES,
		'string.empty': errorMessages.INVALID_CATEGORIES,
	}),
	authorId: Joi.string().required().messages({
		'string.base': errorMessages.INVALID_AUTHORID,
		'string.empty': errorMessages.INVALID_AUTHORID,
	}),
});
export const userValidationSchema = Joi.object().keys({
	name: Joi.string().required().messages({
		'string.empty': errorMessages.INVALID_TITLE,
		'any.required': errorMessages.INVALID_TITLE,
	}),
	role: Joi.string().required().messages({
		'string.empty': errorMessages.INVALID_CONTENT,
		'any.required': errorMessages.INVALID_CONTENT,
	}),
	displayName: Joi.string().required().messages({
		'string.empty': errorMessages.INVALID_SLUG,
		'any.required': errorMessages.INVALID_SLUG,
	}),
	email: Joi.string().email().required().messages({
		'string.empty': errorMessages.INVALID_META,
		'any.required': errorMessages.INVALID_META,
	}),
	password: Joi.string().required().messages({
		'string.base': errorMessages.INVALID_TAGS,
		'string.empty': errorMessages.INVALID_TAGS,
	}),
});

export const validateSchema = (schema: ObjectSchema, value: any) => {
	const { error } = schema.validate(value, {
		errors: { label: 'key', wrap: { label: false, array: false } },
		allowUnknown: true,
	});

	if (error) return error.details[0].message;

	return '';
};
