import { Comment } from '../models';

export async function createComment(postId: string, author: string, comment: string, parent?: string) {
  
  const newComment = new Comment({
    postId,
    author,
    comment,
    parent
  });

  await newComment.save();
  return newComment;
}