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
export const handleMoveToSingleView = function (event) {
  event.preventDefault();
  console.log('clicked');
  if (
    event.target.matches('.card-for-posts') ||
    event.target.matches('.media-for-post')
  ) {
    console.log(event.target);
    console.log(event.target.dataset);
    // console.log(event.target.dataset.postId);
    const postID = event.target.dataset.postId;
    console.log(postID);
    localStorage.setItem('postID', postID);
    window.location.href = `../post/`;
  }
};

export const generateHtml = async function (parentDiv, responseData) {
  const parentContainer = document.querySelector(`#${parentDiv}`);
  console.log(parentContainer);
  responseData.forEach(post => {
    const html = `
        <div class="card-for-posts" data-post-id="${post.id}">
          <h3 class="title-for-post">${post.title}</h3>
          <p class="body-for-post">${post?.body}</p>
          <p class="tags-for-post">${post?.tags.join(' / ')}</p>
          <img class="media-for-post" data-post-id="${post.id}" src="${
      post?.media?.url ?? ''
    } " alt="${post?.media?.alt ?? ''}" />

           <a href="../post/edit/" class="btn-action1" data-post-id="${
             post.id
           }" >Edit Post</a>
          <a href="#" id="deleteCurrentPost" class="btn-action1" data-post-id="${
            post.id
          }">Delete Post</a>
         </div> 
`;

    parentContainer.insertAdjacentHTML('beforeend', html);
    const postId = post.id;
    // console.log(postId);
    return postId;
  });
  parentContainer.addEventListener('click', handleDeletingPost);
  parentContainer.addEventListener('click', handleEditPost);
  parentContainer.addEventListener('click', handleMoveToSingleView);
};
