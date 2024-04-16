//reply to comment
//get all comments on a post
//overarching route will be /comment
import express from 'express';
import z from 'zod';
import { createComment } from '../lib/comment';
import { Comment } from '../models';


const CRouter = express.Router();

const addCSchema = z.object({
    postId: z.string(),
    comment: z.string(),
});

const replyCSchema = z.object({
    _id: z.string(),
    author: z.string(),
    comment: z.string(),
});

CRouter.post('/add', async (req, res, next) => {
    const zodResult = addCSchema.safeParse(req.body);
    if (!zodResult.success) {
      res.status(400).send('Invalid input!');
      return;
    }
  
    try {
      const { postId, comment } = zodResult.data;
      await createComment(postId, req.session!.user, comment);
  
      res.status(200).send('OK!');
    } catch (err) {
        res.status(500).send('Server error!');
    }
});

CRouter.post('/reply', async (req, res, next) => {
    const zodResult = replyCSchema.safeParse(req.body);
    if (!zodResult.success) {
      res.status(400).send('Invalid input!');
      return;
    }
  
    try {
      const { _id, author, comment } = zodResult.data;
      const topComment = await Comment.findOne({ _id });
      if (topComment) {
        const postId = topComment.postId;
        await createComment(postId, req.session!.user, comment);
        //bro how do i get the _id of the comment that was just made

      }

  
      res.status(200).send('OK!');
    } catch (err) {
        res.status(500).send('Server error!');
    }
});