import { Schema } from 'mongoose';

export interface IPost {
  author: string;
  caption: string;
  draft: boolean;
  numLikes: number;
  numComments: number;
  hat: number;
  hair: number;
  face: number;
  top: number;
  pants:  number;
  shoes: number;
  accessory1: number;
  accessory2: number;
}

export const PostSchema = new Schema<IPost>({
  author: { type: String, required: true },
  caption: { type: String, required: false},
  draft: { type: Boolean, required: true },
  numLikes: { type: Number, required: true },
  numComments: { type: Number, required: true },
  hat: { type: Number, required: false },
  hair: { type: Number, required: false },
  face: { type: Number, required: true },
  top: { type: Number, required: true },
  pants: { type: Number, required: true },
  shoes: { type: Number, required: false },
  accessory1: { type: Number, required: false },
  accessory2: { type: Number, required: false },
});