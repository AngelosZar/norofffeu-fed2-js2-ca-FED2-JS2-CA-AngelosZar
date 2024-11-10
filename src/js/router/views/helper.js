import { deletePost } from '../../api/post/delete';
import { API_SOCIAL_PROFILES } from '../../api/constants';

export function formatPostDate(createdDate) {
  const now = new Date();
  const postDate = new Date(createdDate);
  const diffInHours = (now - postDate) / (1000 * 60 * 60);

  if (diffInHours < 24) {
    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return `${minutes} minutes ago`;
    }
    return `${Math.floor(diffInHours)} hours ago`;
  } else {
    return postDate.toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  }
}

export function extractAuthorInfo(post) {
  if (!post || !post.author) {
    return {
      name: '',
      email: '',
      bio: null,
      avatar: '',
      banner: '',
      avatarUrl: '',
      bannerUrl: '',
      avatarAlt: '',
    };
  }

  const { author } = post;

  return {
    name: author.name || '',
    email: author.email || '',
    bio: author.bio || null,
    avatar: author.avatar || {},
    banner: author.banner || {},
    avatarUrl: author.avatar?.url || '',
    bannerUrl: author.banner?.url || '',
    avatarAlt: author.avatar?.alt || `${author.name}'s avatar`, // Provides a fallback alt text
  };
}

// fetchPostAuthor('4396');
export const handleEditPost = async function (event) {
  if (event.target.matches('.btn-action1') && event.target.textContent.includes('Edit Post')) {
    const editBtn = event.target;
    const clickedPostID = editBtn.dataset.postId;
    localStorage.setItem('postID', clickedPostID);
    window.location.href = `../post/edit/`;
  }
};

export const handleDeletingPost = async function (event) {
  try {
    event.preventDefault();
    if (event.target.id === 'deleteCurrentPost' && event.target.dataset.postId) {
      const postId = event.target.dataset.postId;
      const confirmDelete = confirm('Are you sure you want to delete this post?');
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
  if (event.target.matches('.card-for-posts') || event.target.matches('.media-for-post')) {
    const postID = event.target.dataset.postId;
    console.log('postID:', postID);
    localStorage.setItem('postID', postID);
    window.location.href = `/post/`;
  }
};

export const generateHtml = async function (parentDiv, responseData) {
  const parentContainer = document.querySelector(`#${parentDiv}`);
  parentContainer.classList.add('container', 'mx-auto', 'max-w-[95%]', 'md:max-w-[85%]');
  responseData.forEach((post) => {
    const html = `
    <div class="container mx-auto max-w-[95%] md:max-w-[85%]" id="post-feed">
      <div class="card-for-posts mb-8 rounded-md border-2 border-slate-300 bg-slate-50 text-gray-600 dark:bg-gray-700 dark:text-white" data-post-id="${post.id}">
        <h3 class="title-for-post px-4 py-2 text-xl font-bold">${post.title}</h3>
        <p class="body-for-post px-4 pb-4 dark:text-gray-400">${post?.body}</p>
        
        <div class="flex max-h-[36rem] max-w-[62rem] items-center justify-center overflow-hidden">
          <img
            class="media-for-post h-auto w-full object-contain object-center"
            data-post-id="${post.id}"
            src="${post?.media?.url ?? ''}"
            alt="${post?.media?.alt ?? ''}"
          />
        </div>
        
        <p class="tags-for-post py-4 pl-4">${post?.tags.join(' / ')}</p>
        
        <div class="flex justify-around pb-4 [&>a]:text-[0.75rem] xs:[&>a]:text-[1rem] [&>a]:rounded-md sm:[&>a]:px-4 [&>a]:px-2[&>a]:py-2 [&>a]:transition-colors ">
          <a href="#" id="like-btn" class="hover:bg-slate-300">Like 👍</a>
          <a href="#" id="comment-btn" class="hover:bg-slate-300">Comment 💬</a>
          <a href="#" id="share-btn" class="hover:bg-slate-300">Share ↪</a>
          <a href="../post/edit/" class="btn-action1 hover:bg-slate-300" data-post-id="${post.id}">Edit Post</a>
          <a href="#" id="deleteCurrentPost" class="btn-action1 hover:bg-slate-300" data-post-id="${post.id}">Delete Post</a>
        </div>
      </div>
    </div>
  `;
    parentContainer.insertAdjacentHTML('beforeend', html);
    const postId = post.id;
    return postId;
  });
  parentContainer.addEventListener('click', handleDeletingPost);
  parentContainer.addEventListener('click', handleEditPost);
  parentContainer.addEventListener('click', handleMoveToSingleView);
};
