import { API_BASE, API_KEY } from '../constants';

export async function deletePost(id) {
  try {
    const response = await fetch(`${API_BASE}/social/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'X-Noroff-API-Key': `${localStorage.getItem('apiKey')}`,
      },
    });
    if (!response.ok) {
      const data = await response.json();
      alert(`Failed to delete post \n${data.errors[0].message}`);
      throw new Error('Failed to delete post');
    }
  } catch (error) {
    throw error;
  }
}

// deletePost(712);
