import { API_BASE } from '../constants';
console.log(API_BASE);
export async function deletePost(id) {
  try {
    const response = await fetch(`API_BASE/social/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Noroff-API-Key': localStorage.getItem('API_KEY'),
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete post');
    }
    confirm('Post deleted successfully');
  } catch (error) {
    throw error;
  }
}

// deletePost(6);
