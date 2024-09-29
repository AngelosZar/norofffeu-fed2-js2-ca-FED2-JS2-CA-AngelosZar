import { API_BASE } from '../../api/constants';

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
    return response;
  } catch (error) {
    console.error('Error:', responseData.errors[0].message);
  }
};

export async function unFollowUser(username) {
  const apiUrl = `${API_BASE}/social/profiles/${username}/unfollow`;
  try {
    const response = await apiFollowAndUnfollowRequest(apiUrl);
    if (!response.ok) alert('Something went wrong ');
    if (response.ok) {
      alert(`You are now NOT following ${username}`);
    }
    return response;
  } catch (error) {
    return null;
  }
}

export async function followUser(username) {
  const apiUrl = `${API_BASE}/social/profiles/${username}/follow`;
  try {
    const response = await apiFollowAndUnfollowRequest(apiUrl);
    if (!response.ok) alert('Something went wrong ');
    if (response.ok) {
      alert(`You are now following ${username}`);
    }
    return response;
  } catch (error) {
    return null;
  }
}
