import { authGuard } from '../../utilities/authGuard';
import { readPostsByUser } from '../../api/post/read.js';
import { renderMultiplePosts } from '../../router/views/post.js';
import { generateHtml } from '../../router/views/helper.js';

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
const renderProfileHero = function () {
  const { name, bio, avatarImg, avatarAlt, bannerImg, bannerAlt } =
    fetchUserInfo();
  // const profileContainer = document.querySelector('.profile-container');
  // const profileBanner = document.querySelector('.profile-banner');
  const domBannerImg = document.querySelector('.banner-img');
  // const profileInfo = document.querySelector('.profile-info');
  const domAvatarImg = document.querySelector('.avatar-img');
  const userName = document.querySelector('.user-name');
  // const userDetails = document.querySelector('.user-details');

  if (bannerImg) {
    domBannerImg.src = bannerImg;
    domBannerImg.alt = bannerAlt || 'Profile banner';
  }
  if (avatarImg) {
    domAvatarImg.src = avatarImg;
    domAvatarImg.alt = avatarAlt || 'Profile avatar';
  }
  userName.textContent = name;
};

const profileMain = async function () {
  const username = localStorage.getItem('name');
  renderProfileHero();
  try {
    const responseData = await readPostsByUser(username);
    if (responseData && responseData.length > 0) {
      await generateHtml('profile-post-feed', responseData);
    } else {
      console.log('No posts found');
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

document.addEventListener('DOMContentLoaded', profileMain());
