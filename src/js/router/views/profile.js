import { authGuard } from '../../utilities/authGuard';
import { readPostsByUser } from '../../api/post/read.js';
import { renderMultiplePosts } from '../../router/views/post.js';
import { generateHtml } from '../../router/views/post.js';

authGuard();

const profileMain = async function () {
  const username = localStorage.getItem('name');
  try {
    const responseData = await readPostsByUser(username);
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
