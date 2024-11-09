// import { readPost } from './js/api/post/read';
import './css/styles.css';

import router from './js/router';
//
import { onLogout } from './js/ui/auth/logout';
import { followUser } from './js/api/auth/follow';
import { initNavigationMenu } from './js/utilities/burgerMenuHandler.js';
import { runMain } from './js/api/profile/read';
// test api key fetching function
// import { getKey } from './js/api/auth/key';
// await getKey();

document.addEventListener('DOMContentLoaded', async () => {
  await router(window.location.pathname);
  initNavigationMenu();
  onLogout();
});
