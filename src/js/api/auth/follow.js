import { API_BASE } from '../../api/constants';
import { API_SOCIAL_PROFILES_FOLLOW } from '../../api/constants';
import { API_SOCIAL_PROFILES_UNFOLLOW } from '../../api/constants';

// export async function unFollowUser(name) {}

export async function followUser(user) {
  const apiUrl = `${API_BASE}/social/profiles/${user}/follow`;
  try {
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'X-Noroff-API-Key': `${localStorage.getItem('apiKey')}`,
      },
    });
    if (!response.ok) {
      const errors = await response.json();
      console.log(errors.errors[0].message);
    }
    const res = await response.json();
    console.log(res);
  } catch (error) {}
}

// await followUser('GaryTheSnail');
