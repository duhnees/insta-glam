import mongoose from 'mongoose';
import { IUser, UserSchema } from './user';
import { IPost, PostSchema } from './post';
import { CommentSchema, IComment } from './comment';
import { INotif, NotifSchema } from './notification';

export const User = mongoose.model<IUser>('User', UserSchema);
export const Post = mongoose.model<IPost>('Post', PostSchema);
export const Comment = mongoose.model<IComment>('Comment', CommentSchema);
export const Notification = mongoose.model<INotif>('Notification', NotifSchema);