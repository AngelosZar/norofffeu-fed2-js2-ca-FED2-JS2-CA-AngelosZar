import { API_AUTH_KEY } from '../constants';
console.log(API_AUTH_KEY);
// const name = localStorage.getItem('name') || '';
//
const credentials = {
  email: 'somethingRandom@stud.noroff.no',
  password: '',
};
export async function getKey() {
  try {
    const token = localStorage.getItem('accessToken');
    console.log(token);
    const response = await fetch(API_AUTH_KEY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ credentials }),
    });
    if (!token) {
      throw new Error('Access token is missing');
    }
    if (response.ok) {
      const apiKeyValue = await response.json();
      const apiKey = apiKeyValue.data.key;
      localStorage.setItem('apiKey', apiKey);
    } else {
      const error = await response.json();
      console.log('error', error);
      throw new Error('Failed to fetch an API KEY');
    }
  } catch (error) {
    console.error('error', error);
    throw error;
  }
}
