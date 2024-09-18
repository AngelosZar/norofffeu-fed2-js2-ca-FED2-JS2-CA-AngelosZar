import { API_SOCIAL_POSTS } from '../constants';
console.log(API_SOCIAL_POSTS);
//
// const userInput = { title, body, tags, media };
export async function createPost({ userInput }) {
  const token = localStorage.getItem('accessToken');
  const apiKey = localStorage.getItem('apiKey');

  //   const userInput = { userInput };
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
    console.log(response);
    if (!response.ok) {
      const errorData = await response.json();
      //   alert('Something went wrong\nPlease try again');
      throw new Error(errorData.message);
    }
    const responseData = await response.json();
    console.log(responseData);
    return responseData, errorData;
  } catch (error) {
    console.log(`An error occurred while creating a new post\n${error} `);
    alert(`An error occurred while creating a new post\n ${error}`);
  }
}
