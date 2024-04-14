import { Post } from '../models';

export async function createPost(author: string, draft: boolean, face: number, top: number, pants:  number, 
    hat?: number, hair?: number, shoes?: number, accessory1?: number, accessory2?: number) {

  const numLikes = 0;
  const numComments = 0;

  const newPost = new Post({
    author,
    draft,
    numLikes,
    numComments,
    hat: hat || 0,
    hair: hair || 0,
    face,
    top,
    pants,
    shoes: shoes || 0,
    accessory1: accessory1 || 0,
    accessory2: accessory2 || 0,
  });

  await newPost.save();
}