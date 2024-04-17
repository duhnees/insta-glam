
import express from 'express';
import z from 'zod';
import { Notification } from '../models';
import { createNotif } from '../lib/notification';
import { requireAuth } from '../middlewares/require-auth';


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
      res.status(400).send('Invalid input!');
      return;
    }
  
    try {
      const { receiver, postId, commentId, type } = zodResult.data;
      await createNotif(receiver, req.session!.user, type, postId, commentId);
  
      res.status(200).send('OK!');
    } catch (err) {
        res.status(500).send('Server error!');
    }
});

//get all notifications of a specific user
NRouter.post('/getNotifs', async (req, res, next) => {
  const zodResult = getNSchema.safeParse(req.body);
  if (!zodResult.success) {
    res.status(400).send('Invalid input!');
    return;
  }

  try {
    const { username } = zodResult.data;
    const notifs = await Notification.find({ receiver: username });
    
    res.status(200).json(notifs);
  } catch (err) {
      res.status(500).send('Server error!');
  }
});

export default NRouter;