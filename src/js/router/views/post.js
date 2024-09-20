import { readPost, readPosts } from '../../api/post/read';
import { deletePost } from '../../api/post/delete';

const handleDeletingPost = async function (event) {
  event.preventDefault();
  if (event.target.id === 'deleteCurrentPost') {
    const postCard = event.target.closest('.card-for-posts');
    console.log(postCard);
    console.log(postCard.data);
    const postId = postCard.id;
    console.log(postId);
  }

  const confirmDelete = confirm('Are you sure you want to delete this post?');
  if (!confirmDelete) return;
  try {
    // await deletePost(postId);
    // postCard.remove();
  } catch {
    alert(error);
  }
  // console.log(error);
};

const renderSinglePost = async function (id) {
  try {
    const responseData = await readPost(id);

    if (!responseData) {
      throw new Error('No data found\nPlease try again later');
    }

    const parentContainer = document.querySelector('#single_post');
    const html = ` 
          <div class="card-for-posts">
            <h3 class="title-for-post">${responseData.title}</h3>
            <p class="body-for-post">${responseData.body}</p>
            <p class="tags-for-post">${responseData.tags.join(' / ')}</p>
            <img class="media-for-post" src="${responseData.media.url}" alt="${
      responseData.media.alt
    }" />
     <a href="../post/edit/index.html" id="clickOnEditAPost" class="btn-action1"
    >Edit Post</a
  >
  <a href="#" id="deleteCurrentPost" class="btn-action1">Delete Post</a>
          </div> `;
    parentContainer.insertAdjacentHTML('beforeend', html);
  } catch (error) {
    alert(error);
    throw error;
  }
};

//
const renderMultiplePosts = async function (limit, page, tag) {
  try {
    const responseData = await readPosts(limit, page, tag);

    if (!responseData) {
      throw new Error('No data found\nPlease try again later');
    }

    const parentContainer = document.querySelector('#many_posts');
    responseData.forEach(post => {
      const html = `
          <div class="card-for-posts">
            <h3 class="title-for-post">${post.title}</h3>
            <p class="body-for-post">${post.body}</p>
            <p class="tags-for-post">${post.tags.join(' / ')}</p>
            <img class="media-for-post" src="${post?.media?.url ?? ''}" alt="${
        post?.media?.alt ?? ''
      }" />
       <a href="../post/edit/index.html" id="clickOnEditAPost" class="btn-action1"
    >Edit Post</a
  >
  <a href="#" id="deleteCurrentPost" class="btn-action1">Delete Post</a>
          </div>`;
      parentContainer.insertAdjacentHTML('beforeend', html);
      console.log(post);
      parentContainer.addEventListener('click', handleDeletingPost);
      console.log(post.id);
      return post.id;
    });
  } catch (error) {
    alert(error);
    throw error;
  }
};

await renderMultiplePosts(12, 1, 'tag');
await renderSinglePost(674);
