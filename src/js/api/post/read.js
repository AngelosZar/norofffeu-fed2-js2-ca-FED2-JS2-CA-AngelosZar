import { API_SOCIAL_POSTS } from '../../api/constants';
import { API_SOCIAL_PROFILES } from '../../api/constants';

const apiGetRequest = async function (url, method = 'GET') {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'X-Noroff-API-Key': `${localStorage.getItem('apiKey')}`,
      },
    });
    console.log('Raw Response:', response.body);
    console.log('Response Status:', response.status);
    const responseData = await response.json();
    console.log('Response Data:', responseData);

    if (!response.ok) {
      alert(responseData.errors[0].message);
      throw new Error(responseData.message);
    }

    return responseData.data;
  } catch (error) {
    console.error('Error:', responseData.errors[0].message);
  }
};

export async function readPost(id, author = '?_author=true') {
  // const authorQuery = author ? '?_author=true' : '';
  return await apiGetRequest(`${API_SOCIAL_POSTS}/${id}${author}`);
}

export async function readPosts(limit = 12, page = 1, tag, author = '?_author=true') {
  const url = `${API_SOCIAL_POSTS}?limit=${limit}&page=${page}${tag ? `&tag=${tag}` : ''}${author ? `&${author}` : ''}`;
  return await apiGetRequest(url);
}

export async function readPostsByUser(
  username,
  limit = 12,
  page = 1,
  tag,
  author = '?_author=true'
) {
  const url = `${API_SOCIAL_PROFILES}/${username}/posts?limit=${limit}&page=${page}${tag ? `&tag=${tag}` : ''}${author}`;
  return await apiGetRequest(url);
}
