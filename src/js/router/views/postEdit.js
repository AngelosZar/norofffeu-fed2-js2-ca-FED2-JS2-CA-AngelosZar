import { authGuard } from '../../utilities/authGuard';
import { onUpdatePost } from '../../ui/post/update';
const editPostForm = document.querySelector('#editPostForm');
authGuard();

editPostForm.addEventListener('submit', onUpdatePost);
