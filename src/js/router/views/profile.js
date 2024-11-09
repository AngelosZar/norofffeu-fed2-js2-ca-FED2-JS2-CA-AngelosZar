import { authGuard } from '../../utilities/authGuard';
import { readPostsByUser } from '../../api/post/read.js';
import { generateHtml } from '../../router/views/helper.js';
import { followUser } from '../../api/auth/follow.js';
import { unFollowUser } from '../../api/auth/follow.js';
import { readProfile, readProfiles } from '../../api/profile/read.js';
authGuard();

const fetchUserInfo2 = async function () {
  const user = await readProfile('angZar');
  const {
    name: currentUser,
    bio,
    email,
    avatar: { url: avatarImg, alt: avatarAlt },
    banner: { url: bannerImg, alt: bannerAlt },
    _count: { posts: numberOfPosts, followers: numberOfFollowers, following: numberOfFollowing },
  } = user.data;
  return {
    currentUser,
    avatarImg,
    avatarAlt,
    bannerImg,
    bannerAlt,
    bio,
    email,
    numberOfPosts,
    numberOfFollowers,
    numberOfFollowing,
  };
};
fetchUserInfo2();

const eventListeners = async function () {
  followForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const userName = document.querySelector('#followUser').value;
    try {
      await followUser(userName);
    } catch (error) {
      throw error;
    } finally {
      followForm.reset();
    }
  });

  unFollowForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const userName = document.querySelector('#unFollowUser').value;
    try {
      await unFollowUser(userName);
    } catch (error) {
      throw error;
    } finally {
      unFollowForm.reset();
    }
  });
};

//
const renderProfileHero = async function () {
  const {
    currentUser,
    bio,
    avatarImg,
    avatarAlt,
    bannerImg,
    bannerAlt,
    numberOfFollowers,
    numberOfFollowing,
  } = await fetchUserInfo2();

  const domBannerImg = document.querySelector('.banner-img');
  const domAvatarImg = document.querySelector('.avatar-img');
  const userName = document.querySelector('.user-name');
  const userBio = document.querySelector('#user-bio');
  const userFollowers = document.querySelector('#user-followers');
  const userFollowing = document.querySelector('#user-following');

  if (bannerImg) {
    domBannerImg.src = bannerImg;
    domBannerImg.alt = bannerAlt || 'Profile banner';
  }

  if (avatarImg) {
    domAvatarImg.src = avatarImg;
    domAvatarImg.alt = avatarAlt || 'Profile avatar';
  }

  if (bio) {
    userBio.textContent = bio;
  }
  if (numberOfFollowers !== undefined) {
    userFollowers.textContent = `Followers: ${numberOfFollowers}`;
  }

  if (numberOfFollowing !== undefined) {
    userFollowing.textContent = `Following: ${numberOfFollowing}`;
  }
  userName.textContent = currentUser;
};

const profileMain = async function () {
  const username = localStorage.getItem('name');
  const followForm = document.querySelector('#followForm');
  const unFollowForm = document.querySelector('#unFollowForm');
  renderProfileHero();
  try {
    const responseData = await readPostsByUser(username);
    if (responseData && responseData.length > 0) {
      //
      await generateHtml('profile-post-feed', responseData);
      await eventListeners();
    } else {
      console.error('No posts found');
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

document.addEventListener('DOMContentLoaded', profileMain());
