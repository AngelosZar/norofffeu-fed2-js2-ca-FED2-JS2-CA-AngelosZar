import { createPost } from '../../api/post/create';

//
export async function onCreatePost(event) {
  event.preventDefault();
  const userInput = {
    title: 'A tenth random title for test',
    body: 'also something very random like bhsdfgbdskfbgkdsh',
    tags: ['random,veryRandom'],
    media: {
      url: 'https://url.com/image.jpg',
      alt: 'string',
    },
  };
  try {
    const response = await createPost({ userInput });

    if (!response.ok) {
      const errorMessage = await response.json();
      console.log(errorMessage);
      throw new Error(`Create post failed: ${errorData.message}`);
    }

    const responseData = await response.json();
    console.log(data);
    confirm('Post created successfully');
    return responseData;
  } catch (error) {
    console.error(error.message);
    alert(`An error occurred: ${error.message}`);
    throw error;
  }
}
