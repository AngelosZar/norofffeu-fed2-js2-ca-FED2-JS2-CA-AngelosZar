import { login } from '../../api/auth/login.js';

export async function onLogin(event) {
  event.preventDefault();
  const form = event.target;
  const email = form.email.value;
  const password = form.password.value;
  const data = { email, password };
  const response = await login(data);
  if (response) {
    form.reset();
    //
    location.href = '/profile/index.html'; // page cannot be found in scr vies ???
    //
  } else {
    form.reset();
    throw new Error('Something went wrong\nPlease try again');
  }
}
