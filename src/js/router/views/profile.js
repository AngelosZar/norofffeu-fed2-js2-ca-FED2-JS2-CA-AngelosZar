import { authGuard } from '../../utilities/authGuard';
import { readPostsByUser } from '../../api/post/read.js';

authGuard();
console.log('connected profile script');
console.log('These are my posts');

readPostsByUser('angZar');
