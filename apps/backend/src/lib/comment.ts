import { Comment } from '../models';

export async function createComment(postId: string, author: string, comment: string, parent?: string) {

  const replies = [];

  
  const newComment = new Comment({
    postId,
    author,
    comment,
    replies,
    parent
  });

  await newComment.save();
  return newComment;
}