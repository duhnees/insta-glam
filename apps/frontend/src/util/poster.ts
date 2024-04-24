import axios from 'axios';

export async function poster(url: string, data: unknown) {
  const response = (await axios.post(url, data)).data;
  return response;
}