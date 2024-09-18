import { API_SOCIAL_POSTS } from '../constants';
console.log(API_SOCIAL_POSTS);
//

export async function createPost({ userInput }) {
  const token = localStorage.getItem('accessToken');
  const apiKey = localStorage.getItem('apiKey');
  try {
    const response = await fetch(API_SOCIAL_POSTS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Noroff-API-Key': `${apiKey}`,
      },
      body: JSON.stringify(userInput),
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      console.log(errorMessage);
      throw new Error(`Create post failed: ${errorData.message}`);
    }

    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.log(`An error occurred while creating a new post\n${error} `);
    alert(`An error occurred while creating a new post\n ${error}`);
  }
}
