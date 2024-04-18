import express from 'express';
import z from 'zod';
import { createComment } from '../lib/comment';
import { Comment } from '../models';
import { requireAuth } from '../middlewares/require-auth';


const CRouter = express.Router();

const addCSchema = z.object({
  postId: z.string(),
  comment: z.string(),
});

const replyCSchema = z.object({
  _id: z.string(),
  comment: z.string(),
});

const getCSchema = z.object({
  postId: z.string()
})

CRouter.post('/add', requireAuth, async (req, res, next) => {
    const zodResult = addCSchema.safeParse(req.body);
    if (!zodResult.success) {
      next({ statusCode: 400, message: 'Invalid input!' });
      return;
    }
  
    try {
      const { postId, comment } = zodResult.data;
      await createComment(postId, req.session!.user, comment);
  
      res.status(200).send('OK!');
    } catch (err) {
      next({ statusCode: 500, message: 'Server error!' });
    }
});

CRouter.post('/reply', requireAuth, async (req, res, next) => {
    const zodResult = replyCSchema.safeParse(req.body);
    if (!zodResult.success) {
      next({ statusCode: 400, message: 'Invalid input!' });
      return;
    }
  
    try {
      const { _id, comment } = zodResult.data;
      const topComment = await Comment.findOne({ _id });
      if (topComment) {
        const postId = topComment.postId;
        const reply = await createComment(postId, req.session!.user, comment);
        topComment.replies = [...topComment.replies, reply._id.toString()];
        await topComment.save();
      }

  
      res.status(200).send('OK!');
    } catch (err) {
      next({ statusCode: 500, message: 'Server error!' });
    }
});

//get all comments on a specific post based on its PostId
CRouter.post('/getComments', async (req, res, next) => {
  const zodResult = getCSchema.safeParse(req.body);
  if (!zodResult.success) {
    next({ statusCode: 400, message: 'Invalid input!' });
    return;
  }

  try {
    const { postId } = zodResult.data;
    const comments = await Comment.find({ postId });
    
    res.status(200).json(comments);
  } catch (err) {
    next({ statusCode: 500, message: 'Server error!' });
  }
});

export default CRouter;