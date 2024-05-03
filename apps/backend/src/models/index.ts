import mongoose from 'mongoose';
import { CommentSchema, IComment } from './comment';
import { INotif, NotifSchema } from './notification';
import { IPost, PostSchema } from './post';
import { IUser, UserSchema } from './user';

export const User = mongoose.model<IUser>('User', UserSchema);
export const Post = mongoose.model<IPost>('Post', PostSchema);
export const Comment = mongoose.model<IComment>('Comment', CommentSchema);
export const Notification = mongoose.model<INotif>('Notification', NotifSchema);