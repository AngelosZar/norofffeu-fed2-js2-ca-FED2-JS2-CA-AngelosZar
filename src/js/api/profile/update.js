// create a helper function to get data from user // form
// return body data
const body = ` {
    avatar: {
      url: '${avatarUrl}',
      alt: '${avatarAlt}',
    },
    banner: {
      url: '${bannerUrl}',
      alt: '${bannerAlt}',
    },
    bio: '${bio}',
  }`;

//
export async function updateProfile(username, { avatar, banner }) {
  try {
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'X-Noroff-API-Key': `${localStorage.getItem('apiKey')}`,
      },
      body: JSON.stringify(body),
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
}

// PUT
// /social/profiles/{name}/posts
const apiExample = {
  avatar: {
    url: 'string',
    alt: '',
  },
  banner: {
    url: 'string',
    alt: '',
  },
  bio: 'string',
};
