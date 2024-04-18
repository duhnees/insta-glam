import express from 'express';
import z from 'zod';
import { createPost } from '../lib/post';
import { Post, User } from '../models';
import { requireAuth } from '../middlewares/require-auth';


const PRouter = express.Router();

const addPSchema = z.object({
  draft: z.boolean(),
  hat: z.number().optional(),
  hair: z.number().optional(),
  face: z.number(),
  top: z.number(),
  pants: z.number(),
  shoes: z.number().optional(),
  accessory1: z.number().optional(),
  accessory2: z.number().optional(),
});

const editPSchema = z.object({
  postId: z.string(),
  draft: z.boolean(),
  hat: z.number().optional(),
  hair: z.number().optional(),
  face: z.number(),
  top: z.number(),
  pants: z.number(),
  shoes: z.number().optional(),
  accessory1: z.number().optional(),
  accessory2: z.number().optional(),
});

const interactPSchema = z.object({
    postId: z.string(),
    liked: z.boolean().optional(),
    commented: z.boolean().optional(),
})

const getPSchema = z.object({
  username: z.string(),
});

PRouter.post('/add', requireAuth, async (req, res, next) => {
    const zodResult = addPSchema.safeParse(req.body);
    if (!zodResult.success) {
      next({ statusCode: 400, message: 'Invalid input!' });
      return;
    }
  
    try {
      const { draft, hat, hair, face, top, pants, shoes, accessory1, accessory2 } = zodResult.data;
      await createPost(req.session!.user, draft, face, top, pants, hat, hair, shoes, accessory1, accessory2);
  
      res.status(200).send('OK!');
    } catch (err) {
      next({ statusCode: 500, message: 'Server error!' });
    }
});

//editing a post when it is in draft mode
PRouter.post('/edit', requireAuth, async (req, res, next) => {
    const zodResult = editPSchema.safeParse(req.body);
    if (!zodResult.success) {
      next({ statusCode: 400, message: 'Invalid input!' });
      return;
    }
  
    try {
      const { postId, draft, hat, hair, face, top, pants, shoes, accessory1, accessory2 } = zodResult.data;
      const post = await Post.findOne({ postId });
      if (post) {
        post.draft = draft;
        post.hat = hat || -1;
        post.hair = hair || -1;
        post.face = face;
        post.top = top;
        post.pants = pants;
        post.shoes = shoes || -1;
        post.accessory1 = accessory1 || -1;
        post.accessory2 = accessory2 || -1;
        await post.save();
      }

      res.status(200).send('OK!');
    } catch (err) {
      next({ statusCode: 500, message: 'Server error!' });
    }
});


//liking or commenting on a post
PRouter.post('/interact', requireAuth, async (req, res, next) => {
    const zodResult = interactPSchema.safeParse(req.body);
    if (!zodResult.success) {
      next({ statusCode: 400, message: 'Invalid input!' });
      return;
    }
  
    try {
      const { postId, liked, commented } = zodResult.data;
      const post = await Post.findOne({ postId });
      if (post) {
        if (liked) post.numLikes++;
        if (commented) post.numComments++;
        await post.save();
      }

      res.status(200).send('OK!');
    } catch (err) {
      next({ statusCode: 500, message: 'Server error!' });
    }
});

//get all posts made by a specific user
PRouter.post('/getPostsByUser', async (req, res, next) => {
  const zodResult = getPSchema.safeParse(req.body);
  if (!zodResult.success) {
    next({ statusCode: 400, message: 'Invalid input!' });
    return;
  }

  try {
    const { username } = zodResult.data;
    const posts = await Post.find({ author: username });
    
    res.status(200).json(posts);
  } catch (err) {
    next({ statusCode: 500, message: 'Server error!' });
  }
});

//get all posts made by a user's following
PRouter.post('/getPostsFromFollowing', async (req, res, next) => {
    const zodResult = getPSchema.safeParse(req.body);
    if (!zodResult.success) {
      next({ statusCode: 400, message: 'Invalid input!' });
      return;
    }
  
    try {
      const { username } = zodResult.data;
      const user = await User.findOne({ username });
      if (user) {
        const posts = await Post.find({ author: { $in: user.following } });
        res.status(200).json(posts);
      } else {
        next({ statusCode: 400, message: 'User does not exist!' });
        return;
      }
    } catch (err) {
      next({ statusCode: 500, message: 'Server error!' });
    }
});

//get all posts globally
PRouter.get('', async (req, res, next) => {
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch (err) {
      next({ statusCode: 500, message: 'Server error!' });
    }
});

export default PRouter;