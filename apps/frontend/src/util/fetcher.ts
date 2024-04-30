import axios from 'axios';

export async function fetcher(url: string) {
  const response = (await axios.get(url)).data;
  return response;
}

//TODO: these two do the exact same thing. need to combine them
export async function fetchSinglePost(url: string, postId: string) {
  try {
      const response = await axios.post(url, {
          postId: postId,
      });
      return response.data;
  } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error.response.data.message);
      return 500;
  }
}

export async function fetchComments(url: string, postId: string) {
  try {
    const response = await axios.post(url, {
        postId: postId,
    });
    return response.data;
} catch (error) {
    // eslint-disable-next-line no-alert
    alert(error.response.data.message);
    return 500;
}
}

export async function fetchReplies(url: string, commentId: string) {
  try {
    const response = await axios.post(url, {
        _id: commentId,
    });
    return response.data;
} catch (error) {
    // eslint-disable-next-line no-alert
    alert(error.response.data.message);
    return 500;
}
}