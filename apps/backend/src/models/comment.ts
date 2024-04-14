import { Schema } from 'mongoose';

export interface IComment {
  postId: string;
  author: string;
  comment: string;
  replies: string[];
}

export const CommentSchema = new Schema<IComment>({
  postId: { type: String, required: true },
  author: { type: String, required: true },
  comment: { type: String, required: true },
  replies: { type: [String], required: true},
});