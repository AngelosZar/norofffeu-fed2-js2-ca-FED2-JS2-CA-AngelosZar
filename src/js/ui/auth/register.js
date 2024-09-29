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
  try {
    const res = await register(userRegisteringData);
    if (res.ok === false) {
      alert(res.errors[0].message);
      throw new Error(res.errors[0].message);
    }
    alert('User registered successfully');
    window.location.href = '/auth/login/';
  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    form.reset();
  }
}
