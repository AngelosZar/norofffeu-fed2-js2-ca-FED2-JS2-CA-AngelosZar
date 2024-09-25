import { authGuard } from '../../utilities/authGuard';
import { handleDeletingPost } from '../../router/views/post';
import { handleEditPost } from '../../router/views/post';
import { readPosts } from '../../api/post/read';
import { checkForCredentials } from '../../router/views/auth';
authGuard();

const renderMultiplePosts = async function (limit, page, tag) {
  try {
    const responseData = await readPosts(limit, page, tag);

    if (!responseData) {
      throw new Error('No data found\nPlease try again later');
    }

    const parentContainer = document.querySelector('#post-feed');
    responseData.forEach(post => {
      const html = `
            <div class="card-for-posts">
              <h3 class="title-for-post">${post.title}</h3>
              <p class="body-for-post">${post?.body}</p>
              <p class="tags-for-post">${post?.tags.join(' / ')}</p>
              <img class="media-for-post" src="${
                post?.media?.url ?? ''
              }" alt="${post?.media?.alt ?? ''}" />
        
               <a href="../post/edit/" class="btn-action1" data-post-id="${
                 post.id
               }" >Edit Post</a>
              <a href="#" id="deleteCurrentPost" class="btn-action1">Delete Post</a>
             </div> `;

      parentContainer.insertAdjacentHTML('beforeend', html);
      const postId = post.id;
      console.log(postId);
      return postId;
    });
    parentContainer.addEventListener('click', handleDeletingPost);
    parentContainer.addEventListener('click', handleEditPost);
  } catch (error) {
    alert(error);
    throw error;
  }
};

document.addEventListener('DOMcontentLoaded', checkForCredentials());
await renderMultiplePosts(12, 1, 'tag');
