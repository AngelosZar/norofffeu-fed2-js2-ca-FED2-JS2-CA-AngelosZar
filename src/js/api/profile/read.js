import { readPostsByUser } from '../../api/post/read.js';
import { API_SOCIAL_PROFILES } from '../../api/constants.js';
console.log(API_SOCIAL_PROFILES);
//
//
export async function readProfile(username) {
  try {
    const response = await fetch(`${API_SOCIAL_PROFILES}/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'X-Noroff-API-Key': `${localStorage.getItem('apiKey')}`,
      },
    });

    const userData = await response.json();
    // console.log(userData);
    return userData;
  } catch (error) {
    console.error('Error:', responseData.errors[0].message);
  }
}

export async function readProfiles(limit = 12, page = 1) {
  try {
    const offset = `${page} - 1` * limit;
    const response = await fetch(`${API_SOCIAL_PROFILES}/?limit=${limit}&offset=${offset}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'X-Noroff-API-Key': `${localStorage.getItem('apiKey')}`,
      },
    });
    const userData = await response.json();
    if (!response.ok) {
      throw new Error(userData.errors?.[0]?.message || 'Failed to fetch profiles');
    }
    console.log(userData);
    return userData;
  } catch (error) {
    console.error('Error:', responseData.errors[0].message);
    throw error;
  }
}

// Delete after testing
//
//
// readProfile('angZar');
// readProfiles();
export const runMain = async () => {
  // readProfile('angZar');
  // readProfiles(12, 1);
};
//
