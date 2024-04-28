import axios from 'axios';

export async function fetcher(url: string) {
  const response = (await axios.get(url)).data;
  return response;
}

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