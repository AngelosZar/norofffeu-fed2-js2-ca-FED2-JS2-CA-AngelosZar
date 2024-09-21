import { API_BASE, API_KEY } from '../constants';

export async function deletePost(id) {
  try {
    // const apiKey = localStorage.getItem('apiKey');
    // const accessToken = localStorage.getItem('accessToken');

    const response = await fetch(`${API_BASE}/social/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'X-Noroff-API-Key': `${localStorage.getItem('apiKey')}`,
      },
      //   authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    });
    if (!response.ok) {
      const data = await response.json();
      console.log(API_KEY);
      console.log(data);
      console.log(accessToken);
      throw new Error('Failed to delete post');
    }
  } catch (error) {
    throw error;
  }
}

// deletePost(712);
