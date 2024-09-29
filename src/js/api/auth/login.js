import { API_AUTH_LOGIN } from '../../api/constants.js';
import { API_KEY } from '../../api/constants.js';

export async function login({ email, password }) {
  try {
    const res = await fetch(API_AUTH_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (res.ok) {
      const responseData = await res.json();
      const accessToken = responseData.data.accessToken;
      const currentUser = responseData.data.name;
      const userData = {
        name: responseData.data.name,
        bio: responseData.data?.bio,
        avatarImg: responseData.data.avatar?.url,
        avatarAlt: responseData.data.avatar?.alt,
        bannerImg: responseData.data.banner?.url,
        bannerAlt: responseData.data.banner?.alt,
      };

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('name', responseData.data.name);
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('apiKey', API_KEY);
      confirm('You are now logged in');
      window.location.href = '/';
      return { responseData, accessToken, currentUser, userData };
    } else {
      alert('Invalid username or password\nPlease try again');
      return false;
    }
  } catch (error) {
    console.error(error);
  }
}
