import { readPost, readPosts } from '../../api/post/read';
import { deletePost } from '../../api/post/delete';

export const handleEditPost = async function (event) {
  if (
    event.target.matches('.btn-action1') &&
    event.target.textContent.includes('Edit Post')
  ) {
    const editBtn = event.target;
    const clickedPostID = editBtn.dataset.postId;
    localStorage.setItem('postID', clickedPostID);
    window.location.href = `../post/edit/`;
  }
};

export const handleDeletingPost = async function (event) {
  try {
    event.preventDefault();
    if (
      event.target.id === 'deleteCurrentPost' &&
      event.target.dataset.postId
    ) {
      event.preventDefault();
      const postId = event.target.dataset.postId;
      const confirmDelete = confirm(
        'Are you sure you want to delete this post?'
      );
      if (!confirmDelete) return;
      await deletePost(postId);
      confirm('Post deleted successfully');
      event.target.closest('.card-for-posts').remove();
    }
  } catch {
    alert(error.message);
  }
};

export const generateHtml = async function (parentDiv, responseData) {
  const parentContainer = document.querySelector(`#${parentDiv}`);
  responseData.forEach(post => {
    const html = `
        <div class="card-for-posts">
          <h3 class="title-for-post">${post.title}</h3>
          <p class="body-for-post">${post?.body}</p>
          <p class="tags-for-post">${post?.tags.join(' / ')}</p>
          <img class="media-for-post" src="${post?.media?.url ?? ''}" alt="${
      post?.media?.alt ?? ''
    }" />

           <a href="../post/edit/" class="btn-action1" data-post-id="${
             post.id
           }" >Edit Post</a>
          <a href="#" id="deleteCurrentPost" class="btn-action1">Delete Post</a>
         </div> `;

    parentContainer.insertAdjacentHTML('beforeend', html);
    const postId = post.id;
    // console.log(postId);
    return postId;
  });
  parentContainer.addEventListener('click', handleDeletingPost);
  parentContainer.addEventListener('click', handleEditPost);
};

const renderSinglePost = async function (id) {
  try {
    const post = await readPost(id);

    if (!post) {
      throw new Error('No data found\nPlease try again later');
    }
    generateHtml('single_post', [post]);
  } catch (error) {
    alert(error);
    throw error;
  }
};

export const renderMultiplePosts = async function (limit, page, tag) {
  try {
    const responseData = await readPosts(limit, page, tag);

    if (!responseData) {
      throw new Error('No data found\nPlease try again later');
    }
    await generateHtml('many_posts', responseData);
  } catch (error) {
    alert(error);
    throw error;
  }
};

// document.addEventListener('DOMContentLoaded', async () => {
//   await renderMultiplePosts(12, 1, 'tag');
//   await renderSinglePost(1069);
// });
document.addEventListener('DOMContentLoaded', async function () {
  await renderMultiplePosts(12, 1, 'tag');
  await renderSinglePost(1069);
});
// await renderMultiplePosts(12, 1, 'tag');
// await renderSinglePost(1069);
