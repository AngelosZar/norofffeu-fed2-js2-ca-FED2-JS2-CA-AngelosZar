import { API_SOCIAL } from '../../api/constants';
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

    const responseData = await response.json();
    console.log(responseData);

    if (!response.ok) {
      alert(responseData.errors[0].message);
      throw new Error(responseData.message);
    }

    return responseData.data;
  } catch (error) {
    console.error('Error:', responseData.errors[0].message);
  }
};

export async function readPost(id) {
  return await apiGetRequest(`${API_SOCIAL_POSTS}/${id}`);
}

export async function readPosts(limit = 12, page = 1, tag) {
  const url = `${API_SOCIAL_POSTS}?limit=${limit}&page=${page}${
    tag ? `&tag=${tag}` : ''
  }`;
  return await apiGetRequest(url);
}

export async function readPostsByUser(username, limit = 12, page = 1, tag) {
  const url = `${API_SOCIAL_PROFILES}/${username}/posts?limit=${limit}&page=${page}${
    tag ? `&tag=${tag}` : ''
  }`;
  return await apiGetRequest(url);
}
