import { Schema } from 'mongoose';

export interface IUser {
  username: string;
  password: string;
  salt: string;
  numFollowers: number;
  following: string[];
}

export const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  numFollowers: { type: Number, required: true },
  following: { type: [String], required: true }
});