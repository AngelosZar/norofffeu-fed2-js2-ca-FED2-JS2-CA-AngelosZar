import { createPost } from '../../api/post/create';

export async function onCreatePost(event) {
  event.preventDefault();
  const userInput = {
    title: '11 random title for test',
    body: 'also something very random like bhsdfgbdskfbgkdsh',
    tags: ['random,veryRandom'],
    media: {
      url: 'https://url.com/image.jpg',
      alt: 'string',
    },
  };
  try {
    const createdPost = await createPost({ userInput });
    confirm('Post created successfully');
    // return responseData;
  } catch (error) {
    console.error(error.message);
    alert(`An error occurred: ${error.message}`);
    throw error;
  }
}
