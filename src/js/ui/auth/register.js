import { register } from '../../api/auth/register';

export async function onRegister(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.name.value;
  const email = form.email.value;
  const password = form.password.value;
  const bio = form.bio.value;
  const profileImg = form.profileImg.value;
  const profileImgAlt = form.profileImgAlt.value;
  //
  const userRegisteringData = {
    name: name,
    email: email,
    password: password,
    bio: bio || undefined,
    avatar: profileImg
      ? { url: profileImg, alt: profileImgAlt || '' }
      : undefined,
  };
  console.log(userRegisteringData);
  //   return userRegisteringData;
  try {
    const res = await register(userRegisteringData);
    alert('User registered successfully');
    // problem redirecting to login page
    // window.location.href = '/auth/login/';
    // window.assign('/auth/login/');
    // window.location.replace('/auth/login/');
    // /auth/login/
  } catch (error) {
    console.error('Error:', error);
    console.log(error);
  }
}

// {
//     "name": "3XX8DE9Xw0maknTwcMS8",
//     "email": "user@example.com",
//     "bio": "string",
//     "avatar": {
//       "url": "string",
//       "alt": ""
//     },
//     "banner": {
//       "url": "string",
//       "alt": ""
//     },
//     "venueManager": true,
//     "password": "stringst"
//   }
