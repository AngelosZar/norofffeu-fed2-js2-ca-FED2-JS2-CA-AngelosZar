import { API_BASE } from '../../api/constants';
import { API_SOCIAL_PROFILES_FOLLOW } from '../../api/constants';
import { API_SOCIAL_PROFILES_UNFOLLOW } from '../../api/constants';

// export async function unFollowUser(name) {}

const createUserObject = userData => ({
  name: userData.name,
  ...(userData.email && { email: userData.email }),
  ...(userData.bio && { bio: userData.bio }),
  ...(userData.avatar && {
    avatar: {
      url: userData.avatar.url,
      alt: userData.avatar.alt || '',
    },
  }),
  ...(userData.banner && {
    banner: {
      url: userData.banner.url,
      alt: userData.banner.alt || '',
    },
  }),
});

export async function followUser(followersData, followingData) {
  // export async function followUser(followersData, followingData) {
  const apiUrl = `${API_BASE}/social/profiles/${followersData}/follow`;

  // const apiUrl = `${API_BASE}/${API_SOCIAL_PROFILES_FOLLOW}`;
  const requestBody = {
    data: {
      followers: [createUserObject(followersData)],
      following: [createUserObject(followingData)],
    },
  };
  try {
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'X-Noroff-API-Key': `${localStorage.getItem('apiKey')}`,
      },
      body: JSON.stringify({ requestBody }),
    });
    if (!response.ok) {
      const errors = await response.json();
      console.log(errors);
    }
  } catch (error) {}
}
console.log('connected');
followUser('GaryTheSnail', 'angZar');
// {
//     "data": {
//       "followers": [
//         {
//           "name": "rsV6kRfDhunjRnpDIZ_e",
//           "email": "user@example.com",
//           "bio": "string",
//           "avatar": {
//             "url": "string",
//             "alt": ""
//           },
//           "banner": {
//             "url": "string",
//             "alt": ""
//           }
//         }
//       ],
//       "following": [
//         {
//           "name": "nKdPzvTzsfuhiufLR80K",
//           "email": "user@example.com",
//           "bio": "string",
//           "avatar": {
//             "url": "string",
//             "alt": ""
//           },
//           "banner": {
//             "url": "string",
//             "alt": ""
//           }
//         }
//       ]
//     },
//     "meta": {}
//   }
