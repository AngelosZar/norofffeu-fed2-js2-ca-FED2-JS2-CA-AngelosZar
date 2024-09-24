import { API_SOCIAL_POSTS } from '../../api/constants';

export async function updatePost(id, userInput) {
  // export async function updatePost(id, { title, body, tags, media }) {
  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'X-Noroff-API-Key': `${localStorage.getItem('apiKey')}`,
      },
      body: JSON.stringify(userInput),
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(`Update post failed: ${errorMessage.errors[0].message}`);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Update post failed:', error.message);
    throw error; // Optionally rethrow the error for further handling
  }
}
