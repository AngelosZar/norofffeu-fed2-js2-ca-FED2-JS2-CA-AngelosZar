import { API_AUTH_LOGIN } from '../../api/constants.js';

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
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('name', responseData.data.name);
      confirm('You are now logged in');
      return { responseData, accessToken, currentUser };
    } else {
      alert('Invalid username or password\nPlease try again');
      //   cannot reset form here reset on onlogin page
      return false;
    }
  } catch (error) {
    console.error(error);
  }
}
