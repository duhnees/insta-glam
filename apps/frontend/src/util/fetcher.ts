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

export async function fetchNotifs(url: string, receiver: string) {
  try {
    const response = await axios.post(url, {
        username: receiver,
    });
    return response.data;
} catch (error) {
    // eslint-disable-next-line no-alert
    alert(error.response.data.message);
    return 500;
}
}
export async function fetchDrafts(url, username) {
    try {
        const response = await axios.post(url, {
            username: username,
            draft: true
        });
        return response.data;
    } catch (error) {
        // eslint-disable-next-line no-alert
        alert(error.response.data.message);
        return 500;
    }
}
