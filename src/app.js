// import { readPost } from './js/api/post/read';
import './css/style.css';

import router from './js/router';
//
import { onLogout } from './js/ui/auth/logout';
import { followUser } from './js/api/auth/follow';
// test api key fetching function
// import { getKey } from './js/api/auth/key';
// await getKey();
await router(window.location.pathname);
onLogout();
