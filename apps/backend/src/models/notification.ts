import { Schema } from 'mongoose';

enum NotificationType {
    Like = 'like',
    Follow = 'follow',
    Comment = 'comment',
    Mention = 'mention'
  }

export interface INotif {
  receiver: string;
  sender: string;
  postId: string;
  commentId: string;
  type: NotificationType;
}

export const NotifSchema = new Schema<INotif>({
  receiver: { type: String, required: true },
  sender: { type: String, required: true },
  postId: { type: String, required: false },
  commentId: { type: String, required: false},
  type: { type: String, enum: Object.values(NotificationType), required: true }
});