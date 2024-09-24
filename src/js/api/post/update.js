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
      //   body: JSON.stringify(userInput),  or
      body: JSON.stringify(userInput),
    });
    if (!response.ok) {
      const data = await response.json();
      console.log(`Error:\n${data.errors[0].message}`);
    }
  } catch (error) {
    console.log('');
  }
}
