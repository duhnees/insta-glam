import bcrypt from 'bcrypt';
import express from 'express';
import z from 'zod';
import { createUser } from '../lib/account';
import { User } from '../models';
import { requireAuth } from '../middlewares/require-auth';

const AuthRouter = express.Router();

const signupSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const followSchema = z.object({
  follower: z.string(),
  following: z.string(),
});

const getUSchema = z.object({
  username: z.string(),
});

const editSchema = z.object({
  bio: z.string()
})

AuthRouter.post('/signup', async (req, res, next) => {
  const zodResult = signupSchema.safeParse(req.body);
  if (!zodResult.success) {
    next({ statusCode: 400, message: 'Invalid input!' });
    return;
  }

  try {
    const { username, password } = zodResult.data;
    const user = await User.findOne({ username });
    if (user) {
      next({ statusCode: 400, message: 'User already exists!' });
      return;
    }
    await createUser(username, password);

    req.session!.user = username;
    res.status(200).send('OK!');
  } catch(err) {
    next({ statusCode: 500, message: 'Server error!' });
  }
});

AuthRouter.post('/login', async (req, res, next) => {
    const zodResult = signupSchema.safeParse(req.body);
    if (!zodResult.success) {
      next({ statusCode: 400, message: 'Invalid input!' });
      return;
    }

    try {
      const { username, password } = zodResult.data;
      const user = await User.findOne({ username });
      if (user) {
          const passwordCheck = await bcrypt.compare(password, user.password);
          if (passwordCheck) {
              req.session!.user = username;
              res.status(200).send('Login successful!');
          } else {
              next({ statusCode: 400, message: 'Wrong username/password!' });
          }
      } else {
          next({ statusCode: 400, message: 'Wrong username/password!' });
      }
    } catch(err) {
      next({ statusCode: 500, message: 'Server error!' });
    }
  });

AuthRouter.post('/logout', requireAuth, async (req, res, next) => {
  try {
    req.session = null;
    res.status(200).send('Logout successful!');
  } catch (err) {
    next({ statusCode: 500, message: 'Server error!' });
  }
});

//returns current user logged in
AuthRouter.get('', async (req, res, next) => {
  if (req.session && req.session.user && req.session.user.trim() !== '') {
    res.status(200).send(req.session.user);
} else {
    res.status(200).send('');
}
});

AuthRouter.post('/follow', async (req, res, next) => {
    const zodResult = followSchema.safeParse(req.body);
    if (!zodResult.success) {
      next({ statusCode: 400, message: 'Invalid input!' });
      return;
    }
  
    try {
      const { follower, following } = zodResult.data;
      const currUser = await User.findOne({ username: follower });
      const userToFollow = await User.findOne({ username: following });
      if (currUser) {
        if (userToFollow) {
          currUser.following = [...currUser.following, userToFollow.username];
          userToFollow.numFollowers++;
          await currUser.save();
          await userToFollow.save();
        } else {
          next({ statusCode: 400, message: 'User to follow does not exist!' });
          return;
        }
      } else {
        next({ statusCode: 400, message: 'Current user does not exist!' });
        return;
      }
      res.status(200).send('OK!');
    } catch(err) {
      next({ statusCode: 500, message: 'Server error!' });
    }
});

AuthRouter.post('/unfollow', async (req, res, next) => {
    const zodResult = followSchema.safeParse(req.body);
    if (!zodResult.success) {
      next({ statusCode: 400, message: 'Invalid input!' });
      return;
    }
  
    try {
      const { follower, following } = zodResult.data;
      const currUser = await User.findOne({ username: follower });
      const userToUnfollow = await User.findOne({ username: following });
      if (currUser) {
        if (userToUnfollow) {
          currUser.following = currUser.following.filter(username => username !== following);
          userToUnfollow.numFollowers--;
          await currUser.save();
          await userToUnfollow.save();
        } else {
          next({ statusCode: 400, message: 'User to follow does not exist!' });
          return;
        }
      } else {
        next({ statusCode: 400, message: 'Current user does not exist!' });
        return;
      }
      res.status(200).send('OK!');
    } catch(err) {
      next({ statusCode: 500, message: 'Server error!' });
    }
});

//get profile information based on username
AuthRouter.post('/getUser', async (req, res, next) => {
  const zodResult = getUSchema.safeParse(req.body);
  if (!zodResult.success) {
    next({ statusCode: 400, message: 'Invalid input!' });
    return;
  }

  try {
    const { username } = zodResult.data;
    const user = await User.findOne({ username });
    if (user) {
      res.status(200).json(user);
    } else {
      next({ statusCode: 400, message: 'Current user does not exist!' });
      return;
    }
    res.status(200).send('OK!');
  } catch(err) {
    next({ statusCode: 500, message: 'Server error!' });
  }
});

AuthRouter.post('/edit', async (req, res, next) => {
  const zodResult = editSchema.safeParse(req.body);
  if (!zodResult.success) {
    next({ statusCode: 400, message: 'Invalid input!' });
    return;
  }

  try {
    const { bio } = zodResult.data;
    const user = await User.findOne({ username: req.session!.user });
    if (user) {
      user.bio = bio;
      await user.save();
    } else {
      next({ statusCode: 400, message: 'Current user does not exist!' });
      return;
    }
    res.status(200).send('OK!');
  } catch(err) {
    next({ statusCode: 500, message: 'Server error!' });
  }
});

export default AuthRouter;