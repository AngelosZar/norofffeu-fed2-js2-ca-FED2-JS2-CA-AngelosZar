import { authGuard } from '../../utilities/authGuard';
import { readPostsByUser } from '../../api/post/read.js';
import { generateHtml } from '../../router/views/helper.js';
import { followUser } from '../../api/auth/follow.js';
import { unFollowUser } from '../../api/auth/follow.js';
import { readProfile } from '../../api/profile/read.js';
authGuard();
//

// const getUserInfo = async function () {
//   const user = localStorage.getItem('userData');
//   console.log(userdata);
//   const userData = JSON.parse(user);
//   const name = userData.name;
//   const bio = userData?.bio;
//   const avatarImg = userData?.avatarImg;
//   const avatarAlt = userData?.avatarAlt;
//   const bannerImg = userData?.bannerImg;
//   const bannerAlt = userData?.bannerAlt;
//   //
//   const userData2 = await readProfile(name);
//   console.log(userData2);
//   return { name, bio, avatarImg, avatarAlt, bannerImg, bannerAlt };
// };
const getUserInfo = async function () {
  try {
    const user = localStorage.getItem('userData');
    console.log(user);

    if (!user) {
      throw new Error('No user data found in localStorage');
    }

    const userData = JSON.parse(user);
    const name = userData.name;
    const bio = userData?.bio;
    const avatarImg = userData?.avatarImg;
    const avatarAlt = userData?.avatarAlt;
    const bannerImg = userData?.bannerImg;
    const bannerAlt = userData?.bannerAlt;

    const userData2 = await readProfile(name);
    console.log(userData2);

    const posts = userData2?.data?._count?.posts || 0;
    const followers = userData2?.data?._count?.followers || 0;
    const following = userData2?.data?._count?.following || 0;

    return {
      name,
      bio,
      avatarImg,
      avatarAlt,
      bannerImg,
      bannerAlt,
      posts,
      followers,
      following,
    };
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};
//

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
  try {
    const userInfo = await getUserInfo();
    const { name, bio, avatarImg, avatarAlt, bannerImg, bannerAlt, posts, followers, following } =
      userInfo;

    const profileContainer = document.querySelector('.profile-container');
    const profileBanner = document.querySelector('.profile-banner');
    const domBannerImg = document.querySelector('.banner-img');
    const profileInfo = document.querySelector('.profile-info');
    const domAvatarImg = document.querySelector('.avatar-img');
    const userName = document.querySelector('.user-name');
    const userDetails = document.querySelector('.user-details');

    if (bannerImg) {
      domBannerImg.src = bannerImg;
      domBannerImg.alt = bannerAlt || 'Profile banner';
    }

    if (avatarImg) {
      domAvatarImg.src = avatarImg;
      domAvatarImg.alt = avatarAlt || 'Profile avatar';
    }

    userName.textContent = name;

    userDetails.innerHTML = `
      <p>${posts} Posts</p>
      <p>${followers} Followers</p>
      <p>${following} Following</p>
    `;

    if (bio) {
      userDetails.innerHTML += `<p class="bio">${bio}</p>`;
    }
  } catch (error) {
    console.error('Error rendering profile:', error);
  }
};

const profileMain = async function () {
  try {
    const username = localStorage.getItem('name');
    // const responseData = await readPostsByUser(username);
    if (!username) {
      throw new Error('No username found in localStorage');
      // maybe promt to log in page
    }

    const followForm = document.querySelector('#followForm');
    const unFollowForm = document.querySelector('#unFollowForm');
    await renderProfileHero();
    //
    //
    const responseData = await readPostsByUser(username);
    if (responseData && responseData.length > 0) {
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
