import { Post } from '../models';

export async function createPost(author: string, draft: boolean, face: number, top: number, pants: number, 
    hat?: number | null, hair?: number | null, shoes?: number | null, accessory1?: number | null, accessory2?: number | null, caption?: string) {

    const numLikes = 0;
    const numComments = 0;

    const newPost = new Post({
      author,
      caption: caption || '',
      draft,
      numLikes,
      numComments,
      hat: hat !== undefined && hat !== null ? hat : -1,
      hair: hair !== undefined && hair !== null ? hair : -1,
      face,
      top,
      pants,
      shoes: shoes !== undefined && shoes !== null ? shoes : -1,
      accessory1: accessory1 !== undefined && accessory1 !== null ? accessory1 : -1,
      accessory2: accessory2 !== undefined && accessory2 !== null ? accessory2 : -1,
    });

    await newPost.save();
}
