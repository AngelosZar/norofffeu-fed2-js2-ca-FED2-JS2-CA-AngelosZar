import { authGuard } from '../../utilities/authGuard';
import { readPostsByUser } from '../../api/post/read.js';
import { renderMultiplePosts } from '../../router/views/post.js';
import { generateHtml } from '../../router/views/post.js';

authGuard();

const fetchUserInfo = function () {
  const user = localStorage.getItem('userData');
  const userData = JSON.parse(user);
  console.log(userData);
  const name = userData.name;
  const bio = userData?.bio;
  const avatarImg = userData?.avatarImg;
  const avatarAlt = userData?.avatarAlt;
  const bannerImg = userData?.bannerImg;
  const bannerAlt = userData?.bannerAlt;
  // return userData;
  return { name, bio, avatarImg, avatarAlt, bannerImg, bannerAlt };
};
//
const profileMain = async function () {
  const username = localStorage.getItem('name');
  fetchUserInfo();
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
