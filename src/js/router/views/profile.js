import { authGuard } from '../../utilities/authGuard';
import { readPostsByUser } from '../../api/post/read.js';
import { generateHtml } from '../../router/views/helper.js';
import { followUser } from '../../api/auth/follow.js';
import { unFollowUser } from '../../api/auth/follow.js';

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
const followForm = document.querySelector('#followForm');
const grabUserInput = function (event) {
  // const qqq = event.target.value;
  // console.log(qq);
  // console.log(followForm);
  const userName = document.querySelector('#followUser').value;
  console.log(userName);
};

followForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  const userName = document.querySelector('#followUser').value;
  console.log(userName);
  try {
    await followUser(userName);
    const res = await readPostsByUser(userName);
    console.log(res);
    if (!res.ok) {
      const errorRes = await res.json();
      console.log('Error following user:', errorRes);
    }
    followForm.reset();
    return res;
  } catch (error) {
    console.error('Error following user:', error);
  }
});

const unFollowForm = document.querySelector('#unFollowForm');
unFollowForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  const userName = document.querySelector('#unFollowUser').value;
  console.log(userName);
  try {
    await unFollowUser(userName);
    const res = await readPostsByUser(userName);
    console.log(res);
    if (!res.code === 404) {
      const errorRes = await res.json();
      console.log('Error unfollowing user:', errorRes);
      followForm.reset();
    }
  } catch (error) {
    console.error('Error unfollowing user:', error);
  }
});

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
      // await followUserEvent(username);
      // await unFollowUserEvent(username);
    } else {
      console.log('No posts found');
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

document.addEventListener('DOMContentLoaded', profileMain());
