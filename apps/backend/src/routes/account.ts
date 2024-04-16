import bcrypt from 'bcrypt';
import express from 'express';
import z from 'zod';
import { createUser } from '../lib/account';
import { User } from '../models';

const AuthRouter = express.Router();

const signupSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const followSchema = z.object({
  follower: z.string(),
  following: z.string(),
})

AuthRouter.post('/signup', async (req, res, next) => {
  const zodResult = signupSchema.safeParse(req.body);
  if (!zodResult.success) {
    res.status(400).send('Invalid input!');
    return;
  }

  try {
    const { username, password } = zodResult.data;
    const user = await User.findOne({ username });
    if (user) {
      res.status(400).send('User already exists!');
      return;
    }
    await createUser(username, password);

    req.session!.user = username;
    res.status(200).send('OK!');
  } catch(err) {
      res.status(500).send('Server error!');
  }
});

AuthRouter.post('/login', async (req, res, next) => {
    const zodResult = signupSchema.safeParse(req.body);
    if (!zodResult.success) {
        res.status(400).send('Invalid input!');
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
              res.status(400).send('Wrong username/password!');
        }
      } else {
          res.status(400).send('Wrong username/password!');
    }
    } catch(err) {
        res.status(500).send('Server error!');
    }
  });

AuthRouter.post('/logout', async (req, res, next) => {
  try {
    req.session = null;
    res.status(200).send('Logout successful!');
  } catch (err) {
      res.status(500).send('Server error!');
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
      res.status(400).send('Invalid input!');
      return;
    }
  
    try {
      const { follower, following } = zodResult.data;
      const currUser = await User.findOne({ follower });
      const userToFollow = await User.findOne({ following });
      if (currUser) {
        if (userToFollow) {
          currUser.following = [...currUser.following, userToFollow.username];
          userToFollow.numFollowers++;
          await currUser.save();
          await userToFollow.save();
        } else {
          res.status(400).send('User to follow does not exist!');
          return;
        }
      } else {
          res.status(400).send('Current user does not exist!');
          return;
      }
      res.status(200).send('OK!');
    } catch(err) {
        res.status(500).send('Server error!');
    }
});

AuthRouter.post('/unfollow', async (req, res, next) => {
    const zodResult = followSchema.safeParse(req.body);
    if (!zodResult.success) {
      res.status(400).send('Invalid input!');
      return;
    }
  
    try {
      const { follower, following } = zodResult.data;
      const currUser = await User.findOne({ follower });
      const userToUnfollow = await User.findOne({ following });
      if (currUser) {
        if (userToUnfollow) {
          currUser.following = currUser.following.filter(username => username !== following);
          userToUnfollow.numFollowers--;
          await currUser.save();
          await userToUnfollow.save();
        } else {
          res.status(400).send('User to follow does not exist!');
          return;
        }
      } else {
          res.status(400).send('Current user does not exist!');
          return;
      }
      res.status(200).send('OK!');
    } catch(err) {
        res.status(500).send('Server error!');
    }
});

export default AuthRouter;