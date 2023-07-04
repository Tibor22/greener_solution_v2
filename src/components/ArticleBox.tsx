import { FC } from 'react';
import { UpdateObj } from '../../types/types';

const ArticleBox: FC<{ post: UpdateObj }> = ({ post }): JSX.Element => {
	console.log('POST:', post);
	return <div>{post.title}</div>;
};

export default ArticleBox;
