
import express from 'express';
import z from 'zod';
import { createNotif } from '../lib/notification';
import { requireAuth } from '../middlewares/require-auth';
import { Notification } from '../models';


const NRouter = express.Router();

const addNSchema = z.object({
  receiver: z.string(),
  postId: z.string().optional(),
  commentId: z.string().optional(),
  type: z.enum(['like', 'follow', 'comment', 'mention'])
});


const getNSchema = z.object({
  username: z.string()
})

NRouter.post('/add', requireAuth, async (req, res, next) => {
    const zodResult = addNSchema.safeParse(req.body);
    if (!zodResult.success) {
      next({ statusCode: 400, message: 'Invalid input!' });
      return;
    }
  
    try {
      const { receiver, postId, commentId, type } = zodResult.data;
      await createNotif(receiver, req.session!.user, type, postId, commentId);
  
      res.status(200).send('OK!');
    } catch (err) {
      next({ statusCode: 500, message: 'Server error!' });
    }
});

//Get all notifications of a specific user
NRouter.post('/getNotifs', async (req, res, next) => {
  const zodResult = getNSchema.safeParse(req.body);
  if (!zodResult.success) {
    next({ statusCode: 400, message: 'Invalid input!' });
    return;
  }

  try {
    const { username } = zodResult.data;
    const notifs = await Notification.find({ receiver: username });
    
    res.status(200).json(notifs);
  } catch (err) {
    next({ statusCode: 500, message: 'Server error!' });
  }
});

export default NRouter;