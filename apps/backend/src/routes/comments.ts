import express from 'express';
import z from 'zod';
import { createComment } from '../lib/comment';
import { Comment } from '../models';
import { requireAuth } from '../middlewares/require-auth';


const CRouter = express.Router();

const addCSchema = z.object({
  postId: z.string(),
  comment: z.string(),
  parent: z.string().optional()
});

// const replyCSchema = z.object({
//   _id: z.string(),
//   comment: z.string(),
// });

const getCSchema = z.object({
  postId: z.string()
})

const getRSchema = z.object({
  _id: z.string()
})

CRouter.post('/add', requireAuth, async (req, res, next) => {
    const zodResult = addCSchema.safeParse(req.body);
    if (!zodResult.success) {
      next({ statusCode: 400, message: 'Invalid input!' });
      return;
    }
  
    try {
      const { postId, comment, parent } = zodResult.data;
      await createComment(postId, req.session!.user, comment, parent);
  
      res.status(200).send('OK!');
    } catch (err) {
      next({ statusCode: 500, message: 'Server error!' });
    }
});

// CRouter.post('/reply', requireAuth, async (req, res, next) => {
//     const zodResult = replyCSchema.safeParse(req.body);
//     if (!zodResult.success) {
//       next({ statusCode: 400, message: 'Invalid input!' });
//       return;
//     }
  
//     try {
//       const { _id, comment } = zodResult.data;
//       const topComment = await Comment.findOne({ _id });
//       if (topComment) {
//         const postId = topComment.postId;
//         await createComment(postId, req.session!.user, comment, _id);

//         // const reply = await createComment(postId, req.session!.user, comment, _id);
//         //topComment.replies = [...topComment.replies, reply._id.toString()];
//         //await topComment.save();
//       }

  
//       res.status(200).send('OK!');
//     } catch (err) {
//       next({ statusCode: 500, message: 'Server error!' });
//     }
// });

//get all comments on a specific post based on its PostId
CRouter.post('/getComments', async (req, res, next) => {
  const zodResult = getCSchema.safeParse(req.body);
  if (!zodResult.success) {
    next({ statusCode: 400, message: 'Invalid input!' });
    return;
  }

  try {
    const { postId } = zodResult.data;
    const comments = await Comment.find({ postId: postId, parent: { $in: [undefined, null, ""] } });
    
    res.status(200).json(comments);
  } catch (err) {
    next({ statusCode: 500, message: 'Server error!' });
  }
});

//get all replies to a single comment
CRouter.post('/getReplies', async (req, res, next) => {
  const zodResult = getRSchema.safeParse(req.body);
  if (!zodResult.success) {
    next({ statusCode: 400, message: 'Invalid input!' });
    return;
  }

  try {
    const { _id } = zodResult.data;
    const comments = await Comment.find({ parent: _id });
    
    res.status(200).json(comments);
  } catch (err) {
    next({ statusCode: 500, message: 'Server error!' });
  }
});

export default CRouter;