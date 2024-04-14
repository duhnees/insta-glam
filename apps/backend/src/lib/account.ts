import bcrypt from 'bcrypt';
import { User } from '../models';

export async function createUser(username: string, password: string) {
  const userExists = await User.exists({ username });
  if (userExists) {
    throw new Error('User already exists!');
  }

  const salt = await bcrypt.genSalt();
  const numFollowers = 0;
  const following = [];
  
  const newUser = new User({
    username,
    password: await bcrypt.hash(password, salt),
    salt,
    numFollowers,
    following
  });

  await newUser.save();
}