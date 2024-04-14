import { Notification } from '../models';

export async function createNotif(receiver: string, sender: string, type: string, postId?: string, commentId?: string) {
  
  const newNotif = new Notification({
    receiver,
    sender,
    postId: postId || '',
    commentId: commentId || '',
    type
  });

  await newNotif.save();
}