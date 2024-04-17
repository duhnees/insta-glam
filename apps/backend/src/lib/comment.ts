import { Comment } from '../models';

export async function createComment(postId: string, author: string, comment: string) {

  const replies = [];
  
  const newComment = new Comment({
    postId,
    author,
    comment,
    replies
  });

  await newComment.save();
  return newComment;
}