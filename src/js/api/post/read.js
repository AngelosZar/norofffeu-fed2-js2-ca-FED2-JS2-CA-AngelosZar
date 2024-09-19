import { API_SOCIAL } from '../../api/constants';
import { API_SOCIAL_POSTS } from '../../api/constants';
import { API_SOCIAL_PROFILES } from '../../api/constants';

export async function readPost(id) {
  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'X-Noroff-API-Key': `${localStorage.getItem('apiKey')}`,
      },
    });
    if (!response.ok) {
      console.log(responseData.errors[0].message);
      alert(responseData.errors[0].message);
      throw new Error(responseData.message);
    }
    const responseData = await response.json();
    console.log(responseData.data);
    return responseData;
  } catch (error) {
    throw error;
  }
}

export async function readPosts(limit = 12, page = 1, tag) {}

export async function readPostsByUser(username, limit = 12, page = 1, tag) {}
