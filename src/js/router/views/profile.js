import { authGuard } from '../../utilities/authGuard';
import { readPostsByUser } from '../../api/post/read.js';
import { renderMultiplePosts } from '../../router/views/post.js';
import { generateHtml } from '../../router/views/post.js';

authGuard();
console.log('connected profile script');
console.log('These are my posts');

const profileMain = async function () {
  try {
    const responseData = await readPostsByUser('angZar');
    console.log(responseData);
    if (responseData && responseData.length > 0) {
      // Assuming you have a function like 'generateHtml' to render the posts
      await generateHtml('profile-post-feed', responseData);
    } else {
      console.log('No posts found');
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

document.addEventListener('DOMContentLoaded', profileMain());
