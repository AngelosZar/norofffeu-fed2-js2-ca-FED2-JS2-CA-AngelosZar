import { API_AUTH_REGISTER } from '../../api/constants.js';

export async function register({ name, email, password, bio, avatar }) {
  try {
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
      let mappedErrors = 'Unexpected error';
      if (errorResponse.errors && errorResponse.errors.length > 0) {
        mappedErrors = errorResponse.errors
          .map(error => error.message)
          .join('\n');
      }
      alert(mappedErrors);
      //
      throw new Error('Failed to register');
    }
    return res.json();
  } catch (error) {
    throw error;
  }
}
