import { API_BASE } from '../../api/constants';
import { API_SOCIAL_PROFILES_FOLLOW } from '../../api/constants';
import { API_SOCIAL_PROFILES_UNFOLLOW } from '../../api/constants';

const apiFollowAndUnfollowRequest = async function (apiUrl) {
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
      alert(errors.errors[0].message);
    }
    const res = await response.json();
    console.log(res);
  } catch (error) {
    console.error('Error:', responseData.errors[0].message);
  }
};

export async function unFollowUser(username) {
  const apiUrl = `${API_BASE}/social/profiles/${username}/unfollow`;
  await apiFollowAndUnfollowRequest(apiUrl);
}

export async function followUser(username) {
  const apiUrl = `${API_BASE}/social/profiles/${username}/follow`;
  await apiFollowAndUnfollowRequest(apiUrl);
}
// console.log('⬇️');
// await unFollowUser('GaryTheSnail');
// await followUser('GaryTheSnail');
// await followUser('angZar');
// await unFollowUser('angZar');
