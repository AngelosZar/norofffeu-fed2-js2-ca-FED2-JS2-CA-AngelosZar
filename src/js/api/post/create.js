import { API_SOCIAL_POSTS } from '../constants';
console.log(API_SOCIAL_POSTS);
//
// const userInput = { title, body, tags, media };
export async function createPost({ title, body, tags, media }) {
  const token = localStorage.getItem('accessToken');
  console.log(token);
  //   const userInput = { title, body, tags, media };
  try {
    const response = fetch(API_SOCIAL_POSTS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      //   body: JSON.stringify(userInput),
      body: JSON.stringify({ title, body, tags, media }),
    });
    if (response.ok) {
      const newPost = (await response).json();
      console.log('Post created successfully');
      confirm('Post created successfully');
    } else {
      const error = (await response).json();
      console.log(error);
      console.log(
        `An error occurred while creating a new post\nPlease try again `
      );
      alert(`An error occurred while creating a new post\nPlease try again `);
    }
  } catch (error) {
    console.log(`An error occurred while creating a new post\n${error} `);
    alert(`An error occurred while creating a new post\n ${error}`);
  }
}

// Create post
// POST
// /social/posts
// Create a new post. Only the title property is required, but we recommend at least including the body and media properties as well.

// Please note that the media.url property must be a fully formed URL that links to a live and publicly accessible image. The API will check the provided URL and if it cannot be accessed publicly you will receive a 400 Bad Request error response.
// {
//     "title": "string", // Required
//     "body": "string", // Optional
//     "tags": ["string"], // Optional
//     "media": {
//       "url": "https://url.com/image.jpg",
//       "alt": "string"
//     } // Optional
//   }
console.log('create js is connected');
