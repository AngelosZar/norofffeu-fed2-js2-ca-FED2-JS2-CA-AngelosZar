import { authGuard } from '../../utilities/authGuard';
import { onUpdatePost } from '../../ui/post/update';
// import { renderSinglePost } from '../../router/views/post';
const editingPost = localStorage.getItem('postID');
const editPostForm = document.querySelector('#editPostForm');
console.log(editPostForm);
authGuard();

editPostForm.addEventListener('submit', onUpdatePost);
