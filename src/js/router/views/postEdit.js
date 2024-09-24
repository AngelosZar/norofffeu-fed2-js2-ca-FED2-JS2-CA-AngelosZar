import { authGuard } from '../../utilities/authGuard';
import { onUpdatePost } from '../../ui/post/update';
// import { renderSinglePost } from '../../router/views/post';
const editingPost = localStorage.getItem('postID');
authGuard();
await onUpdatePost();
