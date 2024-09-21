import { API_SOCIAL_POSTS } from '../constants';

export async function createPost({ userInput }) {
  try {
    const response = await fetch(API_SOCIAL_POSTS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'X-Noroff-API-Key': `${localStorage.getItem('apiKey')}`,
      },
      body: JSON.stringify(userInput),
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(`Create post failed: ${errorMessage.errors[0].message}`);
    } else {
      const responseData = await response.json();
      return responseData;
    }
  } catch (error) {
    alert(`An error occurred while creating a new post\n${error}`);
  }
}
