import { API_AUTH_REGISTER } from '../../api/constants.js';

export async function register({ name, email, password, bio, avatar }) {
  const res = await fetch(API_AUTH_REGISTER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
      bio,
      avatar,
    }),
  });
  if (!res.ok) {
    const errorResponse = await res.json();
    console.log(errorResponse);
    throw new Error('Failed to register');
  } else {
    console.log('User registered');
  }
}
